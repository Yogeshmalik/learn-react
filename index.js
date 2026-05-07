import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import { appRouter } from "./src/App";

export const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
