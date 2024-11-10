import Icon, { IconProps } from 'components/icons/Icon'
import React from 'react'

const ArrowLeftIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
        <path d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </Icon>
  )
}

export default ArrowLeftIcon