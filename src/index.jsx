import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store.js";

import { PersistGate } from 'redux-persist/integration/react';
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
            <PersistGate loading={null} persistor={persistor}>
                <RouterProvider router={router} />
            </PersistGate>
        </Provider>
    </React.StrictMode>
);


// canvas.toBlob polyfill:
if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob',
        {
            value: function (callback, type, quality) {
                var bin = atob(this.toDataURL(type, quality).split(',')[1]),
                    len = bin.length,
                    len32 = len >> 2,
                    a8 = new Uint8Array(len),
                    a32 = new Uint32Array(a8.buffer, 0, len32);

                for (var i = 0, j = 0; i < len32; i++) {
                    a32[i] = bin.charCodeAt(j++) |
                        bin.charCodeAt(j++) << 8 |
                        bin.charCodeAt(j++) << 16 |
                        bin.charCodeAt(j++) << 24;
                }

                var tailLength = len & 3;

                while (tailLength--) {
                    a8[j] = bin.charCodeAt(j++);
                }

                callback(new Blob([a8], { 'type': type || 'image/png' }));
            }
        }
    );
}