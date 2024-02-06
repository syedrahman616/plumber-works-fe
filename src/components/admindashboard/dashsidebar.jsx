import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <>
      <div className={`bar-icon ${sidebarVisible ? "active" : ""}`} onClick={toggleSidebar}>
        <i className="fa fa-bars" style={{ fontSize: "24px", color: "black" }} />
      </div>

      <aside className={`aside100 ${sidebarVisible ? "visible" : ""}`}>
        <ul className="dashside_ul">
          <li className={location.pathname === "/dashboard" ? "active-link" : ""}>
            <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active-link" : ""}>
              <i className={`fa fa-dashboard${location.pathname === "/dashboard" ? " active-link" : ""}`} />
              Dashboard
            </Link>
          </li>
          <li onClick={() => toggleDropdown("plumbers")} className={`dropdown ${activeDropdown === "plumbers" ? "active-link" : ""}`}>
            <div>
              <i className={`fa fa-wrench ${activeDropdown === "plumbers" ? " active-link" : ""}`} />
              Plumbers
              <i className={`fa fa-caret-down`} />
            </div>
            {activeDropdown === "plumbers" && (
              <>
                <li>
                  <Link to="/plumberdetails"><i className="fa fa-user" /> Plumber Detail</Link>
                </li>
                <li>
                  <Link to="/plumberdetails"><i className="fa fa-briefcase" /> Plumber Jobs</Link>
                </li>
              </>
            )}
          </li>
          <li onClick={() => toggleDropdown("customers")} className={`dropdown ${activeDropdown === "customers" ? "active-link" : ""}`}>
            <div>
              <i className={`fa fa-users${activeDropdown === "customers" ? " active-link" : ""}`} />
              Customers
              <i className={`fa fa-caret-down`} />
            </div>
            {activeDropdown === "customers" && (
              <>
                <li>
                  <Link to="/customer"><i className="fa fa-address-card" /> Customer Details</Link>
                </li>
                <li>
                  <Link to="#"><i className="fa fa-shopping-cart" /> Customer Orders</Link>
                </li>
              </>
            )}
          </li>
          <li className={location.pathname === "/review" ? "active-link" : ""}>
            <Link to="/review" className={location.pathname === "/review" ? "active-link" : ""}>
              <i className={`fa fa-star${location.pathname === "/review" ? " active-link" : ""}`} />
              Review & Ratings
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
