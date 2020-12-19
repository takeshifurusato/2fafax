$(function () {
    $('#btnVerificationSend').click(function () {

        const url = './verification';
        const data = {'fax_number': $("input[name='fax_number']").val()};

        $.post(url, data, null, 'html')
            .done(function(data, textStatus){
                res = JSON.parse(data);
                if(res.result){
                    $("input[name='fax_number']").prop("disabled", true);
                    $('#btnVerificationSend').hide();
                    $("input[name='auth_code']").parent().removeClass('d-none');
                    $('#btnVerificationCheckSend').removeClass('d-none');
                    alert('送信しました。');
                }else{
                    alert(data.message);
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.status + "\n" + textStatus + "\n" + errorThrown);
            });
        return false;
    });

    $('#btnVerificationCheckSend').click(function () {

        const url = './check_verification';
        const data = {
            'fax_number': $("input[name='fax_number']").val(),
            'auth_code': $("input[name='auth_code']").val(),
        };

        $.post(url, data, null, 'html')
            .done(function (data, textStatus) {
                res = JSON.parse(data);
                $('#result').removeClass('alert-success')
                    .removeClass('alert-danger');
                if(res.result){
                    $("#result").text("認証できました。")
                        .addClass('alert-success')
                        .removeClass('d-none');
                }else{
                    $("#result").text("認証に失敗しました。")
                        .addClass('alert-danger')
                        .removeClass('d-none');
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.status + "\n" + textStatus + "\n" + errorThrown);
            });
        return false;
    });
});

