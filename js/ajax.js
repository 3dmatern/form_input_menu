$(function() {
    document.getElementById('form').addEventListener('submit', function(e){
        let http = new XMLHttpRequest(), f = this;
        let text = 'Прикрепить файл'; //получаем текст
        e.preventDefault(); //запрещает отправку формы в браузере
        http.open("POST", "php/api_alt.php", true);
        http.onreadystatechange = function() {
            if (http.readyState == 4 && http.status == 200) {
                //console.log(http.responseText);
                $("#result_form").html(http.responseText);
                if (http.responseText == "Ваша заявка отправлена, мы скоро с Вами свяжемся :)") {
                    $('form').find('input[type=text], textarea').val(''); //очищает input полсе отправки
                    //возвращаем форму в исходное состояние
                    $(".serv__btn").attr('type', 'button').attr('value', 'Выберите услугу...').removeAttr('name', 'serv');
                    $(".call__btn").attr('type', 'button').attr('value', 'Выберете способ связи...').removeAttr('placeholder').removeAttr('name');
                    $(".file__btn_text").text(text);
                }
            }
        }
        http.onerror = function() {
            $("#result_form").html('Ошибка, попробуйте еще раз ;)');
        }
        http.send(new FormData(f));
    }, false);
});