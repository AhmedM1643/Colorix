const popupBtn = document.getElementById("popup-btn");

function showMsg(msg) {
    popupBtn.parentElement.parentElement.style.display = "flex";
    popupBtn.previousElementSibling.textContent = msg
}
popupBtn.addEventListener("click", () => {
    popupBtn.parentElement.parentElement.style.display = "none";
})