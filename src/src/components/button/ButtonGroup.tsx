import React, { Children } from 'react';
import Box from '../box/Box';
import IButtonGroupProps from '../../interface/IButtonGroupProps';
import { tailwindUtil } from '../../utils/tailwindUtil';
import Typography from '../typography/Typography';

const ButtonGroup: React.FC<IButtonGroupProps> = (props) => {
  const { children, max = 3, label } = props;
  const childrenArray = Children.toArray(children);
  const childrenContainer = max == 0 ? childrenArray : [...childrenArray].splice(0, max);
  const childLength = childrenContainer.length;
  const childLastIndex = childLength - 1;

  return (
    <Box className="inline-flex items-center gap-1" role="group">
      { label && <Typography>{label}</Typography>}
      <Box className="inline-flex" role="group">
        { 
          childrenContainer.map((child: any, childIdx) => {
            let cornerClass = 'border-x-0';

            if(childIdx == 0 && childLength > 1) {
              cornerClass = 'rounded-s-lg';
            } else if(childIdx != 0 && childIdx == childLastIndex) {
              cornerClass = 'rounded-e-lg';
            } else if (childLength == 1) {
              cornerClass = 'rounded-lg';
            }

            return (<Box>
              {
                React.cloneElement(child, {
                  className: tailwindUtil(cornerClass, 'border bg-primary-50')
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
