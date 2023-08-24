const newPaletteBtn = document.getElementById("new-palette");
const palettesContainer = document.getElementById("palettes-container");

const palettes = JSON.parse(localStorage.getItem("palettes")) || [];

const createPalette = (name, id) => {
    const newPalette = document.createElement("button");
    const info = document.createElement("div");
    const paletteIcon = document.createElement("i");
    const paletteName = document.createElement("input");
    const actions = document.createElement("div");
    const editBtn = document.createElement("i");
    const deleteBtn = document.createElement("i");

    newPalette.classList.add("palette"); 
    info.classList.add("info");
    actions.classList.add("actions");
    paletteIcon.classList.add("fa", "fa-palette");
    paletteName.classList.add("palette-name");
    editBtn.classList.add("fa-solid", "fa-pen");
    deleteBtn.classList.add("fa-solid", "fa-trash");

    newPalette.setAttribute("data-palette", id);
    paletteName.value = name;
    paletteName.setAttribute("readonly", "readonly");
    editBtn.setAttribute("title", "Edit");
    deleteBtn.setAttribute("title", "Delete");

    newPalette.appendChild(info);
    newPalette.appendChild(actions);
    info.appendChild(paletteIcon);
    info.appendChild(paletteName);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    editBtn.addEventListener("click", () => {
        if (editBtn.title === "Edit") {
            paletteName.removeAttribute("readonly");
            editBtn.className = "fa fa-save";
            editBtn.title = "Save";
        } else {
            paletteName.setAttribute("readonly", "readonly");
            const newPalettes = palettes.map((obj) => obj.id === id ? {id: id, name: paletteName.value} : obj);
            localStorage.setItem("palettes", JSON.stringify(newPalettes));
            editBtn.className = "fa-solid fa-pen";
            editBtn.title = "Edit";
        }
    })

    deleteBtn.addEventListener("click", () => {
        newPalette.remove();
        palettes.splice(id, 1);
        if (id === currentList.id) {
            currentList.id = 0;
            colorList = JSON.parse(localStorage.getItem("colorlist-0"));
            currentList.content = colorList;
            displayColorsForPalette("0")
            localStorage.setItem("current-colorlist", JSON.stringify(currentList));
        }
        localStorage.removeItem(`colorlist-${id}`)
        localStorage.setItem("palettes", JSON.stringify(palettes));
    })
    // newPalette.innerHTML =                  
    // `<div class="info">
    //     <i class="fa fa-palette"></i>
    //     <p class="palette-name">${palette}</p>
    // </div>
    // <div class="actions">
    //     <i class="fa-solid fa-pen edit"></i>
    //     <i class="fa-solid fa-trash delete"></i>
    // </div>`;

    palettesContainer.appendChild(newPalette);
}

newPaletteBtn.addEventListener("click", () => {
    const palette = {
        name: "New Palette",
        id: palettes.length
    }
    // const currentList = JSON.parse(localStorage.getItem("current-colorlist"));

    document.querySelectorAll(".palette").forEach(_palette => { _palette.getAttribute("data-palette") == currentList.id ? _palette.classList.add("current-palette") : null; })
    palettes.push(palette);
    localStorage.setItem("palettes", JSON.stringify(palettes));
    createPalette(palette.name, palette.id)
    localStorage.setItem(`colorlist-${palette.id}`, JSON.stringify([]));

    const allPalettes = document.querySelectorAll(".palette");

    allPalettes.forEach(palette => {
        // Check the current palette
        palette.getAttribute("data-palette") == currentList.id ? palette.classList.add("current-palette") : null;

        palette.addEventListener("click", () => {
            allPalettes.forEach(palette => {palette.classList.remove("current-palette")})
            palette.classList.add("current-palette")

            const paletteId = palette.getAttribute('data-palette');
            displayColorsForPalette(paletteId)
            console.log(`This palette is for ${paletteId}`);
        })
    })
})

for (let i = 0; i < palettes.length; i++) {
    createPalette(palettes[i].name, palettes[i].id)
}