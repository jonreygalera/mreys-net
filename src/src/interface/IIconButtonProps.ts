export default interface IIconButtonProps {
  icon: any; 
  IconComponentProps?: any;
  ButtonComponentProps?: any;
  onClick?: (event: any)  => void;
  label?: string;
  active?: boolean;
}