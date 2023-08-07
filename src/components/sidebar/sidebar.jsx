import { useState } from 'react';
import classNames from 'classnames';
import SimpleBar from 'simplebar-react';
import { ReactComponent as BrandLogo } from '../../assets/icons/logo.svg';
import Toggle from './toggle';

import PropTypes from 'prop-types';

import { useTheme, useThemeUpdate } from '../../context';
import { Menu } from './menu';
import { Link } from 'react-router-dom';

export const Sidebar = ({ fixed, className }) => {
  const theme = useTheme();
  const themeUpdate = useThemeUpdate();
  const [mouseEnter, setMouseEnter] = useState(false);

  const handleMouseEnter = () => setMouseEnter(true);
  const handleMouseLeave = () => setMouseEnter(false);

  const classes = classNames({
    'nk-sidebar': true,
    'nk-sidebar-fixed': fixed,
    'nk-sidebar-active': theme.sidebarVisibility || false,
    'nk-sidebar-mobile': theme.sidebarMobile || false,
    'is-compact': theme?.sidebarCompact || false,
    'has-hover': theme.sidebarCompact && mouseEnter,
    [`is-light`]: theme.sidebar === 'white',
    [`is-${theme.sidebar}`]: theme.sidebar !== 'white' && theme.sidebar !== 'light',
    [`${className}`]: className,
  });

  return (
    <>
      <div className={`custom__sidebar ${classes}`}>
        <div className="nk-sidebar-element nk-sidebar-head">
          <div className="nk-sidebar-brand">
            <Link to={'/'}>
              <BrandLogo
                className={`brand__logo-sidebar ${theme.sidebarCompact ? '' : 'active'}`}
              />
            </Link>
          </div>
          <div className="nk-menu-trigger me-n2">
            <Toggle
              className="nk-nav-toggle nk-quick-nav-icon d-xl-none me-n2"
              icon="arrow-left"
              click={themeUpdate.sidebarVisibility}
            />
            <Toggle
              className={`nk-nav-compact nk-quick-nav-icon d-none d-xl-inline-flex ${
                theme.sidebarCompact ? 'compact-active' : ''
              }`}
              click={themeUpdate.sidebarCompact}
              icon="menu"
            />
          </div>
        </div>
        <div
          className="nk-sidebar-content"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <SimpleBar className="nk-sidebar-menu">
            <Menu />
          </SimpleBar>
        </div>
      </div>
      {theme.sidebarVisibility && (
        <div onClick={themeUpdate.sidebarVisibility} className="nk-sidebar-overlay"></div>
      )}
    </>
  );
};

Sidebar.propTypes = {
  fixed: PropTypes.bool,
  className: PropTypes.string,
};
