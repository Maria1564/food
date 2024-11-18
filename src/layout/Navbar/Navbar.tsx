import classNames from "classnames";
import Text from "components/Text";
import React from "react";
import { Link, NavLink } from "react-router-dom";

import favoriteIcon from "./assets/favorite_icon.svg";
import logo from "./assets/logo.svg";
import profileIcon from "./assets/profile_icon.svg";
import s from "./Navbar.module.scss";
import { NAV_LINKS } from "./config";

type TypeIsActiveFunc = ({ isActive }: { isActive: boolean }) => string;
const isActive: TypeIsActiveFunc = ({ isActive }) =>
  isActive ? s.link_active : "";
const Navbar: React.FC = () => {
  return (
    <div className={s.navbar}>
      <div className={classNames("container", s.navbar_container)}>
        <Link to="/" className={s.box_logo}>
          <img
            src={logo}
            alt="logo"
            className={s.logo}
            width={36}
            height={36}
          />
          <Text tag="span" view="p-20" weight="bold">
            Food Client
          </Text>
        </Link>
        <nav className={s.nav}>
          {
            NAV_LINKS.map(({url, title}) => <NavLink to={url} className={isActive}>
            {title}
          </NavLink>)
          }
        </nav>
        <div className={s.profile_actions}>
          <Link to="/">
            <img src={favoriteIcon} alt="favorites" width={17} height={17} />
          </Link>
          <Link to="/">
            <img src={profileIcon} alt="profile" width={24} height={24} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
