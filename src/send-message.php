<?php

// Set content as json
header('Content-Type: application/json; charset=UTF-8');

// Set email destination
$toEmail = 'info@maxsegale.com';

// Get post variables
$from = $_POST['from'];
$message = $_POST['question'];

// Create assoc array
$jsonArray = [];

// Status return options
$passMsg = "✅ Success. Thank you.";
$failMsg = "❌ Error. Please try again.";
$warnMsg = "⚠️ Please complete the form.";

// Validate message
if (trim($message) !== '') {

  // Compose message
  $subject = "New Question";
  $headers = "From: $from";

  // Send email
  $jsonArray['sent'] = mail($toEmail, $subject, $message, $headers);

  // Check email status
  if ($jsonArray['sent'] == 1) {
    $jsonArray['status'] = $passMsg;
  } else {
    $jsonArray['status'] = $failMsg;
  }
} else {
  $jsonArray['sent'] = 0;
  $jsonArray['status'] = $warnMsg;
}

// Print assoc array as encoded json
echo json_encode($jsonArray);
