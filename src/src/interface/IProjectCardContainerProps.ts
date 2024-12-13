import { actionType } from "../types/TAction";

export default interface IProjectCardContainerProps {
  data?: Record<string, any>;
  isBookmark?: boolean;
  onClickAction?: (action: actionType, data: any) => void;
}