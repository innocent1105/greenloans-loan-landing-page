<?php
header('Content-Type: application/json');
require_once 'connection.php';

$input = json_decode(file_get_contents("php://input"), true);


if (!isset($input['user_token'])) {
    echo json_encode(['status' => 'error-22', 'message' => 'An error occurred. Please try again later.']);
    exit;
}

$user_token = stripslashes($input['user_token']);



$check_user = $pdo->prepare("SELECT user_id FROM users WHERE public_id = ?");
$check_user->execute([$user_token]);
if($check_user->rowCount() == 0){
    echo json_encode(['status' => 'error-23', 'message' => 'Uknown user.']);
    exit;
}

$loan_types = $pdo -> query("SELECT * FROM loan_types ORDER BY loan_type_id ASC")->fetchAll();
$loan_types_array = array();
if(!$loan_types){
    echo json_encode(['status' => 'success', 'loan_types' => []]);
    exit;
}
foreach($loan_types as $loan_type){ 
    $loan_types_array[] = array(
        "id" => $loan_type['loan_type_id'],
        "name" => $loan_type['name'],
        "description" => $loan_type['description'],
        "min_amount" => $loan_type['min_amount'],
        "max_amount" => $loan_type['max_amount'],
        "interest_rate" => $loan_type['interest_rate'],
        "tenure_days" => $loan_type['tenure_days'],
        "late_fee_rate" => $loan_type['late_fee_rate'],
        "currency" => $loan_type['currency'],
        "status" => $loan_type['status'],
        "icon" => $loan_type['icon']
    );
}

echo json_encode(['status' => 'success', 'loan_types' => $loan_types_array]);
exit;









