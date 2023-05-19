<?php


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';


		$mail = new PHPMailer(true);
        $mail->CharSet = 'UTF-8';
        $mail->IsHTML(true);

        // от кого письмо
        $mail->setFrom('solowayit@gmail.com', 'Artem Solovyov');
        // to
        $mail->addAddress('solovevartem892@gmail.com');
        // Theme
        $mail->Subject = 'eCredits';

        // body of letter
        $body = '<h1>Form data</h1>';

        if (trim(!empty($_POST['name']))){
            $body.='<p><strong>Name:</strong> '.$_POST['name'].'</p>';
        }
        if (trim(!empty($_POST['email']))){
            $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
        }
        if (trim(!empty($_POST['message']))){
            $body.='<p><strong>Message:</strong> '.$_POST['message'].'</p>';
        }
        if (trim(!empty($_POST['token']))){
            $body.='<p><strong>Token:</strong> '.$_POST['token'].'</p>';
        }

        $mail->Body = $body;

        if (!$mail->send()) {
            $message = 'Error';
        } else {
            $message = 'Okay';
        }

        $response = ['message' => $message];

        header('Content-type: application/json');
        echo json_encode($response);

?>