$(document).ready( function($) {
    var value = sessionStorage.getItem('userid')

    $.get(`/api/getpatients/${value}`, {bypass: true}, function(res) {
        if(res.status) {
            if(res.data.length != 0) {
                $.each(res.data, function(i, item) {
                    $('#patient_list').append($('<li>', {}).append($('<patient>', {
                        class: (i == 0) ? "patient active" : "patient",
                        id: `${item.patient_id}`
                    }).append($('<span>', {
                        text: `${item.lastname}, ${item.firstname} ${item.middleinitial}.`
                    }))))
    
                    if(i == 0) {
                        $('#viewer').attr('src', `patient/${item.patient_id}`)
                    }
                })
            } else {
                $('#patient_list').append($('<li>', {}).append($('<patient>', {
                    class: "patient",
                    id: `0`
                }).append($('<span>', {
                    text: `No Patient`
                }))))
                
                $('#viewer').attr('src', `patient/0`)
            }

            $('patient,path').click(function (event) {
                var pid = $(this).attr('id');
                $('#viewer').attr('src', `patient/${pid}`)
                $('patient').each(function(i) {
                    if($(this).attr('id') == pid) {
                        $(this).attr('class', 'patient active')
                    } else {
                        $(this).attr('class', 'patient')
                    }
                   
                })
            });
        }
    });
})

