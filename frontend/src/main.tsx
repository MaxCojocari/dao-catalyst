import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages";
import "@rainbow-me/rainbowkit/styles.css";
import "react-quill-new/dist/quill.snow.css";
import { Provider } from "./utils/provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>
);
