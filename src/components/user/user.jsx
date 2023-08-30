import { useState } from "react";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Icon } from "../icon/icon";
import { LinkList } from "../links/links";
import { useQuery } from "react-query";
import { USER_ROLES } from "../../utils/enums/index.js";

export const User = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prevState) => !prevState);
  const navigate = useNavigate();
  const user = useQuery({
    queryKey: ["user"],
  });

  const handleLogOut = () => {
    localStorage.removeItem("u_at");
    navigate("/auth-login");
  };

  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="dropdown-toggle"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <div className="user-toggle">
          <div className="user-avatar">
            <span>
              <Icon name="user-alt"></Icon>
            </span>
          </div>
          <div className="user-info d-none d-md-block">
            <div className="user-status">
              {USER_ROLES[user?.data?.role.toLocaleUpperCase()]}
            </div>
            <div className="user-name dropdown-indicator">
              {user?.data?.full_name}
            </div>
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu end className="dropdown-menu-md dropdown-menu-s1">
        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
          <div className="user-card sm">
            <div className="user-avatar">
              <Icon name="user-alt"></Icon>
            </div>
            <div className="user-info">
              <span className="lead-text">{user?.data?.full_name}</span>
              <span className="sub-text">
                {USER_ROLES[user?.data?.role.toLocaleUpperCase()]}
              </span>
            </div>
          </div>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <div className="cursor-pointer" onClick={handleLogOut}>
              <Icon name="signout"></Icon>
              <span>Log out</span>
            </div>
          </LinkList>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};
