import React from 'react';
import { tailwindUtil } from '../../utils/tailwindUtil';
import ITypographyProps from '../../interface/ITypographyProps';
import { TTypographyVariant } from '../../types/TTypography';

const variantClasses: Record<TTypographyVariant, string> = {
  display1: 'text-6xl font-extrabold',
  display2: 'text-5xl font-bold',
  title: 'text-7xl font-bold',
  h1: 'text-4xl font-bold',
  h2: 'text-3xl font-semibold',
  h3: 'text-2xl font-medium',
  h4: 'text-xl font-medium',
  h5: 'text-lg font-medium',
  h6: 'text-base font-semibold',
  body1: 'text-base font-normal',
  body2: 'text-sm font-normal',
  caption: 'text-xs text-gray-500',
  subtitle1: 'text-base font-medium text-gray-700',
  subtitle2: 'text-sm font-medium text-gray-600',
  overline: 'text-xs font-medium uppercase text-gray-500',
  small: 'text-xs font-normal',
  button: 'text-sm font-bold uppercase',
  link: 'text-sm text-blue-600 underline',
  lead: 'text-lg font-light text-gray-800',
  quote: 'italic text-lg text-gray-600',
  code: 'font-mono text-sm bg-gray-100 p-1 rounded',
  list: 'text-base list-disc pl-5',
};

const Typography: React.FC<ITypographyProps> = (props) => {
  const { as: Component = 'p', variant = 'body1', children, className, style } = props;
  const variantClass = variantClasses[variant] || '';

  return (
    <Component
      className={tailwindUtil(variantClass, className)}
      style={style}
    >
      { children }
    </Component>
  );
}

export default Typography;
