import INavigationItem from "./INavigationItem";

export default interface INavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  activeItem?: INavigationItem & { index: number };
}