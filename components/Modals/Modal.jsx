import React from 'react';
import Modal from 'react-modal';
import styles from './Modal.module.scss';

const CustomModal = ({ isOpen, onRequestClose, children }) => {
    return (
        <div className={styles.z1}>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                className={styles.Modal}
                overlayClassName={styles.Overlay}
            >
                {children}
            </Modal>
        </div>

    );
};

export default CustomModal;