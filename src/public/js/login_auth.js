
$(document).ready( function() {

    $('#login').submit(function(event) {
        event.preventDefault(); // Stops browser from navigating away from page
        var data = $(this).serializeArray();
        // build a json object or do something with the form, store in data
        $.post('/access/login', data, function(res) {
            if(res.status) {
                sessionStorage.setItem('userid', res.userid)
                window.location.href = res.redirect;
            } else {
                console.log(res.error)
            }
        });
    });
    
})