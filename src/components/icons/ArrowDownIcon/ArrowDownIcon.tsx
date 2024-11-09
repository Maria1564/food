import classNames from 'classnames';
import * as React from 'react';

import { IconProps } from '../Icon';

const ArrowDownIcon: React.FC<IconProps> = ({ color, ...other }) => {
  let fill = '#000000';
  switch (color) {
    case 'accent':
      fill = '#B5460F';
      break;

    case 'secondary':
      fill = '#AFADB5';
      break;

    default:
      fill = '#000000';
  }
  const className = classNames('arrow_icon', {
    [other.className as string]: other.className,
  });
  return (
    <>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={fill}
        xmlns="http://www.w3.org/2000/svg"
        {...other}
        className={className}
        
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z"
          fill="#ffs4323"
        />
      </svg>
    </>
  );
};

export default ArrowDownIcon;
