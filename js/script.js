const colorsContainer = document.querySelector(".colors");
const createBtn = document.getElementById("create-btn");
const colorInput = document.getElementById("color-input");
const titleInput = document.getElementById("title-input");
const regex = /#([0-9a-fA-F]{6})/g;

const currentList = JSON.parse(localStorage.getItem("current-colorlist")) || {id: 0, current: false, content: []};
let colorList = JSON.parse(localStorage.getItem(`colorlist-${currentList.id}`)) || [];

const updateCurrentList = () => {
    localStorage.setItem("current-colorlist", JSON.stringify(currentList));
}

setTimeout(() => {
    const allPalettes = document.querySelectorAll(".palette");

allPalettes.forEach(palette => {
    // Check the current palette
    palette.getAttribute("data-palette") == currentList.id ? palette.classList.add("current-palette") : null;

    palette.addEventListener("click", () => {
        allPalettes.forEach(palette => {palette.classList.remove("current-palette")})
        palette.classList.add("current-palette")

        const paletteId = palette.getAttribute('data-palette');
        displayColorsForPalette(paletteId)
        console.log(`Switched to palette ${paletteId}`);
    })
})

}, 1)

const displayColorsForPalette = (id) => {
    colorList = JSON.parse(localStorage.getItem(`colorlist-${id}`));
    currentList.content = colorList;
    colorsContainer.innerHTML = "";
    for (let i = 0; i < currentList.content.length; i++) {
        createColor(currentList.content[i].title, currentList.content[i].color, currentList.content[i].id)
    }
    localStorage.setItem(`colorlist-${id}`, JSON.stringify(currentList.content));
    currentList.id = +id;
    updateCurrentList();
};

const createColor = (_title, _color, _id) => {
    const newColor = document.createElement("div")
    const preview = document.createElement("div")
    const editBtn = document.createElement("button")
    const deleteBtn = document.createElement("button")
    const info = document.createElement("div")
    const title = document.createElement("input")
    const color = document.createElement("input")

    title.value = _title;
    color.value = _color;
    editBtn.textContent = "E";
    deleteBtn.textContent = "D";

    preview.style.backgroundColor = _color;
    title.setAttribute("readonly", "readonly");
    color.setAttribute("readonly", "readonly");
    editBtn.setAttribute("title", "Edit");

    newColor.classList.add("color");
    title.classList.add("color-title");
    color.classList.add("color-hex");
    editBtn.classList.add("edit");
    deleteBtn.classList.add("delete");
    preview.classList.add("preview")
    info.classList.add("info")

    preview.appendChild(editBtn);
    preview.appendChild(deleteBtn);
    info.appendChild(title)
    info.appendChild(color)
    newColor.appendChild(preview)
    newColor.appendChild(info)
    colorsContainer.appendChild(newColor);

    editBtn.addEventListener("click", () => {
        if (editBtn.title === "Edit") {
            title.removeAttribute("readonly");
            color.removeAttribute("readonly");
            color.addEventListener("keyup", () => preview.style.backgroundColor = color.value )
            editBtn.textContent = "S";
            editBtn.title = "Save";
        } else {
            title.setAttribute("readonly", "readonly");
            color.setAttribute("readonly", "readonly");
            const newColorList = currentList.content.map((obj) => obj.id === _id ? {id:_id, title: title.value, color: color.value} : obj);
            localStorage.setItem(`colorlist-${currentList.id}`, JSON.stringify(newColorList));
            localStorage.setItem("current-colorlist", JSON.stringify({id: currentList.id, content: newColorList}));
            editBtn.textContent = "E";
            editBtn.title = "Edit";
        }
    })

    deleteBtn.addEventListener("click", () => {
        newColor.remove()
        currentList.content.splice(_id, 1)
        localStorage.setItem(`colorlist-${currentList.id}`, JSON.stringify(currentList.content));
        localStorage.setItem("current-colorlist", JSON.stringify(currentList));
    })
}

const addColorToList = () => {
    // Validations
    if (titleInput.value === "" || colorInput.value === "") { showMsg("Please fill the two fields"); return };
    if (!regex.test(colorInput.value) || colorInput.value.length != 7) { showMsg("We only support 6 digits hex colors, please check your value and try again"); return };

    const newColor = {title: titleInput.value, color: colorInput.value, id: currentList.content.length}
    currentList.content.push(newColor)
    localStorage.setItem(`colorlist-${currentList.id}`, JSON.stringify(currentList.content));
    localStorage.setItem("current-colorlist", JSON.stringify({id: currentList.id, content: colorList}));

    createColor(titleInput.value, colorInput.value, newColor.id)
    colorInput.value = "";
    titleInput.value = "";
}


createBtn.addEventListener("click", () => { addColorToList() })

for (let i = 0; i < currentList.content.length; i++) {
    createColor(currentList.content[i].title, currentList.content[i].color, currentList.content[i].id);
}

updateCurrentList();