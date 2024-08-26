import { AvatarProps } from "../../interface/avatarProps";

const Avatar : React.FC<AvatarProps>= (props) => {
  const { src, className } = props;

  return (
    <div className={`rounded-full overflow-hidden ${className}`}>
      <img 
        src={src} 
        className="w-full h-auto object-cover"
      />
    </div>
  )
}

export default Avatar;