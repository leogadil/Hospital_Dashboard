
$(document).ready( function() {
    $('#patient_birthdate').val(new Date().toISOString().slice(0, 10));

    console.log(window.location.href)
});