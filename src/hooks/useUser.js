import { useSelector, useDispatch } from "react-redux";

const useUser = () => {
  const user = useSelector((state) => state.userState.user);
  const dispatch = useDispatch();

  return [user, dispatch];
};

export default useUser;
