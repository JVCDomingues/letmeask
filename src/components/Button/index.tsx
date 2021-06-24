import { ButtonHTMLAttributes } from 'react' 

import '../../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
}

function Button({ isOutlined = false, ...rest }: ButtonProps) {
  return (
    <button 
      className={`button ${isOutlined ? 'outlined' : ''}`} {...rest}
    >

    </button>
  )
}

export default Button
