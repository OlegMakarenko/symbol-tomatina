import styles from '@/styles/components/Header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const Header = () => {
	const router = useRouter();
	const { t } = useTranslation();
	const menuItems = [
		{
			text: t('menu_home'),
			href: '#top'
		},
		{
			text: 'create',
			href: '#section-create'
		},
		{
			text: 'activity',
			href: '#section-activity'
		}
	];

	const getItemStyle = href => `${styles.headerMenuItem} ${router.asPath === href && styles.headerMenuItem__active}`;

	return (
		<div className={styles.headerWrapper}>
			<header className={styles.header}>
				<div className={styles.headerLogo}>
					<Image src="/images/logo-symbol.png" fill alt="NEM" />
				</div>
				<div className={styles.headerMenu}>
					{menuItems.map((item, index) => (
						<Link className={getItemStyle(item.href)} key={index} href={item.href}>
							{item.text}
						</Link>
					))}
				</div>
			</header>
		</div>
	);
};

export default Header;
