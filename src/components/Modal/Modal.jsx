import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalEl } from '.';

const modalRoot = document.getElementById('modal-root');

export const Modal = ({ onCloseModal, modalAlt, modalImg }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  });
  const handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      onCloseModal();
    }
  };
  const handleBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      onCloseModal();
    }
  };
  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalEl>
        <img src={modalImg} alt={modalAlt} />
      </ModalEl>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  modalAlt: PropTypes.string.isRequired,
  modalImg: PropTypes.string.isRequired,
};
