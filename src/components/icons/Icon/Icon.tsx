import * as React from 'react'
import ArrowDownIcon from '../ArrowDownIcon';
import CheckIcon from '../CheckIcon';

export type IconProps = React.SVGAttributes<SVGElement> & {
    className?: string;
    color?: 'primary' | 'secondary' | 'accent';
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = (props) => {
    return (
        <>
        <CheckIcon {...props}/>
        <ArrowDownIcon {...props}/>
        </>
    )
}

export default Icon;
