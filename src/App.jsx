import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./pages/Body";
import Footer from "./components/Footer";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import About from "./pages/About";
import ErrorPage from "./components/ErrorPage";
import Contact from "./pages/Contact";
import RestaurantPage from "./pages/RestaurantPage";
import Login from "./auth/Login";
import { useEffect, useState } from "react";
import AuthLayout from "./auth/AuthLayout";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuth");
    if (!isAuth) {
      window.location.href = "/auth/login";
    }
  }, []);

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
