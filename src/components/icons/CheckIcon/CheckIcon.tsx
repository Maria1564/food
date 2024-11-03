import * as React from 'react'
import { IconProps } from '../Icon';
import classNames from 'classnames';

const CheckIcon: React.FC<IconProps> = ({ color, ...other }) => {
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
    console.log(color);
    const className = classNames('check_icon', {
      [other.className as string]: other.className,
    });
    return(
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...other}
    className={className} >
    <path d="M4 11.6129L9.87755 17L20  7" stroke={fill} stroke-width="2"/>
    </svg>

    )
}

export default CheckIcon;
