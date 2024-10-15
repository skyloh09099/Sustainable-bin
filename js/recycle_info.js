// Get all elements with the class 'collapsible'
var coll = document.getElementsByClassName("collapsible");

for (var i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        // Toggle active class to change button appearance and symbol
        this.classList.toggle("active");

        // Toggle the display property of the content
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}
