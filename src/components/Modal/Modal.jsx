import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, ModalContainer } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, showImg, resetImg, children }) {
  const handleKeydown = useMemo(
    () => e => {
      console.log(e);
      if (e.code === 'Escape') {
        onClose();

        resetImg();
      }
    },

    [onClose, resetImg]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();

      resetImg();
    }
  };

  return createPortal(
    <Backdrop onClick={handleBackdropClick}>
      <ModalContainer showImg={showImg}>{children}</ModalContainer>
    </Backdrop>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func,
  showImg: PropTypes.bool,
  resetImg: PropTypes.func,
};
