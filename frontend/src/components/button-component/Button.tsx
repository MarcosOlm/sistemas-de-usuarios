import type { ButtonHTMLAttributes } from 'react';
import './Button.css'

type ButtonProps = {
    text: string,
    bgColor: 'primary' | 'secondary' | 'muted'
    imgSrc?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({text, bgColor, imgSrc, ...rest}: ButtonProps) => {

    return (
        <>
            <button className={bgColor} {...rest}>
                <img src={imgSrc} />
                {text}
            </button>
        </>
    );
}

export default Button