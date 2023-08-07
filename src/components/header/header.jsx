import classNames from 'classnames';
import { ReactComponent as BrandLogo } from '../../assets/icons/logo.svg';
// import Logo from "../logo/Logo";
// import User from "./dropdown/user/User";

import Toggle from '../sidebar/toggle';
import PropTypes from 'prop-types';
import { useTheme, useThemeUpdate } from '../../context';
import { User } from '../user/user';
import { Link } from 'react-router-dom';

export const Header = ({ fixed, className }) => {
  const theme = useTheme();
  const themeUpdate = useThemeUpdate();

  const headerClass = classNames({
    'nk-header': true,
    'nk-header-fixed': fixed,
    [`is-light`]: theme.header === 'white',
    [`is-${theme.header}`]: theme.header !== 'white' && theme.header !== 'light',
    [`${className}`]: className,
  });

  return (
    <div className={headerClass}>
      <div className="container-fluid">
        <div className="nk-header-wrap">
          <div className="nk-menu-trigger d-xl-none ms-n1">
            <Toggle
              className="nk-nav-toggle nk-quick-nav-icon d-xl-none ms-n1"
              icon="menu"
              click={themeUpdate.sidebarVisibility}
            />
          </div>
          <div className="nk-header-brand d-xl-none">
            <Link to={'/'}>
              <BrandLogo />
            </Link>
          </div>

          <div className="nk-header-tools">
            <ul className="nk-quick-nav">
              <li className="user-dropdown" onClick={themeUpdate.sidebarHide}>
                <User />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  fixed: PropTypes.bool,
  className: PropTypes.string,
};
