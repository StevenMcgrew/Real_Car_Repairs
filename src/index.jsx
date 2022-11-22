import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store.js";

import RootLayout from "./layouts/RootLayout/RootLayout";
import ErrorPage from "./routes/ErrorPage/ErrorPage";
import HomePage from "./routes/HomePage/HomePage";
import CreatePage from "./routes/CreatePage/CreatePage";
import HistoryPage from "./routes/HistoryPage/HistoryPage";
import LibraryPage from "./routes/LibraryPage/LibraryPage";
import AboutPage from "./routes/AboutPage/AboutPage";
import LegalPage from "./routes/LegalPage/LegalPage";

const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <HomePage /> },
          {
            path: "create",
            element: <CreatePage />,
            errorElement: <div>Oops! There was an error.</div>,
          },
          {
            path: "history",
            element: <HistoryPage />,
            errorElement: <div>Oops! There was an error.</div>,
          },
          {
            path: "library",
            element: <LibraryPage />,
            errorElement: <div>Oops! There was an error.</div>,
          },
          {
            path: "about",
            element: <AboutPage />,
            errorElement: <div>Oops! There was an error.</div>,
          },
          {
            path: "legal",
            element: <LegalPage />,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
