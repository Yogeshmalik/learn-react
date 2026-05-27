import Header from "./components/Header";
import Body from "./pages/Restaurants";
import Footer from "./components/Footer";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router";
import About from "./pages/About";
import ErrorPage from "./components/ErrorPage";
import Contact from "./pages/Contact";
import RestaurantPage from "./pages/RestaurantPage";
import Login from "./auth/Login";
import UserContext from "./providers/UserContext";
import AuthLayout from "./auth/AuthLayout";
import { useContext, useEffect, useRef, useState } from "react";
import useOnline from "./hooks/useOnline";
import Cart from "./pages/Cart";
import { Provider } from "react-redux";
import store from "./store/store";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [userName, setUserName] = useState("");
  const isOnline = useOnline();
  const { loggedInUser } = useContext(UserContext);
  const prevOnlineRef = useRef(isOnline);
  const navigate = useNavigate();
  const location = useLocation();
  // const hideLayout = location.pathname === "/auth/login";

  useEffect(() => {
    const data = {
      name: "Yogesh",
    };
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    } else {
      setUserName(data.name);
    }
  }, []);

  useEffect(() => {
    if (window.location.pathname === "/index.html") {
      window.history.replaceState(null, "", "/");
    }
  }, []);

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuth");
    if (!isAuth) {
      navigate("/auth/login");
    }
  }, []);

  useEffect(() => {
    if (!prevOnlineRef.current && isOnline) {
      setIsConnecting(true);

      const timer = setTimeout(() => {
        setIsConnecting(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
    prevOnlineRef.current = isOnline;
  }, [isOnline]);

  if (!isOnline) {
    return (
      <div className="flex items-center text-center w-full justify-center font-bold text-2xl space-x-2 text-red-500 min-h-screen m-auto">
        <h1 className="w-full text-center mx-auto">
          🔴Offline! Check internet connection!!
        </h1>
      </div>
    );
  }

  if (isConnecting) {
    return (
      <div className="flex items-center justify-center font-bold text-2xl space-x-2 text-green-500 min-h-screen mx-auto">
        <img
          src="https://png.pngtree.com/png-vector/20230926/ourmid/pngtree-green-wifi-symbol-network-png-image_10115831.png"
          className="w-10 h-8 flex "
        />
        <h1>Connected to internet...</h1>
      </div>
    );
  }

  return (
    <Provider store={store}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <div className="App relative box-border pt-20 md:pt-24 w-full min-h-dvh h-full mx-auto flex flex-col justify-between overflow-auto">
          <AuthLayout>
            {/* {!hideLayout &&  */}
            <Header />
            {/* } */}
            <Outlet />
            {/* {!hideLayout &&  */}
            {/* <Footer /> */}
            {/* } */}
          </AuthLayout>
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "restaurant-details/:restaurantId",
        element: <RestaurantPage />,
      },
    ],
  },
  {
    path: "auth/login",
    element: <Login />,
  },
]);

export default App;
