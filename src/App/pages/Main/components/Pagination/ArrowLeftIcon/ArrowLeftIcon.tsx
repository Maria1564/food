import Icon, { IconProps } from "components/icons/Icon";
import React from "react";

const ArrowLeftIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path
        d="M23.12 31.5599L14.4267 22.8666C13.4 21.8399 13.4 20.1599 14.4267 19.1333L23.12 10.4399"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Icon>
  );
};

export default ArrowLeftIcon;
