import React from 'react';
import "./Input.scss"

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {

    return (
      <>
        <input {...props} ref={ref} className={`inp ${props.className}`} value={props.value} onChange={(e)=>props.onChange(e.target.value)} type='text'/>
        {props.afterSlot && <span className='inp_icon'>{props.afterSlot}</span>}
      </>
      
    )
  });

export default Input;
