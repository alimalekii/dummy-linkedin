import { useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import useUser from "../hooks/useUser";
import { postArticleAPI } from "../actions";
import { Timestamp } from "firebase/firestore";
import { reset } from "colorette";

const PostModal = (props) => {
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideLink] = useState("");
  const [assetArea, setAssetArea] = useState("");
  const [user, dispatch] = useUser();

  const close = (e) => {
    setEditorText("");
    setShareImage("");
    setVideLink("");
    setAssetArea("");
    props.onClose();
  };

  const imageHandler = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`Not an image, the file is a ${typeof image}`);
      return;
    }
    setShareImage(image);
  };

  const switchAssetArea = (area) => {
    setShareImage("");
    setVideLink("");
    setAssetArea(area);
  };

  const postArticleHandler = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      console.log("hello");
      return;
    }

    const payload = {
      image: shareImage,
      video: videoLink,
      user: user,
      description: editorText,
      timestamp: Timestamp.now(),
    };

    dispatch(postArticleAPI(payload));
    reset();
  };

  const ImageInput = (
    <UploadImage>
      <input
        type="file"
        accept="image/gif, image/jpeg, image/png"
        name="image"
        id="file"
        hidden
        onChange={imageHandler}
      />
      <p>
        <label htmlFor="file">Select an Image to share</label>
      </p>
      {shareImage && <img src={URL.createObjectURL(shareImage)} alt="" />}
    </UploadImage>
  );

  const VideoInput = (
    <>
      <input
        type="url"
        placeholder="plaese input a video link"
        value={videoLink}
        onChange={(e) => setVideLink(e.target.value)}
      />
      {videoLink && <ReactPlayer width="100%" url={videoLink} />}
    </>
  );

  return (
    <Container>
      <Content>
        <Header>
          <h2>Create a post</h2>
          <button onClick={(e) => close()}>
            <img src="/images/close-icon.svg" alt="" />
          </button>
        </Header>
        <SharedContent>
          <UserInfo>
            <img
              src={user?.photoURL ? user.photoURL : "/images/user.svg"}
              alt=""
            />
            <span>{user?.displayName ? user.displayName : "Name"}</span>
          </UserInfo>
          <Editor>
            <textarea
              value={editorText}
              onChange={(e) => setEditorText(e.target.value)}
              placeholder="What do you want to talk about?"
              autoFocus={true}
            />
            {assetArea === "image"
              ? ImageInput
              : assetArea === "media" && VideoInput}
          </Editor>
        </SharedContent>
        <ShareCreation>
          <AttachAssets>
            <AssetButton onClick={() => switchAssetArea("image")}>
              <img src="/images/image-icon.svg" alt="" />
            </AssetButton>
            <AssetButton onClick={() => switchAssetArea("media")}>
              <img src="/images/video.svg" alt="" />
            </AssetButton>
          </AttachAssets>
          <ShareCommnet>
            <AssetButton>
              <img src="./images/share-comment.svg" alt="" />
              Anyone
            </AssetButton>
          </ShareCommnet>
          <PostButton
            disabled={!editorText ? true : false}
            onClick={postArticleHandler}
          >
            Post
          </PostButton>
        </ShareCreation>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  animation: fadeIn 0.3s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  top: 32px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const Header = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);

    svg,
    img {
      pointer-events: none;
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background-color: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;

  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  background-color: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.15);
  img {
    width: 24px;
    height: 24px;
  }
`;

const AttachAssets = styled.div`
  display: flex;
  align-items: "center";
  padding-right: 8px;

  ${AssetButton} {
    width: 40px;
  }
`;
const ShareCommnet = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);

  ${AssetButton} {
    svg,
    img {
      margin-right: 5px;
    }
  }
`;

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  border: none;
  background-color: ${(props) =>
    props.disabled ? "rgba(0,0,0,0.7)" : "#0a66c2"};

  color: white;

  &:hover {
    background: ${(props) => (props.disabled ? "" : "#0041b2")};
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
  }
  input {
    width: 100%;
    height: 34px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

export default PostModal;
