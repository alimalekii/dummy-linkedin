import styled from "styled-components";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

const ArticleItem = (props) => {
  return (
    <Article>
      <SharedActor>
        <Link>
          <img src={props.image ? props.image : "/images/user.svg"} alt="" />
          <div>
            <span>{props.title}</span>
            <span>{props.info}</span>
            <span>{props.date}</span>
          </div>
        </Link>
        <button>
          <img src="/images/ellipsis-icon.svg" alt="" />
        </button>
      </SharedActor>
      <Description>{props.description}</Description>
      <SharedImage>
        <Link>
          {props.shareImage && !props.video && (
            <img src={props.shareImage} alt="" />
          )}

          {!props.shareImage && props.video && (
            <ReactPlayer width="100%" url={props.video} />
          )}
        </Link>
      </SharedImage>
      <SocailCounts>
        <li>
          <button>
            <img
              src="https://static-exp1.licdn.com/sc/h/8ekq8gho1ruaf8i7f86vd1ftt"
              alt=""
            />
            <img
              src="https://static-exp1.licdn.com/sc/h/b1dl5jk88euc7e9ri50xy5qo8"
              alt=""
            />
            <img
              src="https://static-exp1.licdn.com/sc/h/4mv33903v0o9ikpwfuy2ftcc6"
              alt=""
            />
            <span>73</span>
          </button>
        </li>
        <li>
          <Link>{props.comments} Comments</Link>
        </li>
      </SocailCounts>
      <SocialActions>
        <button>
          <img src="/images/like.svg" alt="" />
          <span>Like</span>
        </button>

        <button>
          <img src="/images/comment.svg" alt="" />
          <span>Comment</span>
        </button>
        <button>
          <img src="/images/repost.svg" alt="" />
          <span>Repost</span>
        </button>
        <button>
          <img src="/images/send.svg" alt="" />
          <span>Send</span>
        </button>
      </SocialActions>
    </Article>
  );
};

export default ArticleItem;

export const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 /15%), 0 0 rgba(0 0 0 /20%);
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const SharedActor = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  padding: 12px 48px 0 16px;
  margin-bottom: 8px;

  a {
    display: flex;
    flex-grow: 1;
    margin-right: 12px;
    overflow: hidden;
    text-decoration: none;
    color: rgba(0, 0, 0, 1);

    img {
      width: 48px;
      height: 48px;
    }

    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;

        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }

        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.8);
        }
      }
    }
  }

  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

const SharedImage = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocailCounts = styled.ul`
  line-height: 1.3;
  list-style: none;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  li {
    margin-right: 5px;
    font-size: 12px;

    button {
      display: flex;
      background-color: transparent;
      border: none;
    }

    a {
      text-decoration: none;
    }
  }
`;

const SocialActions = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;

  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #0a66ca;

    background: transparent;
    border: none;

    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;
