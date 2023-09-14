<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $receiving_email_address = 'seuriin@gmail.com';

    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-type: text/html\r\n";

    $mail_body = "Name: $name<br>";
    $mail_body .= "Email: $email<br>";
    $mail_body .= "Message: $message";

    $mail_success = mail($receiving_email_address, $subject, $mail_body, $headers);

    if ($mail_success) {
        echo "Your message has been sent. Thank you!";
    } else {
        echo "An error occurred while sending the message.";
    }
}
?>

