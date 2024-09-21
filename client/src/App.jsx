import "./App.css";
import HomePage from "./routes/homePage";
import ListPage from "./routes/listPage";
import LoginPage from "./routes/loginPage";
import SinglePage from "./routes/singlePage";
import ProfilePage from "./routes/profilePage";
import RegisterPage from "./routes/registerPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfileUpdatePage from "./routes/profileUpdatePage";
import NewPostPage from "./routes/newPostPage";
import AboutPage from "./routes/aboutPage";
import ContactPage from "./routes/contactPage";
import AgentsPage from "./routes/agentsPage";
import Layout from "./components/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  singlePageLoader,
  listPageLoader,
  profilePageLoader,
} from "./lib/loaders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Wrap everything inside Layout
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/list",
        element: <ListPage />,
        loader: listPageLoader,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/:id",
        element: <SinglePage />,
        loader: singlePageLoader,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/profile",
        element: <ProtectedRoute element={<ProfilePage />} />,
        loader: profilePageLoader,
      },
      {
        path: "/profile/update",
        element: <ProtectedRoute element={<ProfileUpdatePage />} />,
      },
      {
        path: "/add",
        element: <ProtectedRoute element={<NewPostPage />} />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/agents",
        element: <AgentsPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
