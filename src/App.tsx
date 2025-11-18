import React from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { routes } from "./routes";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import "./styles/tailwind.css";
import "./styles/common.scss";

const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
