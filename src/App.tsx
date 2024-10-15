import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Composition } from "./components/Composition";
import { LastRef } from "./components/LastRef";
import { CompoundComponent } from "./components/CompoundComponent";

function Menu() {
  return (
    <>
    <h1 className="text-3xl mb-6">React Advanced Patterns</h1>
    <ul>
      <li><a href="/composition">Composition</a></li>
      <li><a href="/last-ref">Last Ref</a></li>
      <li><a href="/compound-component">Compound Component</a></li>
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
    {
      path: "/compound-component",
      element: <CompoundComponent/>,
    },
  ]);

  return  <div className="p-12">
      <a className="mb-8 inline-block" href="/">Home</a>
      <RouterProvider router={router} />
  </div>
}

export default App
