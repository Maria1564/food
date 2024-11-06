import React from 'react';
import "./CheckBox.scss"

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ onChange, ...other }) => {

  return (
    <div className={`checkbox_wrapper ${other.className} ${other.disabled && "checked_wrap_dis"}`}>
      {other.checked && (
        <svg
          className='checkbox_icon'
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.66663 19.3548L16.4625 30L33.3333 11.6667"
            stroke={other.disabled? "#00000033" : "#B5460F"}
            stroke-width="3.33333"
          />
        </svg>
      )}
      <input
        {...other}
        className="checkbox"
        type="checkbox"
        checked={other.checked as boolean}
        onChange={(e) => onChange(e.target.checked)}
      />
    </div>
  );
};

export default CheckBox;
