const colorsContainer = document.querySelector(".colors");
const createBtn = document.getElementById("create-btn");
const colorInput = document.getElementById("color-input");
const titleInput = document.getElementById("title-input");
const regex = /#([0-9a-fA-F]{6})/g;

const colorsList = localStorage.getItem("colors") ? JSON.parse(localStorage.getItem("colors")) : [];

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
            const newColorList = colorsList.map((obj) => obj.id === _id ? {id:_id, title: title.value, color: color.value} : obj);
            localStorage.setItem("colors", JSON.stringify(newColorList));
            editBtn.textContent = "E";
            editBtn.title = "Edit";
        }
    })
    deleteBtn.addEventListener("click", () => {
        console.log(colorsList)
        newColor.remove()
        colorsList.splice(_id, 1)
        localStorage.setItem("colors", JSON.stringify(colorsList));
    })
}
const addColor = () => {
    if (titleInput.value === "" || colorInput.value === "") { showMsg("Please fill the two fields"); return };
    if (!regex.test(colorInput.value) || colorInput.value.length != 7) { showMsg("We only support 6 digits hex colors, please check your value and try again"); return };
    const newColor = {title: titleInput.value, color: colorInput.value, id: colorsList.length}
    colorsList.push(newColor)
    localStorage.setItem("colors", JSON.stringify(colorsList))
    createColor(titleInput.value, colorInput.value, newColor.id)
    colorInput.value = "";
    titleInput.value = "";
}

for (let i = 0; i < colorsList.length; i++) {
    createColor(colorsList[i].title, colorsList[i].color, colorsList[i].id)
}

createBtn.addEventListener("click", () => { addColor() })

const popupBtn = document.getElementById("popup-btn");

function showMsg(msg) {
    popupBtn.parentElement.parentElement.style.display = "flex";
    popupBtn.previousElementSibling.textContent = msg
}
popupBtn.addEventListener("click", () => {
    popupBtn.parentElement.parentElement.style.display = "none";
})