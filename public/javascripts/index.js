$(document).ready(function(){

    $('#file').click(function(){
        $('#csv').click();
    });

    $('#csv').change(function(e){
        $('#submit').click();
    })

    $('#fisher').click(function(){
        $.get('/loadFisher', function(data){
            var table = $('<table>').addClass('table table-condensed table-bordered').attr('id', 'data');
            $.each(data, function(i, val){
                var row = $('<tr>');
                $.each(val, function(j, item){
                    var td = $('<td>').text(item).addClass('text-center');
                    row.append(td);
                });
                table.append(row);
            });
            $('#data').replaceWith(table);
        })
    });

    $('#number').click(function(){
        alert('Not yet implemented');
    })
});