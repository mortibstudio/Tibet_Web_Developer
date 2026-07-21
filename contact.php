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
$message = $input['message'] ?? '';

if (empty($brand) || empty($message)) {
    http_response_code(400);
    echo json_encode(["message" => "Lütfen gerekli alanları doldurun."]);
    exit;
}

$to = 'mortibstudio@gmail.com';
$subject = "Yeni Proje Talebi: " . $brand;
$body = "Marka/Ad: " . $brand . "\nİhtiyaç: " . $need . "\nMesaj: " . $message;
$headers = "From: no-reply@" . $_SERVER['SERVER_NAME'] . "\r\n" .
           "Reply-To: no-reply@" . $_SERVER['SERVER_NAME'] . "\r\n" .
           "X-Mailer: PHP/" . phpversion();

if (mail($to, $subject, $body, $headers)) {
    http_response_code(200);
    echo json_encode(["message" => "Mesajınız başarıyla iletildi."]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Sunucu hatası. Lütfen daha sonra tekrar deneyin."]);
}
?>
