import { PropsWithChildren } from "react";

export default interface IDialogProps extends PropsWithChildren {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  footer?: React.ReactNode;
  className?: string;
}
