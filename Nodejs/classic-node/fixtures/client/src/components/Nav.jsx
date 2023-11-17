import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import baseUrl from "../env";
function Nav() {
  const [loc, setLoc] = useState("");

  let location = useLocation();
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch(baseUrl + "/auth/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        localStorage.removeItem("user");
        setUser(null);
      })
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setLoc(location.pathname.split("/")[1]);
  }, [location]);

  return (
    <div className="header_section">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">
            <img src="/images/logo.png" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className={loc === "" ? "nav-item active" : "nav-item"}>
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li className={loc === "about" ? "nav-item active" : "nav-item"}>
                <a className="nav-link" href="/about">
                  About
                </a>
              </li>
              <li
                className={
                  loc === "furnitures" ? "nav-item active" : "nav-item"
                }
              >
                <a className="nav-link" href="/furnitures">
                  Furnitures
                </a>
              </li>
              <li
                className={loc === "contact" ? "nav-item active" : "nav-item"}
              >
                <a className="nav-link" href="contact.html">
                  Contact Us
                </a>
              </li>
              {user === null ? (
                <>
                  <li
                    className={loc === "login" ? "nav-item active" : "nav-item"}
                  >
                    <a className="nav-link" href="login">
                      Login
                    </a>
                  </li>
                  <li
                    className={
                      loc === "register" ? "nav-item active" : "nav-item"
                    }
                  >
                    <a className="nav-link" href="/register">
                      Register
                    </a>
                  </li>
                </>
              ) : user.role === "Admin" ? (
                <>
                  <li
                    className={loc === "admin" ? "nav-item active" : "nav-item"}
                  >
                    <a className="nav-link" href="/admin">
                      Panel
                    </a>
                  </li>
                  <li
                    className={
                      loc === "logout" ? "nav-item active" : "nav-item"
                    }
                  >
                    <a onClick={handleLogout} className="nav-link">
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li
                    className={
                      loc === "basket" ? "nav-item active" : "nav-item"
                    }
                  >
                    <a className="nav-link" href="/basket">
                      Basket
                    </a>
                  </li>
                  <li
                    className={
                      loc === "logout" ? "nav-item active" : "nav-item"
                    }
                  >
                    <a onClick={handleLogout} className="nav-link">
                      Logout
                    </a>
                  </li>
                </>
              )}
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <div className="call_text">
                <ul>
                  <li>
                    <a href="#">
                      <i className="fa fa-phone" aria-hidden="true"></i>
                      <span className="padding_left_15">
                        Call : +01 1234567890
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-map-marker" aria-hidden="true"></i>
                      <span className="padding_left_15">Loram ipusm</span>
                    </a>
                  </li>
                </ul>
              </div>
            </form>
          </div>
        </nav>
        <div className="custome_menu">
          <ul>
            <li className={loc === "" && "active"}>
              <a href="/">Home</a>
            </li>
            <li className={loc === "about" && "active"}>
              <a href="/about">About</a>
            </li>
            <li className={loc === "furnitures" && "active"}>
              <a href="/furnitures">Furnitures</a>
            </li>
            {user === null ? (
              <>
                <li className={loc === "login" && "active"}>
                  <a href="/login">Login</a>
                </li>
                <li className={loc === "register" && "active"}>
                  <a href="/register">Register</a>
                </li>
              </>
            ) : user.role === "Admin" ? (
              <>
                <li className={loc === "admin" && "active"}>
                  <a href="/admin">Panel</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </>
            ) : (
              <>
                <li className={loc === "basket" && "active"}>
                  <a href="/basket">Basket</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </>
            )}
            <li className={loc === "contact" && "active"}>
              <a href="/contact">Contact Us</a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-search" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Nav;
