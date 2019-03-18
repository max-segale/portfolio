<?php
require_once '../info/portfolio.php';
require_once '../common/functions.php';
header('Content-Type: text/plain; charset=UTF-8');
$from = $_REQUEST['from'];
$message = $_REQUEST['message'];
$subject = "New Question";
$headers = [From => $from];
echo mail($domainEmail, $subject, $message, $headers);
?>