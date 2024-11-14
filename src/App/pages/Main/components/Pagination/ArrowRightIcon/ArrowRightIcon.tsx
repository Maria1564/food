import Icon, { IconProps } from "components/icons/Icon";
import React from "react";

const ArrowRightIcon: React.FC<IconProps> = props => {
  return (
    <Icon {...props}>
      <path
        d="M14.88 31.5599L23.5733 22.8666C24.6 21.8399 24.6 20.1599 23.5733 19.1333L14.88 10.4399"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export default ArrowRightIcon;
