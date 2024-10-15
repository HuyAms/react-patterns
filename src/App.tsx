import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Composition } from "./components/Composition";

function Menu() {
  return (
    <>
    <h1>React Advanced Patterns</h1>
    <li>
      <a href="/composition">Composition</a>
    </li>
    </>
  )
}

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Menu/>,
    },
    {
      path: "/composition",
      element: <Composition/>,
    },
  ]);

  return  <div className="p-12">
    <RouterProvider router={router} />
  </div>
}

export default App
