import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Icon } from "../icon/icon";
import { Link, NavLink } from "react-router-dom";
import { useQuery } from "react-query";
import { useSidebarMenu } from "../../utils/hooks";

const MenuHeading = ({ heading }) => {
  return (
    <li className="nk-menu-heading">
      <h6 className="overline-title text-primary-alt">{heading}</h6>
    </li>
  );
};

MenuHeading.propTypes = {
  heading: PropTypes.string,
};

const MenuItem = ({
  icon,
  link,
  text,
  sub,
  newTab,
  mobileView,
  sidebarToggle,
  badge,
}) => {
  let currentUrl;

  const toggleActionSidebar = (e) => {
    if (!sub && !newTab && mobileView) {
      sidebarToggle(e);
    }
  };

  if (window.location.pathname !== undefined) {
    currentUrl = window.location.pathname;
  } else {
    currentUrl = null;
  }

  const menuHeight = (el) => {
    var totalHeight = [];
    for (var i = 0; i < el.length; i++) {
      var margin =
        parseInt(window.getComputedStyle(el[i]).marginTop.slice(0, -2)) +
        parseInt(window.getComputedStyle(el[i]).marginBottom.slice(0, -2));
      var padding =
        parseInt(window.getComputedStyle(el[i]).paddingTop.slice(0, -2)) +
        parseInt(window.getComputedStyle(el[i]).paddingBottom.slice(0, -2));
      var height = el[i].clientHeight + margin + padding;
      totalHeight.push(height);
    }
    totalHeight = totalHeight.reduce((sum, value) => (sum += value));
    return totalHeight;
  };

  const makeParentActive = (el, childHeight) => {
    let element = el.parentElement.parentElement.parentElement;
    let wrap = el.parentElement.parentElement;
    if (element.classList[0] === "nk-menu-item") {
      element.classList.add("active");
      const subMenuHeight = menuHeight(el.parentNode.children);
      wrap.style.height = subMenuHeight + childHeight - 50 + "px";
      makeParentActive(element);
    }
  };

  useEffect(() => {
    var element = document.getElementsByClassName(
      "nk-menu-item active current-page"
    );
    var arrayElement = [...element];

    arrayElement.forEach((dom) => {
      if (
        dom.parentElement.parentElement.parentElement.classList[0] ===
        "nk-menu-item"
      ) {
        dom.parentElement.parentElement.parentElement.classList.add("active");
        const subMenuHeight = menuHeight(dom.parentNode.children);
        dom.parentElement.parentElement.style.height = subMenuHeight + "px";
        makeParentActive(
          dom.parentElement.parentElement.parentElement,
          subMenuHeight
        );
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const menuToggle = (e) => {
    e.preventDefault();
    var self = e.target.closest(".nk-menu-toggle");
    var parent = self.parentElement;
    var subMenu = self.nextSibling;
    var subMenuItem = subMenu.childNodes;
    var parentSiblings = parent.parentElement.childNodes;
    var parentMenu = parent.closest(".nk-menu-wrap");
    //For Sub Menu Height
    var subMenuHeight = menuHeight(subMenuItem);
    // Get parent elements
    const getParents = (el, parentSelector) => {
      parentSelector = document.querySelector(".nk-menu");
      if (parentSelector === undefined) {
        parentSelector = document;
      }
      var parents = [];
      var p = el.parentNode;
      while (p !== parentSelector) {
        var o = p;
        parents.push(o);
        p = o.parentNode;
      }
      parents.push(parentSelector);
      return parents;
    };
    var parentMenus = getParents(self);
    if (!parent.classList.contains("active")) {
      // For Parent Siblings
      for (var j = 0; j < parentSiblings.length; j++) {
        parentSiblings[j].classList.remove("active");
        if (typeof parentSiblings[j].childNodes[1] !== "undefined") {
          parentSiblings[j].childNodes[1].style.height = 0;
        }
      }
      if (parentMenu !== null) {
        if (!parentMenu.classList.contains("sub-opened")) {
          parentMenu.classList.add("sub-opened");

          for (var l = 0; l < parentMenus.length; l++) {
            if (typeof parentMenus !== "undefined") {
              if (parentMenus[l].classList.contains("nk-menu-wrap")) {
                parentMenus[l].style.height =
                  subMenuHeight + parentMenus[l].clientHeight + "px";
              }
            }
          }
        }
      }
      // For Current Element
      parent.classList.add("active");
      subMenu.style.height = subMenuHeight + "px";
    } else {
      parent.classList.remove("active");
      if (parentMenu !== null) {
        parentMenu.classList.remove("sub-opened");
        for (var k = 0; k < parentMenus.length; k++) {
          if (typeof parentMenus !== "undefined") {
            if (parentMenus[k].classList.contains("nk-menu-wrap")) {
              parentMenus[k].style.height =
                parentMenus[k].clientHeight - subMenuHeight + "px";
            }
          }
        }
      }
      subMenu.style.height = 0;
    }
  };

  const menuItemClass = classNames({
    "nk-menu-item": true,
    "has-sub": sub,
    "active current-page": currentUrl === import.meta.env.PUBLIC_URL + link,
  });
  return (
    <li className={menuItemClass} onClick={(e) => toggleActionSidebar(e)}>
      {newTab ? (
        <Link
          to={import.meta.env.VITE_AS + link}
          target="_blank"
          rel="noopener noreferrer"
          className="nk-menu-link"
        >
          {icon ? (
            <span className="nk-menu-icon">
              <Icon name={icon} />
            </span>
          ) : null}
          <span className="nk-menu-text">{text}</span>
        </Link>
      ) : (
        <NavLink
          to={link}
          className={`nk-menu-link${sub ? " nk-menu-toggle" : ""}`}
          onClick={sub ? menuToggle : null}
        >
          {icon ? (
            <span className="nk-menu-icon">
              <Icon name={icon} />
            </span>
          ) : null}
          <span className="nk-menu-text">{text}</span>
          {badge && <span className="nk-menu-badge">{badge}</span>}
        </NavLink>
      )}
      {sub ? (
        <div className="nk-menu-wrap">
          <MenuSub
            sub={sub}
            sidebarToggle={sidebarToggle}
            mobileView={mobileView}
          />
        </div>
      ) : null}
    </li>
  );
};

MenuItem.propTypes = {
  icon: PropTypes.string,
  link: PropTypes.string,
  text: PropTypes.string,
  panel: PropTypes.any,
  newTab: PropTypes.any,
  mobileView: PropTypes.bool,
  sidebarToggle: PropTypes.any,
  badge: PropTypes.any,
  sub: PropTypes.any,
};

const MenuSub = ({ sub, sidebarToggle, mobileView, ...props }) => {
  return (
    <ul className="nk-menu-sub" style={props.style}>
      {sub.map((item) => (
        <MenuItem
          link={item.link}
          icon={item.icon}
          text={item.text}
          sub={item.subMenu}
          key={item.text}
          newTab={item.newTab}
          badge={item.badge}
          sidebarToggle={sidebarToggle}
          mobileView={mobileView}
        />
      ))}
    </ul>
  );
};

MenuSub.propTypes = {
  icon: PropTypes.string,
  link: PropTypes.string,
  text: PropTypes.string,
  panel: PropTypes.any,
  newTab: PropTypes.any,
  mobileView: PropTypes.bool,
  sidebarToggle: PropTypes.any,
  badge: PropTypes.any,
  sub: PropTypes.array,
  style: PropTypes.string,
};

const PanelItem = ({
  icon,
  link,
  text,
  subPanel,
  index,
  data,
  setMenuData,
  menuMockProp,
}) => {
  const menuItemClass = classNames({
    "nk-menu-item": true,
  });

  if (data === menuMockProp) {
    return (
      <li className={menuItemClass}>
        <Link
          to={link}
          className="nk-menu-link"
          onClick={() => setMenuData([menuMockProp[index]])}
        >
          {icon ? (
            <span className="nk-menu-icon">
              <Icon name={icon} />
            </span>
          ) : null}
          <span className="nk-menu-text">{text}</span>
          <span className="nk-menu-badge">HOT</span>
        </Link>
      </li>
    );
  } else {
    return (
      <>
        {subPanel.map((item) => (
          <MenuItem
            key={item.text}
            link={item.link}
            icon={item.icon}
            text={item.text}
            sub={item.subMenu}
            badge={item.badge}
          />
        ))}
        <MenuHeading heading="Return to" />
        <li className={menuItemClass}>
          <Link
            to={`/`}
            className="nk-menu-link"
            onClick={() => setMenuData(menuMockProp)}
          >
            <span className="nk-menu-icon">
              <Icon name="dashlite-alt" />
            </span>
            <span className="nk-menu-text">Main Dashboard</span>
          </Link>
        </li>
        <li className={menuItemClass}>
          <Link
            to={`/`}
            className="nk-menu-link"
            onClick={() => setMenuData(menuMockProp)}
          >
            <span className="nk-menu-icon">
              <Icon name="layers-fill" />
            </span>
            <span className="nk-menu-text">All Components</span>
          </Link>
        </li>
      </>
    );
  }
};

PanelItem.propTypes = {
  icon: PropTypes.string,
  link: PropTypes.string,
  text: PropTypes.string,
  subPanel: PropTypes.array,
  index: PropTypes.number,
  data: PropTypes.array,
  setMenuData: PropTypes.func,
  menuMockProp: PropTypes.arr,
};

export const Menu = ({ sidebarToggle, mobileView }) => {
  const { isLoading, sidebar_menu } = useSidebarMenu();

  const [data, setMenuData] = useState(sidebar_menu);
  const user = useQuery({ queryKey: ["user"] });

  if (isLoading) {
    return <>Loading</>;
  }

  return (
    <ul className="nk-menu">
      {sidebar_menu.map((item, index) => {
        const hasAccess = item.access.find((role) => role === user.data?.role);

        if (!hasAccess) {
          return null;
        }

        return item.heading ? (
          <MenuHeading heading={item.heading} key={item.heading} />
        ) : item.panel ? (
          <PanelItem
            key={item.text}
            link={item.link}
            icon={item.icon}
            text={item.text}
            index={index}
            panel={item.panel}
            subPanel={item.subPanel}
            data={data}
            setMenuData={setMenuData}
            sidebarToggle={sidebarToggle}
            menuMockProp={sidebar_menu}
          />
        ) : (
          <MenuItem
            key={item.text}
            link={item.link}
            icon={item.icon}
            text={item.text}
            sub={item.subMenu}
            badge={item.badge}
            panel={item.panel}
            subPanel={item.subPanel}
            sidebarToggle={sidebarToggle}
            mobileView={mobileView}
          />
        );
      })}
    </ul>
  );
};

Menu.propTypes = {
  sidebarToggle: PropTypes.bool,
  mobileView: PropTypes.bool,
};
