String.prototype.format = function() {
    var pattern = /\{\d+\}/g;
    var args = arguments;
    return this.replace(pattern, function(capture){ return args[capture.match(/\d+/)]; });
};
$(function() {
    if ($(location).attr('href').indexOf('retrieveCheckinDoc.html') != -1) {
        var current_time = new Date();
        var dialog = $('<div/>')
            .css({
                'background': '#fff',
                'border': '1px solid #ccc',
                'position': 'fixed',
                'right': '10px',
                'top': '10px',
                'width': '300px'
            })
            .append(
                $('<div/>')
                    .text('Current time:'),
                $('<div/>')
                    .attr({
                        'id': 'current_time'
                    })
                    .text(new Date()),
                $('<div/>')
                    .text('Check in time:'),
                $('<input/>')
                    .attr({
                        'autocomplete': 'off',
                        'id': 'ext_check_in_time',
                        'placeholder': 'Checkin time',
                        'type': 'text'
                    })
                    //.val('November 18, 2012 17:38:01')
                    .val(
                        '{0} {1}, {2} {3}:{4}:00'.format(
                            current_time.getMonth() + 1,
                            current_time.getDate(),
                            current_time.getFullYear(),
                            current_time.getHours(),
                            current_time.getMinutes()
                        )
                    )
                    .css({
                        'margin': '10px'
                    }),
                $('<div/>')
                    .attr({
                        'id': 'ext_submit'
                    })
                    .text('submit')
                    .css({
                        'cursor': 'pointer',
                        'margin': '10px'
                    }),
                $('<div/>')
                    .attr({
                        'id': 'ext_cancel'
                    })
                    .text('cancel')
                    .css({
                        'cursor': 'pointer',
                        'margin': '10px'
                    })
            );

        $('body').append(dialog);

        dialog.on('click', '#ext_submit', function() {

            /*$('#confirmationNumber').val('GV6Z28');
            $('#firstName').val('Yevgeniy');
            $('#lastName').val('Kogan');*/

            var check_in_time = new Date($('#ext_check_in_time').val());

            var time_check = setInterval(function() {

                var now_time = new Date;

                $('#current_time', dialog).text(now_time);

                if (check_in_time < now_time) {
                    $('#submitButton').click();
                    clearInterval(time_check);
                } 
            }, 5000);

            dialog
                .find('#ext_submit')
                    .replaceWith(
                        $('<div>OK!</div>')
                    )
                    .end()
                .find('#ext_check_in_time')
                    .replaceWith(
                        $('<div/>')
                            .text(check_in_time)
                    );
                    

        });
        dialog.on('click', '#ext_cancel', function() {
            dialog.remove();
        });
    } else if ($(location).attr('href').indexOf('selectPrintDocument.html') != -1) {
        $('#printDocumentsButton').click();
    }
});

