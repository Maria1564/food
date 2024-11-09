import classNames from 'classnames';
import Icon from 'components/icons/Icon';
import React, { useCallback } from 'react';
import "./CheckBox.scss"

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ onChange, disabled, ...other }) => {
  const handlerChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked), [onChange])
  return (
    <div className={classNames("checkbox_wrapper", other.className, {"checked_wrap_dis": disabled })}>
      {other.checked && (
        <Icon width={40} height={40} className='checkbox_icon' color='accent'>
          <path
            d="M6.66663 19.3548L16.4625 30L33.3333 11.6667"
            stroke='currentColor'
            stroke-width="3.33333"
          />
        </Icon>
      )}
      <input
        {...other}
        className="checkbox"
        type="checkbox"
        checked={other.checked as boolean}
        onChange={handlerChange}
      />
    </div>
  );
};

export default CheckBox;
