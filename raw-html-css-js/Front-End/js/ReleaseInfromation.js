function show_property() {
    var value = document.getElementById("property_input_form").style.display;
    if (value=="none") {
        document.getElementById("property_input_form").style.display="block";
    } else {
        document.getElementById("property_input_form").style.display="none";
    }
}

function show_addlist() {
    var value = document.getElementById("addlist").style.display;
    if (value=="none") {
        document.getElementById("addlist").style.display="";
    } else {
        document.getElementById("addlist").style.display="none";
    }
}