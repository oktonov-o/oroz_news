import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import NewsList from "./components/NewsList";
import NewsDetail from "./components/NewsDetail";
import { Container } from '@mui/material';


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
    <Container maxWidth="md">
      <RouterProvider router={router} />
    </Container>
  );
}

export default App;
