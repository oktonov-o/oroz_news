import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import NewsList from "./components/NewsList";
import NewsDetail from "./components/NewsDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NewsList />,
  },{
    path: "news/:id",
    element: <NewsDetail />
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
