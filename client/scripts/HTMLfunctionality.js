function dropDownToggle() {
    document.getElementById("ChatroomNames").classList.toggle("show");
}

window.onclick = function (event) {
    var dropdowns = document.getElementByClassName("dropDown-Content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
    }
}