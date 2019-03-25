<?php
require_once '../info/portfolio.php';
require_once '../common/functions.php';

header('Content-Type: application/json; charset=UTF-8');

$from = $_POST['from'];
$message = $_POST['question'];

$subject = "New Question";
$headers = "From: $from";

$jsonArray = [
    'sent' => '',
    'status' => ''
];

$jsonArray['sent'] = mail($domainEmail, $subject, $message, $headers);


if ($jsonArray['sent'] == 1) {
    $jsonArray['status'] = "✅ Success. Thank you.";
} else {
    $jsonArray['status'] = "⚠️ Error. Please try again.";
}

echo json_encode($jsonArray);
?>