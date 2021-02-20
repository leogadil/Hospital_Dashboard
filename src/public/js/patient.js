
$(document).ready( function($) {
    $('.datetoday').val(new Date().toISOString().slice(0, 10));

    var id = window.location.pathname.split( '/' )[2];

    $.get(`api/patient/${id}`, {}, function(res) {
        console.log(res)
        $('#patient_ID').val(res.patient_id).prop("disabled", true)
        $('#patient_first').val(res.firstname).prop("disabled", true)
        $('#patient_last').val(res.lastname).prop("disabled", true)
        $('#patient_mi').val(res.middleinitial).prop("disabled", true)
        $('#patient_birthdate').val(formatDate(new Date(res.birthdate))).prop("disabled", true)
        $('#patient_gender').val(res.gender).prop("disabled", true)
        $('#patient_status').val(res.status).prop("disabled", true)
        $('#patient_address').val(res.address).prop("disabled", true)
        $('#patient_tel').val(res.tel_number).prop("disabled", true)
        $('#patient_email').val(res.email).prop("disabled", true)

        $('.record_box').html("")
        var records = JSON.parse(res.history_record)

        console.log(res.history_record)
        console.log(records)

        // $.each(records, function(i, item) {
        //     $('.record_box')
        //     .append($('<div>', {
        //         class: 'record'
        //     }).append($('<div>', {
        //         class: 'record_info'
        //     }).append($('<div>', {
        //         class: 'header',
        //     }).append($('<span>', {
        //         class: 'title',
        //         text: item.title
        //     }).append($('<span>', {
        //         class: 'date',
        //         text: `(${item.date})`
        //     }))).append($('<p>', {
        //         class: 'description',
        //         text: item.description
        //     })))).append($('<div>', {
        //         class: 'filerecordcontainer'
        //     }).append($('<hr>'))
        //     .append($('<span>', {
        //         text: 'Files: '
        //     })).append($('<div>', {
        //         class: 'file_box'
        //     }).append($('<div>', {
        //         text: 'No Files'
        //     }))))) /// here will the files go
        // })
    })

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [year, month, day].join('-');
    }

    $('polygon, path').click(function(event) {
        // if($(this).attr('class') == "gold") {
        //     $(this).attr('class', '');
        // } else {
        //     $(this).attr('class', 'gold');
        // }

        if($(this).attr('class') == null) {
            $(this).attr('class', 'gold');
        } else if($(this).attr('class') == 'gold') {
            $(this).attr('class', 'green');
        } else if($(this).attr('class') == 'green') {
            $(this).attr('class', 'blue');
        } else if($(this).attr('class') == 'blue') {
            $(this).attr('class', null);
        }
    })

    
});