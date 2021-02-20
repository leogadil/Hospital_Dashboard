
var global_record = [];
var tooth_diagram = new Object();

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
            history: global_record
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

    $('polygon, path').click(function(event) {
        if($(this).attr('class') == null) {
            $(this).attr('class', 'gold');
            tooth_diagram[$(this).attr('id')] = "gold";
        } else if($(this).attr('class') == 'gold') {
            $(this).attr('class', 'green');
            tooth_diagram[$(this).attr('id')] = "green";
        } else if($(this).attr('class') == 'green') {
            $(this).attr('class', 'blue');
            tooth_diagram[$(this).attr('id')] = "blue";
        } else if($(this).attr('class') == 'blue') {
            $(this).attr('class', null);
            delete tooth_diagram[$(this).attr('id')]
        }

        console.log(tooth_diagram)
    })

    $("#file_add").on('change',function() {
        console.log($(this).val())
    })
});

function save() {
    var _date = $('#history_date').val()
    var _title = $('#history_title').val()
    var _desc = $('#history_description').val()

    if(_title == "" || _desc == "" || Object.keys(tooth_diagram).length === 0) return console.log('Empty Title, Description, or diagram is empty')

    global_record.push({
        date: _date,
        title: _title,
        description: _desc,
        diagram: tooth_diagram,
        files: ""
    })

    console.log({
        date: _date,
        title: _title,
        description: _desc,
        diagram: tooth_diagram,
        files: ""
    })

    $('.record_box').html("")

    $.each(global_record, function(i, item) {
        $('.record_box')
        .append($('<div>', {
            class: 'record'
        }).append($('<div>', {
            class: 'record_info'
        }).append($('<div>', {
            class: 'header',
        }).append($('<span>', {
            class: 'title',
            text: item.title
        }).append($('<span>', {
            class: 'date',
            text: `(${item.date})`
        }))).append($('<p>', {
            class: 'description',
            text: item.description
        })))).append($('<div>', {
            class: 'filerecordcontainer'
        }).append($('<hr>'))
        .append($('<span>', {
            text: 'Files: '
        })).append($('<div>', {
            class: 'file_box'
        }).append($('<div>', {
            text: 'No Files'
        }))))) /// here will the files go
    })
    

    $('.record_box')
    .append($('<div>', {
        class: 'record'
    }).append($('<div>', {
        class: 'record_info'
    }).append($('<div>', {
        class: 'header'
    }).append($('<span>', {
        text: 'Info:'
    })).append($('<div>', {
        class: 'history_container'
    }).append($('<label>', {
        for: 'history_date',
        text: 'Date: '
    })).append($('<span>')
    .append($('<input>', {
        type: 'date',
        name: 'history_date',
        class: 'datetoday',
        id: 'history_date'
    })))).append($('<div>', {
        class: 'history_container'
    }).append($('<label>', {
        for: 'history_title',
        text: 'Title: '
    })).append($('<span>')
    .append($('<input>', {
        type: 'text',
        name: 'history_title',
        id: 'history_title'
    })))).append($('<div>', {
        class: 'history_container'
    }).append($('<label>', {
        for: 'history_description',
        text: 'Description: '
    })).append($('<span>').append($('<textarea>', {
        name: 'history_description',
        id: 'history_description',
        cols: 30,
        rows: '5'
    })))))).append($('<div>', {
        class: 'filerecordcontainer'
    }).append($('<hr>'))
    .append($('<span>', {
        text: 'Files: ',
    })).append($('<div>', {
        class: 'file_box'
    }).append($('<div>', {
        class: 'file'
    }).append($('<input>', {
        type: 'file',
        name: 'file_add',
        multiple: true,
        disabled: true
    }))))).append($('<div>', {
        class: 'buttondiv'
    }).append($('<div>', {
        class: 'buttons'
    }).append('<button class="savebutton" onclick="save()" id="savebutton">Save</button> <button class="cancelbutton">Cancel</button>'))))

    $('.datetoday').val(new Date().toISOString().slice(0, 10));
}