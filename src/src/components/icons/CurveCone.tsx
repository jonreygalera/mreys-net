import React from 'react';
import CurveConeSvg from "../../assets/iconSvg/curve-cone.svg";
import IImageProps from '../../interface/IImageProps';

const CurveCone: React.FC<IImageProps> = ({...props}) => {
  return (
    <img {...props} src={CurveConeSvg}/>
  );
}

export default CurveCone;
