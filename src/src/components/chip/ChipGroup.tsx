import React, { Children } from 'react';
import IChipGroupProps from '../../interface/IChipGroupProps';
import Box from '../box/Box';
import { tailwindUtil } from '../../utils/tailwindUtil';
import Button from '../button/Button';

const ChipGroup: React.FC<IChipGroupProps> = (props) => {
  const { children } = props;

  return (
    <Box
      className={tailwindUtil("flex gap-2")}
    >
      {
        Children.map(children, (child, childIdx) => (
          (childIdx < 3) ? (
            <Box>
            { child }
          </Box>
          ) : <Button>More</Button>
        ))
      }
    </Box>
  );
}

export default ChipGroup;
