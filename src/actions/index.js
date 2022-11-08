import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from "./actionType";

import db, { auth, provider, storage } from "../firebase";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, query, onSnapshot } from "firebase/firestore";
export const setUser = (payload) => ({ type: SET_USER, user: payload });

export const setLoading = (status) => ({
  type: SET_LOADING_STATUS,
  status: status,
});

export const setArticles = (payload) => ({
  type: GET_ARTICLES,
  articles: payload,
});

export const signInAPI = () => {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((payload) => {
        dispatch(setUser(payload.user));
      })
      .catch((error) => alert(error));
  };
};

export const getUserAuth = () => {
  return (dispatch) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
  };
};

export const signOutAPI = () => {
  return (dispatch) => {
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => console.log(error));
  };
};

export const postArticleAPI = (payload) => {
  return (dispatch) => {
    dispatch(setLoading(true));

    if (payload.image !== "") {
      const storageRef = ref(storage, `images/${payload.image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, payload.image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log("Upload is " + progress + "% done");

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          console.log("Error!!!! :", error.code);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            console.log("downloadURL:", downloadURL);

            await addDoc(collection(db, "articles"), {
              actor: {
                description: payload.user.email,
                title: payload.user.displayName,
                date: payload.timestamp,
                image: payload.user.photoURL,
              },
              video: payload.video,
              shareImage: downloadURL,
              comments: 0,
              description: payload.description,
            });
            dispatch(setLoading(false));
          } catch (e) {
            console.error("Error adding document(image): ", e);
          }
        }
      );
    } else if (payload.video) {
      addDoc(collection(db, "articles"), {
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: payload.video,
        shareImage: "",
        comments: 0,
        description: payload.description,
      }).catch((e) => console.error("Error adding doc(video): ", e));
      dispatch(setLoading(false));
    } else {
      dispatch(setLoading(false));
    }
  };
};

export const getArticlesAPI = () => {
  return (dispatch) => {
    const q = query(collection(db, "articles"));
    const payload = [];
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        payload.push(doc.data());
      });
      dispatch(setArticles(payload));
    });
  };
};
