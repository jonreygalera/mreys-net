import React, { PropsWithChildren } from 'react';
import Box from '../box/Box';

interface DialogProps extends PropsWithChildren {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  footer?: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = (props) => {
  const { isOpen, title, children, onClose, footer } = props;

  if (!isOpen) return null;

  return (
    <Box className="fixed inset-0 z-50 flex items-center justify-center bg-primary-950 bg-opacity-50">
      <Box className="bg-primary-50 rounded-lg shadow-lg w-full max-w-7xl p-6 animate-fade-in">
        {/* Header */}
        {title && (
          <Box className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-primary-900">{title}</h2>
            <button
              onClick={onClose}
              className="text-primary-400 hover:text-primary-700 focus:outline-none"
              aria-label="Close dialog"
            >
              ✕
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
