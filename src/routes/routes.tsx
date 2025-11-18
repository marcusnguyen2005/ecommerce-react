import { RouteObject } from "react-router-dom";
import Layout from "../components/Layout";
import { ListProducts, ProductDetail } from "../pages/Products";
import { ProductList, ProductEdit } from "../pages/Admin";
import Page1 from "../pages/Page1";
import Page2 from "../pages/Page2";
import Home from "../pages/Home";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ListProducts />,
      },
      {
        path: "trang1",
        element: <Page1 />,
      },
      {
        path: "trang2",
        element: <Page2 />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "sanpham/:id",
        element: <ProductDetail />,
      },
      {
        path: "admin/products",
        element: <ProductList />,
      },
      {
        path: "admin/edit/:id",
        element: <ProductEdit />,
      },
    ],
  },
];

