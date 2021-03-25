<?php

	if ($_SERVER['REQUEST_METHOD'] == 'POST') {

		$complete_message = '';
		$error = '';

		if(isset($_POST['name']) && (isset($_POST['tel']) || isset($_POST['email']))){

			$complete_message = 'Ваша заявка отправлена';
			
			$msg = '<html><body>';
			$msg .= '<h4>Новая заявка</h4><hr>';
			$msg .= '<table>';
			$msg .= '<tr><td><b>Имя:</b></td><td>'.$_POST['name'].'</td></tr>';

			if(isset($_POST['tel'])) $msg .= '<tr><td><b>Телефон:</b></td><td>'.$_POST['tel'].'</td></tr>';

			if(isset($_POST['email'])) $msg .= '<tr><td><b>E-mail:</b></td><td>'.$_POST['email'].'</td></tr>';

			if(isset($_POST['question'])){
				$msg .= '<tr><td><b>Вопрос:</b></td><td>'.$_POST['question'].'</td></tr>';
				$complete_message = 'Ваш вопрос отправлен';
			}

			$msg .= '</table><hr></body></html>';

			$to = 'l.pogodin2012@yandex.ru,info@perfomance-group.ru';

			$subject = 'Заявка с сайта perfomance-group.ru';

			$headers = "From: info@perfomance-group.ru\r\n";
			$headers .= "Reply-To: info@perfomance-group.ru\r\n";
			$headers .= "MIME-Version: 1.0\r\n";
			$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
			
			$sentMail = mail($to, $subject, $msg, $headers);
			if(!$sentMail) $error='Сообщение не отправлено, обновите страницу и попробуйте еще раз';

			if ($error != '') $result = array('type' => 'error', 'text' => $error);
			else $result = array('type' => 'complete', 'text' => $complete_message);
	
			echo json_encode($result); 
		}

	}

?>
