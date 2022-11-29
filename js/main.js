$(document).ready(function() {
    /* Настройки выбора услуг */
    $(".first, .last").click(function(){ // задаем функцию при нажатиии на элемент с классом slide-toggle
        $(".list").slideToggle(); // плавно скрываем, или отображаем все элементы внутри указанного класса
        $(".first").slideToggle();
        $(".last").slideToggle();
    });

        /* Изменение input при выборе услуги */
    $(".list__first").click(function(){
        $(".list").slideToggle();
        $(".serv__btn").attr('type', 'text').attr('name', 'serv').removeAttr('value').val('Разработка сайта');
        $(".first").slideToggle();
        $(".last").slideToggle();
    });
    $(".list__second").click(function(){
        $(".list").slideToggle();
        $(".serv__btn").attr('type', 'text').attr('name', 'serv').removeAttr('value').val('Чат-бот');
        $(".first").slideToggle();
        $(".last").slideToggle();
    });
    $(".list__last").click(function(){
        $(".list").slideToggle();
        $(".serv__btn").attr('type', 'text').attr('name', 'serv').removeAttr('value').val('Дизайн');
        $(".first").slideToggle();
        $(".last").slideToggle();
    });

    /* Настройки выбора связи */
    $(".call__first, .call__last").click(function(){
        $(".call__list").slideToggle();
        $(".call__first").slideToggle();
        $(".call__last").slideToggle();
    });

        /* Изменение input при выборе услуги */
    $(".call__list_email").click(function(){
        $(".call__list").slideToggle();
        $(".call__btn").attr('type', 'email').attr('name', 'call').attr('placeholder', 'Введите почту').removeAttr('value');
        $(".call__first").slideToggle();
        $(".call__last").slideToggle();
    });
    $(".call__list_tel").click(function(){
        $(".call__list").slideToggle();
        $(".call__btn").attr('type', 'tel').attr('name', 'call').attr('placeholder', 'Введите телефон').removeAttr('value');
        $(".call__first").slideToggle();
        $(".call__last").slideToggle();
    });
    $(".call__list_soc").click(function(){
        $(".call__list").slideToggle();
        $(".call__btn").attr('type', 'text').attr('name', 'call').attr('placeholder', 'Введите мессенджер').removeAttr('value');
        $(".call__first").slideToggle();
        $(".call__last").slideToggle();
    });
    let inputs = document.querySelectorAll('.file__input');
    Array.prototype.forEach.call(inputs, function (input) {
        let label = input.nextElementSibling,
        labelVal = label.querySelector('.file__btn_text').innerText;

        input.addEventListener('change', function (e) {
        let countFiles = '';
        if (this.files && this.files.length >= 1)
            countFiles = this.files.length;

        if (countFiles)
            label.querySelector('.file__btn_text').innerText = 'Прикреплено файлов: ' + countFiles;
        else
            label.querySelector('.file__btn_text').innerText = labelVal;
        });
    });
});