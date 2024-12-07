import React from 'react';
import SplatterSvg from "../../assets/iconSvg/splatter.svg";
import IImageProps from '../../interface/IImageProps';

const Splatter: React.FC<IImageProps> = ({...props}) => {
  return (
    <img {...props} src={SplatterSvg}/>
  );
}

export default Splatter;
