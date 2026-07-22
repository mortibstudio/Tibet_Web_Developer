<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["message" => "Method Not Allowed"]);
    exit;
}

// Read JSON input
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

$brand = $input['brand'] ?? '';
$need = $input['need'] ?? '';
$email = $input['email'] ?? '';
$phone = $input['phone'] ?? '';
$message = $input['message'] ?? '';

if (empty($brand) || empty($email) || empty($phone) || empty($message)) {
    http_response_code(400);
    echo json_encode(["message" => "Lütfen gerekli alanları doldurun."]);
    exit;
}

$host = $_SERVER['SERVER_NAME'];
if (substr($host, 0, 4) === 'www.') {
    $host = substr($host, 4);
}
$from_email = "no-reply@" . $host;

$to = 'mortibstudio@gmail.com';
$subject = "Yeni Proje Talebi: " . $brand;

// Support Turkish characters in email subject
$subject = "=?UTF-8?B?" . base64_encode($subject) . "?=";

$body = "Marka/Ad: " . $brand . "\nE-posta: " . $email . "\nTelefon: " . $phone . "\nİhtiyaç: " . $need . "\nMesaj: " . $message;

$headers = "From: " . $from_email . "\r\n" .
           "Reply-To: " . $email . "\r\n" .
           "MIME-Version: 1.0\r\n" .
           "Content-Type: text/plain; charset=UTF-8\r\n" .
           "X-Mailer: PHP/" . phpversion();

if (mail($to, $subject, $body, $headers)) {
    http_response_code(200);
    echo json_encode(["message" => "Mesajınız başarıyla iletildi."]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Sunucu hatası. Lütfen daha sonra tekrar deneyin."]);
}
?>
