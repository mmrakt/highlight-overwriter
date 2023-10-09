import hljs from "highlight.js";

const cssLink = document.createElement("link");
cssLink.type = "text/css";
cssLink.rel = "stylesheet";
cssLink.setAttribute(
  "href",
  "http://localhost:5173/styles/tokyo-night-dark.css"
);
// https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/default.min.css
document.getElementsByTagName("meta")[0].appendChild(cssLink);
hljs.highlightAll();
