import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Contact from "../pages/Contact.jsx";
import Fixtures from "../pages/Fixtures.jsx";
import Types from "../pages/Types.jsx";
import Products from "../pages/Products.jsx";
import Product from "../pages/Product.jsx";
import Error from "../pages/Error.jsx";
import About from "../pages/About.jsx";
import Container from "../components/Container.jsx";
import Admin from "../pages/Admin.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import CreatePage from "../pages/CreatePage.jsx";
import Basket from "../pages/Basket.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Container />,
    children: [
      {
        index:true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "furnitures",
        element: <Fixtures />,
        // children: [
        //   {
        //     path: ":fixture",
        //     element: <Types />,
        //     children: [
        //       {
        //         path: ":type",
        //         element: <Products />,
        //         errorElement: <Error />,
        //       },
        //     ],
        //     errorElement: <Error />,
        //   },
        // ],
      },
      {
        path:"furnitures/:fixture",
        element:<Types />,
      },
      {
        path:"furnitures/:fixtures/:type",
        element:<Products />,
      },
      {
        path: "product/:id",
        element: <Product />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path:"login",
        element: <Login/>
      },
      {
        path:"register",
        element: <Register/>
      },
      {
        path:"create",
        element:<CreatePage/>
      },
      {
        path:"basket",
        element:<Basket/>
      }
    ],
    errorElement: <Error />,
  },
]);

export default router;
