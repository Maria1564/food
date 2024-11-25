import Icon, { IconProps } from "components/icons/Icon";
import React from "react";

const CheckmarkIcon: React.FC<IconProps> = props => {
  return (
    <Icon {...props}>
      <path
        d="M6.66663 19.3548L16.4625 30L33.3333 11.6667"
        stroke="currentColor"
        strokeWidth="3.33333"
      />
    </Icon>
  );
};

export default CheckmarkIcon;
