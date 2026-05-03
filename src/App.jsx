import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./pages/Body";
import Footer from "./components/Footer";
import { createBrowserRouter, RouterProvider, Outlet, useNavigate } from "react-router";
import About from "./pages/About";
import ErrorPage from "./components/ErrorPage";
import Contact from "./pages/Contact";
import RestaurantPage from "./pages/RestaurantPage";
import Login from "./auth/Login";
import { useEffect, useRef, useState } from "react";
import AuthLayout from "./auth/AuthLayout";
import useOnline from "./hooks/useOnline";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const isOnline = useOnline();
  const prevOnlineRef = useRef(isOnline);
const navigate = useNavigate()

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuth");
    if (!isAuth) {
      // window.location.href = "/auth/login";
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
      <h1 className="font-bold text-2xl text-red-500">
        🔴Offline! Check internet connection!!
      </h1>
    );
  }

  if (isConnecting) {
    return (
      <h1 className="font-bold text-2xl text-green-500">
        🟢Connected to internet...
      </h1>
    );
  }

  return (
    <div className="App relative box-border mt-24 w-full h-scree mx-auto flex flex-col justify-between overflow-auto">
      <AuthLayout>
        <Header />
        <Outlet />
        <Footer />
      </AuthLayout>
    </div>
  );
};

const appRouter = createBrowserRouter([
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

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
