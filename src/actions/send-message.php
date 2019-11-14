<?php
require_once '../info/portfolio.php';

// set content as json
header('Content-Type: application/json; charset=UTF-8');

// get post variables
$from = $_POST['from'];
$message = $_POST['question'];

// create assoc array
$jsonArray = [];

// status return options
$passMsg = "✅ Success. Thank you.";
$failMsg = "❌ Error. Please try again.";
$warnMsg = "⚠️ Please complete the form.";

// validate message
if (trim($message) !== '') {

    // compose message
    $subject = "New Question";
    $headers = "From: $from";

    // send email
    $jsonArray['sent'] = mail($domainEmail, $subject, $message, $headers);

    // check email status
    if ($jsonArray['sent'] == 1) {
        $jsonArray['status'] = $passMsg;
    } else {
        $jsonArray['status'] = $failMsg;
    }
} else {
    $jsonArray['sent'] = 0;
    $jsonArray['status'] = $warnMsg;
}

// print assoc array as encoded json
echo json_encode($jsonArray);
?>