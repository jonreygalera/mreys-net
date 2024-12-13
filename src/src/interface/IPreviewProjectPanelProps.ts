import IProject from "./IProject";

export default interface IPreviewProjectPanelProps {
  data?: IProject | null;
  title?: string;
  onSlide?: (data?: IProject | null) => void
}
