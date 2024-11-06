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
  ({afterSlot, ...otherProp}, ref) => {

    return (
      <>
        <input {...otherProp} ref={ref} className={`inp ${otherProp.className}`} value={otherProp.value} onChange={(e)=>otherProp.onChange(e.target.value)} type='text'/>
        {afterSlot && <span className='inp_icon'>{afterSlot}</span>}
      </>
      
    )
  });

export default Input;
