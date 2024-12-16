import React from 'react';
import Box from '../box/Box';
import {
  XMarkIcon
} from '@heroicons/react/24/outline';
import { tailwindUtil } from '../../utils/tailwindUtil';
import IDialogProps from '../../interface/IDialogProps';

const Dialog: React.FC<IDialogProps> = (props) => {
  const { isOpen, title, children, onClose, footer, className } = props;

  if (!isOpen) return null;

  return (
    <Box className="fixed inset-0 z-50 flex items-center justify-center bg-primary-800 bg-opacity-50">
      <Box className={
        tailwindUtil("bg-primary-100 rounded-3xl w-full max-w-7xl animate-fade-in border-2 border-primary-950 shadow-solid", className)
      }>
        {/* Header */}
        {title && (
          <Box className="flex items-center justify-between mb-4 border-b-4 border-primary-950">
            <h2 className="text-lg font-semibold text-primary-900 mr-2">{title}</h2>
            <button
              onClick={onClose}
              className="text-primary-400 hover:text-primary-700 focus:outline-none bg-primary-800 rounded-se-2xl p-1"
              aria-label="Close dialog"
            >
              <XMarkIcon className='size-7'/>
            </button>
          </Box>
        )}

        {/* Body */}
        <Box className="mb-4 text-primary-700">{children}</Box>

        {/* Footer */}
        {footer && <Box className="mt-4">{footer}</Box>}
      </Box>
    </Box>
  );
};

export default Dialog;
