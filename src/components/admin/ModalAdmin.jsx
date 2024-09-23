import { useEffect } from 'react';
import { Icon } from '../Icon';
import { IoCloseSharp } from "react-icons/io5";

export const ModalAdmin = ({ isOpen, onClose, children, title, tamanioModal }) => {
  // --- Background modal
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 w-screen overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">

      {/* background */}
      <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true" onClick={onClose}></div>

      {/* Modal */}
      <div className="flex items-end justify-center p-4 text-center sm:items-center md:p-16">
        <div className={`relative w-full p-4 pb-6 overflow-hidden text-left transition-all transform bg-white border rounded-lg shadow-xl md:max-w-6xl ${tamanioModal}`}>
          <div className="flex justify-between md:pb-0">
            <h2 className='px-2 mb-4 text-2xl font-bold text-marron-200'>{title}</h2>
            <Icon
              onClick={onClose}
              icon={<IoCloseSharp size={24} />} />
          </div>
          <div className='px-2 overflow-y-auto'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
