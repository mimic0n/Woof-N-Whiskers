import { createRoot } from "react-dom/client";
import FloatingDockDemo from "./floating-dock-demo";
const root = document.getElementById("floating-dock-root");
if (root) {
  createRoot(root).render(<FloatingDockDemo />);
  document.documentElement.classList.add("dock-ready");
}

