import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Composition } from "./components/Composition";
import { LastRef } from "./components/LastRef";

function Menu() {
  return (
    <>
    <h1 className="text-3xl mb-6">React Advanced Patterns</h1>
    <ul>
      <li><a href="/composition">Composition</a></li>
      <li><a href="/last-ref">Last Ref</a></li>
    </ul>
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
    {
      path: "/last-ref",
      element: <LastRef/>,
    },
  ]);

  return  <div className="p-12">
      <a className="mb-8 inline-block" href="/">Home</a>
      <RouterProvider router={router} />
  </div>
}

export default App
