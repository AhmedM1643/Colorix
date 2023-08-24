const menuBtn = document.getElementById("menu-btn");
const root = document.getElementById("root");
const main = document.querySelector("main");
const rootGrid = localStorage.getItem("root-grid") || "maximize-nav";
const doc = document.documentElement;
const modeBtn = document.getElementById("mode-btn");
const logo = document.querySelector(".logo");

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

const setMode = (mode) => {
    let otherMode = mode === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", mode.toLowerCase());
    modeBtn.setAttribute("title", mode === "dark" ? "Light" : "Dark" );
    modeBtn.innerHTML = `<i class="fa-solid fa-${mode === "dark" ? "moon" : "sun"}"></i>`;
    logo.setAttribute("src", `imgs/${otherMode}logo.png`)
}

if (localStorage.getItem("mode") === "dark") {
    setMode("dark");
} else {
    setMode("light");
}

modeBtn.addEventListener("click", () => {
    if (modeBtn.title === "Dark") {
        setMode("dark")
        localStorage.setItem("mode", "dark");
    } else if (modeBtn.title === "Light") {
        setMode("light")
        localStorage.setItem("mode", "light");
    };
});