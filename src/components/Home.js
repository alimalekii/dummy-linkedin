import { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Header from "./Header";
import Rightside from "./Rightside";
import Leftside from "./Leftside";
import Main from "./Main";
import useUser from "../hooks/useUser";

const Home = () => {
  const user = useUser()[0];
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Fragment>
      <Header />
      <Container>
        <Section>
          <h5>
            <Link>Hiring in a hurry? - </Link>
          </h5>
          <p>
            Find talented pros in record time with Upwork and business moving.
          </p>
        </Section>

        <Layout>
          <Leftside />
          <Main />
          <Rightside />
        </Layout>
      </Container>
    </Fragment>
  );
};

const Container = styled.div`
  padding-top: 52px;
  max-width: 80%;
  margin: 0 auto;
`;

const Section = styled.div`
  min-height: 25px;
  padding: 16px 0;
  box-sizing: content-box;
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;
  gap: 5px;

  h5 {
    font-size: 14px;
    a {
      color: #0a66c2;
      font-weight: 700;
    }
  }

  p {
    font-size: 14px;
    color: #434649;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5px;
    gap: 0;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside main rigtside";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  column-gap: 25px;
  margin: 25px 0;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;

export default Home;
