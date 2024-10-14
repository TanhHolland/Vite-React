// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { store } from "./app/store";
import { Provider } from "react-redux";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";

function Main() {
  return (
    // <StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </Provider>
    // </StrictMode>
  );
}
createRoot(document.getElementById("root")!).render(<Main />);
