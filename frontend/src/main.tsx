import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages";
import "@rainbow-me/rainbowkit/styles.css";
import { Provider } from "./utils/provider";

createRoot(document.getElementById("root")!).render(
  <Provider>
    <App />
  </Provider>
);
