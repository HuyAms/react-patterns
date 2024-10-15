import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Composition } from "./components/Composition";
import { LastRef } from "./components/LastRef";
import { CompoundComponent } from "./components/CompoundComponent";
import { PropsCollectionGetters } from "./components/PropsCollectionGetters";
import { StateInitializer } from "./components/StateInitializer";
import { StateReducer } from "./components/StateReducer";
import { ControlProps } from "./components/ControlProps";

function Menu() {
  return (
    <>
    <h1 className="text-3xl mb-6">React Advanced Patterns</h1>
    <ul>
      <li><a href="/composition">Composition</a></li>
      <li><a href="/last-ref">Last Ref</a></li>
      <li><a href="/compound-component">Compound Component</a></li>
      <li><a href="/prop-collections-getters">Props Collection and Getters</a></li>
      <li><a href="/state-initializer">State Initializer</a></li>
      <li><a href="/state-reducer">State Reducer</a></li>
      <li><a href="/control-props">Control Props</a></li>
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
    {
      path: "/prop-collections-getters",
      element: <PropsCollectionGetters/>,
    },
    {
      path: "/state-initializer",
      element: <StateInitializer/>,
    },
    {
      path: "/state-reducer",
      element: <StateReducer/>,
    },
    {
      path: "/control-props",
      element: <ControlProps/>,
    },
  ]);

  return  <div className="p-12">
      <a className="mb-8 inline-block" href="/">Home</a>
      <RouterProvider router={router} />
  </div>
}

export default App
