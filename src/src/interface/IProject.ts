import IImageSet from "./IImageSet";

export default interface IProject {
  id: string|number;
  key: string;
  title: string;
  version?: string;
  description?: string;
  tags?: string[];
  roles?: string[];
  imageSets?: IImageSet[];
  url?: string|null
}