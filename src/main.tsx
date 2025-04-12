import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Root } from "./Root";

const root = document.getElementById("root")!;

createRoot(root).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
