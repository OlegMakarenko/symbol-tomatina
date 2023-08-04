import styles from '@/styles/components/Modal.module.scss';
import Card from './Card';
import ButtonClose from './ButtonClose';

const Modal = ({ children, onClose, isVisible }) => {
	if (!isVisible) return null;

	return (
		<div className={styles.modal} onClick={onClose}>
			<Card className={styles.card} onClick={e => e.stopPropagation()}>
				<ButtonClose className={styles.buttonClose} onClick={onClose} />
				{children}
			</Card>
		</div>
	);
};

export default Modal;
