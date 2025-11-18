import { RouteObject } from "react-router-dom";
import Layout from "../components/Layout";
import AdminLayout from "../components/AdminLayout";
import { ListProducts, ProductDetail } from "../pages/Products";
import { ProductList, ProductEdit, CategoryList } from "../pages/Admin";
import Page1 from "../pages/Page1";
import Page2 from "../pages/Page2";
import Home from "../pages/Home";
import CategoryDetail from "../pages/Category/CategoryDetail";
import { NotFound, ServerError, Forbidden } from "../pages/Error";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      // Main routes
      {
        path: "san-pham",
        element: <ListProducts />,
      },
      {
        path: "san-pham/:slug",
        element: <ProductDetail />,
      },
      {
        path: "danh-muc",
        element: <ListProducts />,
      },
      {
        path: "danh-muc/:slug",
        element: <CategoryDetail />,
      },
      // Other pages
      {
        path: "thoi-trang",
        element: <Page1 />,
      },
      {
        path: "ve-chung-toi",
        element: <Page2 />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "products",
        element: <ProductList />,
      },
      {
        path: "edit/:id",
        element: <ProductEdit />,
      },
      {
        path: "categories",
        element: <CategoryList />,
      },
    ],
  },
  // Error pages
  {
    path: "/403",
    element: <Forbidden />,
  },
  {
    path: "/500",
    element: <ServerError />,
  },
  // 404 - Catch all route (must be last)
  {
    path: "*",
    element: <NotFound />,
  },
];

