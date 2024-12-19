
export default interface ITechStack {
  id: string|number;
  key: string;
  label: string;
  version?: string|null;
  tags?: string[];
  icon?: any;
  url?: string|null;
  meta?: any;
  status?: 'inactive' | 'active';
}