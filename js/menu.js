const menuBtn = document.getElementById("menu-btn");
const root = document.getElementById("root");
const main = document.querySelector("main");
const rootGrid = localStorage.getItem("root-grid") || "maximize-nav";
const doc = document.documentElement;

if (localStorage.getItem("root-grid") == "minimize-nav") {
    root.classList.add("min-nav")
} else if ( localStorage.getItem("root-grid") == "maximize-nav") {
    root.classList.add("max-nav")
}

menuBtn.addEventListener("click", () => {
    if (root.classList.contains("min-nav")) {
       // Maximize Nav
       root.classList.remove("min-nav")
       root.classList.add("max-nav")
       console.log("Maximizing Nav")
       localStorage.setItem("root-grid", "maximize-nav");
   } else {
       // Minimize Nav
       root.classList.remove("max-nav")
       root.classList.add("min-nav")
       console.log("Minimizing Nav")
       localStorage.setItem("root-grid", "minimize-nav");
   }
});