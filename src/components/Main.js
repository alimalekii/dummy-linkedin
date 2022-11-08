import styled from "styled-components";
import useUser from "../hooks/useUser";
import PostModal from "./PostModal";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getArticlesAPI } from "../actions";
import ArticleItem from "./Article";

const Main = () => {
  const [user, dispatch] = useUser();
  const [showModal, setShowModal] = useState(false);

  const loading = useSelector((state) => state.articleState.loading);
  const articles = useSelector((state) => state.articleState.articles);

  const openModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(getArticlesAPI());
  }, [dispatch]);

  return (
    <Container>
      <ShareBox>
        <div>
          <img
            src={user && user.photoURL ? user.photoURL : "/images/user.svg"}
            alt=""
          />
          <button onClick={openModalHandler} disabled={loading ? true : false}>
            Start a post
          </button>
        </div>

        <div>
          <button>
            <img src="/images/photo-icon.svg" alt="" />
            <span>Photo</span>
          </button>
          <button>
            <img src="/images/video-icon.svg" alt="" />
            <span>Video</span>
          </button>
          <button>
            <img src="/images/event-icon.svg" alt="" />
            <span>Event</span>
          </button>
          <button>
            <img src="/images/article-icon.svg" alt="" />
            <span>Write article</span>
          </button>
        </div>
      </ShareBox>
      <Content>
        {loading && <img src="/images/spinner.svg" alt="" />}

        {articles.length === 0 && <h2>There are no articles</h2>}

        {articles.length > 0 &&
          articles.map((article, key) => {
            return (
              <ArticleItem
                key={key}
                image={article.actor.image}
                title={article.actor.title}
                info={article.actor.description}
                description={article.description}
                date={article.actor.date.toDate().toLocaleDateString()}
                video={article.video}
                shareImage={article.shareImage}
                comments={article.comments}
              />
            );
          })}
      </Content>
      {showModal && <PostModal onClose={closeModalHandler} />}
    </Container>
  );
};

const Container = styled.div`
  grid-area: "main";
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 /15%), 0 0 rgba(0 0 0 /20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;

  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.8);
      font-size: 14px;
      line-height: 1.5%;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      font-weight: 600;
      align-items: center;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px;
      justify-content: start;

      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }

      button {
        flex-grow: 1;
        margin: 4px 0;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.25);
        border-radius: 35px;
        background-color: white;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 8px;

      button {
        img {
          width: 20px;
          height: 20px;
          margin: 0 4px 0 -2px;
        }
        span {
          color: #70b5f9;
        }
      }
    }
  }
`;

const Content = styled.div`
  text-align: center;
`;

export default Main;
