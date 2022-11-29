<?php
    // подключаем PHPMailer

    use PHPMailer\PHPMailer\PHPMailer;
    //use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/Exception.php';
    require 'phpmailer/PHPMailer.php';
    //require 'php/phpmailer/SMTP.php';
    
    //создаём объект PHPMailer
    $mail = new PHPMailer(true);
    try{
        //готовые решения
        $mail -> CharSet = 'utf-8'; //кодировка
        $mail -> setFrom('me@belarus.by', 'Belarus'); //от кого письмо
        $mail -> addAddress('your@gmail.com', 'Получатель'); //кому отправляем письмо
        $mail -> addReplyTo('me@belarus.by', 'Belarus'); //кому будет отправлен ответ, если пользователь захочет ответить на сообщение
        
        //если файл был загружен, то добавляем его в письмо
        $filesize = 0;
        if(is_uploaded_file($_FILES['userfile']['tmp_name'])) {
            $mail -> addAttachment($_FILES['userfile']['tmp_name']);
            $filesize = $_FILES['userfile']['size']; //узнаем размер файла
        }
        $mail -> isHTML(true); //указываем, что письмо отправляется в HTML формате
        
        //Стандартные праметры отправки
        $mail -> Subject = 'Заявка с сайта'.$_SERVER['HTTP_REFERER']; //Тема письма

        //Проверяем передаются ли значения и заносим их в переменные, если значения пустые, то удаляем переменные
        if(isset($_POST['name']) && isset($_POST['serv']) && isset($_POST['call']) && isset($_POST['mess'])) {
            $name = $_POST['name'];
            if($name == '') unset($name);
            $serv = $_POST['serv'];
            if($serv == '') unset($serv);
            $call = $_POST['call'];
            if($call == '') unset($call);
            $mess = $_POST['mess'];
            if($mess == '') unset($mess);
        }
        //если какая-либо переменная отсутствует, то выдаем ошибку и останавливаем скрипт
        if(empty($name) or empty($serv) or empty($call) or empty($mess)) exit ('Вы ввели не всю информацию!');
        /*если все данные введены, то обрабатываем их, чтобы теги htmlspecialchars() 
        и скрипты stripslashes() не работали, мало ли что люди могут ввести
        trim() убираем лишние пробелы*/
        $name = trim(htmlspecialchars(stripslashes($_POST['name'])));
        $serv = trim(htmlspecialchars(stripslashes($_POST['serv'])));
        $call = trim(htmlspecialchars(stripslashes($_POST['call'])));
        $mess = trim(htmlspecialchars(stripslashes($_POST['mess'])));
        //Тело письма
        $mail -> Body = "Имя клиента: ".$name."\nВид услуги: ".$serv."\nСпособ связи: ".$call."\nКраткое описание: ".$mess;
        if ($filesize > 10000000) { // проверка на общий размер всех файлов. Многие почтовые сервисы не принимают вложения больше 10 МБ
            exit ("Извините, письмо не отправлено.<br>Размер всех файлов превышает <b>10 МБ</b> :(");
        } else {
            //echo '<b>'.$_POST['name'].'</b>, Ваша заявка отправлена, мы скоро с Вами свяжемся :)';
            echo 'Ваша заявка отправлена, мы скоро с Вами свяжемся :)';
        }
        //далее вызываем метод send()
        $mail -> send();
    }catch(Exception $e){
            echo "Письмо не отправлено. Mailer Error: {$mail -> ErrorInfo}";
    }
?>