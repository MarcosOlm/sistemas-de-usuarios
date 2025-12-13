import './Input.css'
import { forwardRef, type InputHTMLAttributes } from "react";

type InputProps = {
    label: string,
    imgSrc: string
} & InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(({label, imgSrc, ...rest}, ref) => {
    return (
        <>
            <label>{label}</label>
            <div className="input-wrap">
                <img src={`/${imgSrc}`} />
                <input {...rest} ref={ref} />
            </div>
        </>
    );
});

export default Input