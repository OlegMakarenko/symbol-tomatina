import config from "@/config";
import { requestSign, setTransaction } from "sss-module";
import { Address, Deadline, Mosaic, MosaicId, Order, PlainMessage, TransactionHttp, TransactionType, TransferTransaction, UInt64 } from "symbol-sdk";
import { getMosaicRelativeAmountString } from "./helper";

export const fetchNodeUrl = async () => {
    const response = await fetch(`${config.NEXT_PUBLIC_STATISTICS_SERVICE_URL}/nodes?filter=suggested&limit=5&ssl=true`);
    const nodes = await response.json();

    return nodes[0].apiStatus.restGatewayUrl;
}

export const fetchCreatedNFTs = async () => {
    const response = await fetch(`${config.API_BASE_URL}/api/mosaics`);

    return response.json();
}

export const fetchNFTInfo = async (mosaicId, nodeUrl) => {
    const createdNFTs = await fetchCreatedNFTs();
    const nftInfo  = createdNFTs.find(item => item.mosaic_id === mosaicId);

    if (!nftInfo) {
        throw Error(`Failed to find NFT info with mosaic id "${mosaicId}"`)
    }

    const response = await fetch(`${nodeUrl}/mosaics`, {
        method: 'POST',
        body: JSON.stringify({
            mosaicIds: [mosaicId]
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const mosaicInfo = (await response.json())[0].mosaic;

    return {
        mosaicId,
        creator: nftInfo.buyer_address,
        imageTransactionHash: nftInfo.image_container_hash,
        imageSrc: nftInfo.image,
        supply: getMosaicRelativeAmountString(mosaicInfo.supply, mosaicInfo.divisibility)
    }
}

export const sendWithSSS = async (recipientAddress, amount, message) => {
	// Get node list
	const nodesResponse = await fetch(`${config.NEXT_PUBLIC_STATISTICS_SERVICE_URL}/nodes?filter=suggested&limit=5`);
	const nodes = await nodesResponse.json();

	// Get transaction fee multipliers
	const nodeUrl = nodes[0].apiStatus.restGatewayUrl;
	const feeMultipliersResponse = await fetch(`${nodeUrl}/network/fees/transaction`);
	const feeMultipliers = await feeMultipliersResponse.json();

	// Calculate average fee
	const { size } = createSDKTransferTransaction(recipientAddress, amount, message);
	const fee = feeMultipliers.averageFeeMultiplier * size;

	// Request SSS to sign transaction
	const transaction = createSDKTransferTransaction(recipientAddress, amount, message, fee);
	setTransaction(transaction);
	const signedTransaction = await requestSign();

	// Announce transaction to few different nodes
	return Promise.all(nodes.map((node) => {
		const transactionHttp = new TransactionHttp(node.apiStatus.restGatewayUrl);
    	return transactionHttp.announce(signedTransaction).toPromise();
	}));
};

export const createSDKTransferTransaction = (recipientAddress, amount, message, fee = 0) => {
    return TransferTransaction.create(
        Deadline.create(config.EPOCH_ADJUSTMENT),
        Address.createFromRawAddress(recipientAddress),
        [
			new Mosaic(
				new MosaicId(config.NATIVE_MOSAIC_ID),
				UInt64.fromUint(amount * Math.pow(10, config.NATIVE_MOSAIC_DIVISIBILITY))
			)
		],
        PlainMessage.create(message),
        config.NETWORK_TYPE,
        UInt64.fromUint(fee)
    );
};

export const fetchAccountTransactions = async (currentAccountAddress, nodeUrl, pageNumber = 1) => {
    // Init
	const transactionHttp = new TransactionHttp(nodeUrl);
    const searchCriteria = {
        pageNumber,
        pageSize: 100,
        group: 'confirmed',
        order: Order.Desc,
        address: Address.createFromRawAddress(currentAccountAddress),
        type: [TransactionType.TRANSFER, TransactionType.AGGREGATE_BONDED, TransactionType.AGGREGATE_COMPLETE]
    };

    // Request transaction page
    const transactionPage = await transactionHttp.search(searchCriteria).toPromise();
    const transactions = transactionPage.data;

    // Fetch embedded transactions of Aggregate Bonded and Aggregate Complete
    const aggregateTransactionIds = transactions.filter(isAggregateTransaction).map((transaction) => transaction.transactionInfo.id);
    const shouldFetchAggregateDetails = aggregateTransactionIds.length > 0;
    const aggregateDetails = shouldFetchAggregateDetails
        ? await transactionHttp.getTransactionsById(aggregateTransactionIds, searchCriteria.group).toPromise()
        : [];

    // Merge the embedded transactions info to the transaction page
    return transactions.map((transaction) =>
        isAggregateTransaction(transaction)
            ? aggregateDetails.find((details) => details.transactionInfo.id === transaction.transactionInfo.id)
            : transaction
    );
}

export const isAggregateTransaction = (transaction) => {
    return transaction.type === TransactionType.AGGREGATE_BONDED || transaction.type === TransactionType.AGGREGATE_COMPLETE;
};

export const addressFromDTO = (address, resolvedAddresses) =>
    address.isNamespaceId() ? resolvedAddresses[address.toHex()] : address.plain();

export const getMosaicByGroups = (transactions, currentAccountAddress, resolvedAddresses = {}, createdNFTs) => {
    const mosaicGroups = {
        received: [],
        sent: []
    };

    const isOutgoingTransaction = (transaction) => transaction.signer?.address.plain() === currentAccountAddress;
    const isIncomingTransaction = (transaction) => addressFromDTO(transaction.recipientAddress, resolvedAddresses) === currentAccountAddress;

    const updateTransactionGroups = (transaction) => {
        if (transaction.type !== TransactionType.TRANSFER) {
            return;
        }

        const address = isOutgoingTransaction(transaction)
            ? addressFromDTO(transaction.recipientAddress, resolvedAddresses)
            : isIncomingTransaction(transaction)
            ? transaction.signer?.address.plain()
            : null;

        if (!address) {
            return;
        }

        const mosaics = transaction.mosaics
            .map(mosaic => {
                const mosaicId = mosaic.id.toHex();
                const nftInfo = createdNFTs.find(nft => nft.mosaic_id === mosaicId);

                if (!nftInfo) {
                    return null;
                }

                return {
                    id: mosaicId,
                    amount: mosaic.amount.compact(),
                    address,
                    imageSrc: nftInfo.image
                }
            })
            .filter(mosaic => mosaic !== null);

        if (isOutgoingTransaction(transaction)) {
            mosaicGroups.sent.push(...mosaics);
        }
        else {
            mosaicGroups.received.push(...mosaics);
        }
    }

    transactions.forEach(transaction => {
        if (isAggregateTransaction(transaction)) {
            transaction.innerTransactions.forEach(updateTransactionGroups)
        }
        else {
            updateTransactionGroups(transaction)
        }
    });

    return mosaicGroups;
}
