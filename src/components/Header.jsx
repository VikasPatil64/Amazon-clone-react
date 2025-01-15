/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router";


const Header = () => {

  const userData = JSON.parse(sessionStorage.getItem("user"));

    return (
        <header>
        <div className="navbar">
          {/*-- Logo Section -->*/}
          <div className="nav-logo border-header">
            <div className="logo"></div>
          </div>

          {/* <!-- Address Section --> */}
          <div className="nav-address border-header">
            <p className="add1">Deliver to</p>
            <div className="add-icon">
              <i className="fa-solid fa-location-dot"></i>
              <p className="add2">India</p>
            </div>
          </div>

          {/* <!-- Search Bar Section --> */}
          <div className="nav-search">
            <select className="search-select">
              <option>All</option>
            </select>
            <input
              className="search-input"
              type="text"
              placeholder="Search Amazon.com"
            />
            <div className="search-icon">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>

          {/* <!-- Sign-in Section --> */}
          <div className="nav-signin border-header">
            <p>
              <span>Hello, {userData ? userData.name :<Link to="/SignUp">sign in</Link>}</span>
            </p>
            <p className="nav-second">Account & Lists</p>
          </div>

          {/* <!-- Returns & Orders Section --> */}
          <div className="nav-return border-header">
            <p>
              <span>Returns</span>
            </p>
            <p className="nav-second">& Orders</p>
          </div>

          {/* <!-- Cart Section --> */}
          <div className="nav-cart border-header">
            <i className="fa-solid fa-cart-shopping"></i>
            <Link
              to="/cart"
              className="cart-link"
              target="_blank"
            >
              Cart
            </Link>
          </div>
        </div>
        <div className="panel">
          <div className="panelall">
            <i className="fa-solid fa-bars"></i>
            All
          </div>
          <div className="panel-options">
            <p>Today's Deals</p>
            <p>Customer service</p>
            <p>Registry</p>
            <p>Gift Cards</p>
            <p>Sell</p>
            <p><Link to="/product-list">Product List</Link></p>
          </div>
          <div className="paneldeals">Shop deals in Electronics</div>
        </div>
      </header>
    )
};

export default Header;