import React from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { routes } from "./routes";
import ErrorBoundary from "./components/ErrorBoundary";
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
        <AppRoutes />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
