import { actionType } from "../types/TAction";
import IProject from "./IProject";

export default interface IPreviewProjectPanelProps {
  data?: IProject | null;
  title?: string;
  onAction?: (actionType: actionType, data?: IProject | null) => void
}
