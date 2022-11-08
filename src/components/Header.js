import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { signOutAPI } from "../actions";
import useUser from "../hooks/useUser";

const Header = () => {
  const [user, dispatch] = useUser();

  const location = useLocation();

  const singOutHandler = () => {
    dispatch(signOutAPI());
  };

  return (
    <Container>
      <Content>
        <Logo>
          <Link to="/home">
            <img src="/images/home-logo.svg" alt="linkedin logo" />
          </Link>
        </Logo>
        <Serach>
          <div>
            <input type="text" placeholder="Search" />
          </div>
          <SerachIcon>
            <img src="/images/search-icon.svg" alt="search icon" />
          </SerachIcon>
        </Serach>
        <Nav>
          <NavListWrap>
            <NavList className={location.pathname === "home" && "active"}>
              <Link to="/home">
                <img src="/images/nav-home.svg" alt="navbar home icon" />
                <span>Home</span>
              </Link>
            </NavList>
            <NavList className={location.pathname === "network" && "active"}>
              <Link to="/network">
                <img src="/images/nav-network.svg" alt="navbar home icon" />
                <span>My Network</span>
              </Link>
            </NavList>
            <NavList className={location.pathname === "jobs" && "active"}>
              <Link to="/jobs">
                <img src="/images/nav-jobs.svg" alt="navbar home icon" />
                <span>Jobs</span>
              </Link>
            </NavList>
            <NavList className={location.pathname === "messaging" && "active"}>
              <Link to="/messaging">
                <img src="/images/nav-messaging.svg" alt="navbar home icon" />
                <span>Messaging</span>
              </Link>
            </NavList>
            <NavList
              className={location.pathname === "notifications" && "active"}
            >
              <Link to="/notifications">
                <img
                  src="/images/nav-notifications.svg"
                  alt="navbar home icon"
                />
                <span>Notifications</span>
              </Link>
            </NavList>
            <User>
              <Link>
                <img
                  src={
                    user && user.photoURL ? user.photoURL : "/images/user.svg"
                  }
                  alt=""
                />
                <span>
                  {user ? user.displayName : "Me"}
                  <img src="/images/down-icon.svg" alt="drop down" />
                </span>
              </Link>

              <SignOut onClick={singOutHandler}>
                <Link>Sign Out</Link>
              </SignOut>
            </User>

            <Work>
              <Link>
                <img src="/images/nav-work.svg" alt="work" />
                <span>
                  Work
                  <img src="/images/down-icon.svg" alt="drop down" />
                </span>
              </Link>
            </Work>
          </NavListWrap>
        </Nav>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  padding: 0 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  z-index: 100;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  min-height: 100%;
  max-width: 1128px;
`;

const Logo = styled.span`
  margin-right: 8px;
  font-size: 0px;
`;

const Serach = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;
  & > div {
    max-width: 288px;
    input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 218px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
    }
  }
`;

const SerachIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  left: 2px;
  top: 10px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nav = styled.nav`
  margin-left: auto;
  display: block;
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
    width: 100%;
  }
`;

const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;

  .active {
    span:after {
      content: "";
      transform: scaleX(1);
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      border-bottom: 2px solid var(--white, #fff);
      border-color: rgba(0, 0, 0, 0.9);
      transition: transform 0.2s ease-in-out;
    }
  }
`;

const NavList = styled.li`
  display: flex;
  align-items: center;
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: transparent;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.5;
    min-height: 52px;
    min-width: 80px;
    position: relative;
    text-decoration: none;
    span {
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
    }
    @media (max-width: 768px) {
      min-width: 70px;
    }
  }
  &:hover,
  &:active {
    a {
      span {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }
`;

const SignOut = styled.div`
  position: absolute;
  top: 45px;
  background: white;
  border-radius: 0 0 5px 5px;
  width: 100px;
  height: 40px;
  font-size: 16px;
  transition-duration: 125ms;
  text-align: center;
  display: none;

  a {
    color: rgba(0, 0, 0, 0.9);
    &:hover {
      color: #0a66c2;
    }
  }
`;

const User = styled(NavList)`
  a > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  &:hover {
    ${SignOut} {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  span {
    display: flex;
    align-items: center;
  }
`;

const Work = styled(User)`
  border-left: 1px solid rgba(0, 0, 0, 0.05);
`;

export default Header;
