import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getUserAuth } from "./actions";
import Login from "./components/Login";
import Home from "./components/Home";

import "./App.css";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    path: "/home",
    element: <Home />,
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAuth());
  });

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
