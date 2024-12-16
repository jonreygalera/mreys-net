import React, { Children } from 'react';
import Box from '../box/Box';
import IButtonGroupProps from '../../interface/IButtonGroupProps';
import { tailwindUtil } from '../../utils/tailwindUtil';
import Typography from '../typography/Typography';

const ButtonGroup: React.FC<IButtonGroupProps> = (props) => {
  const { children, max = 6, label } = props;
  const childrenArray = Children.toArray(children);
  const childrenContainer = max == 0 ? childrenArray : [...childrenArray].splice(0, max);
  const childLength = childrenContainer.length;
  const childLastIndex = childLength - 1;

  return (
    <Box className="inline-flex items-center gap-1 w-full" role="group">
      { label && <Typography>{label}</Typography>}
      <Box className="inline-flex flex-col laptop:gap-0 laptop:flex-row rounded-lg laptop:shadow-solid w-full laptop:w-fit p-2 laptop:p-0" role="group">
        { 
          childrenContainer.map((child: any, childIdx) => {
            const propsChild : any = React.isValidElement(child) ? (child?.props ?? null) : null;

            let cornerClass = '';

            if(childIdx == 0 && childLength > 1) {
              cornerClass = 'laptop:rounded-none laptop:rounded-s-lg border-x-2 border-primary-950 rounded-ss-lg rounded-se-lg';
            } else if(childIdx != 0 && childIdx == childLastIndex) {
              cornerClass = 'laptop:rounded-none laptop:rounded-e-lg border-x-2 border-b-2 border-primary-950 rounded-es-lg rounded-ee-lg';
            } else if (childLength == 1) {
              cornerClass = 'laptop:rounded-lg';
            }

            return (<Box>
              {
                React.cloneElement(child, {
                  className: tailwindUtil(cornerClass, 'bg-primary-100 border-2 border-primary-950 hover:bg-primary-300 hover:font-bold w-full', propsChild?.className)
                })
              }
            </Box>)
          })
        
        }
      </Box>
    </Box>
  );
}

export default ButtonGroup;
