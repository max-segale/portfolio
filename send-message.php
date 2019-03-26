<?php
require_once '../info/portfolio.php';
// set content as json
header('Content-Type: application/json; charset=UTF-8');
// get post variables
$from = $_POST['from'];
$message = $_POST['question'];
// compose message
$subject = "New Question";
$headers = "From: $from";
// create assoc array
$jsonArray = [];
// send email
$jsonArray['sent'] = mail($domainEmail, $subject, $message, $headers);
// check email status
if ($jsonArray['sent'] == 1) {
    $jsonArray['status'] = "✅ Success. Thank you.";
} else {
    $jsonArray['status'] = "⚠️ Error. Please try again.";
}
// print assoc array as encoded json
echo json_encode($jsonArray);
?>