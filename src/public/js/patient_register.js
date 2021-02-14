
$(document).ready( function() {
    $('.datetoday').val(new Date().toISOString().slice(0, 10));

    $.get('/api/getall/doctors', {bypass: true}, function(res) {
        if(res.status) {
            $.each(res.data, function(i, item) {
                $('#doctorlist').append($('<option>', {
                    value: item.doc_id,
                    text: item.fullname
                }))
            })
        }
    });

    $('#addpatient').on('click', () => {
        var data;

        data = {
            firstname: $('#patient_firstname').val(),
            lastname: $('#patient_lastname').val(),
            middleinitial: $('#patient_middleinitial').val(),
            birthdate: $('#patient_birthdate').val(),
            gender: $('#patient_gender').val(),
            status: $('#patient_status').val(),
            address: $('#patient_address').val(),
            tel_number: $('#patient_tel_number').val(),
            email: $('#patient_email').val(),
            assigned_doc: $('#doctorlist ').val(),
        }

        console.log(data)

        $.post('/patient/register', data, function(res) {
            if(res.status) {
                window.location.href = res.redirect;
            } else {
                console.log(res.error)
            }
        })
    })
});