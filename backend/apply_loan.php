<?php
header('Content-Type: application/json');
require_once 'connection.php';

$input = json_decode(file_get_contents("php://input"), true);


if (!isset($input['user_token'] ,$input['loan_type'],$input['loan_amount'])) {
    echo json_encode(['status' => 'error-22', 'message' => 'An error occurred. Please try again later.']);
    exit;
}

$user_token = stripslashes($input['user_token']);
$loan_type = stripslashes($input['loan_type']); 
$loan_amount = stripslashes($input['loan_amount']);

if($user_token == "" || $loan_amount == ""){
    echo json_encode(['status' => 'error-22', 'message' => 'All fields are required.']);
    exit;
}

$check_user = $pdo->prepare("SELECT user_id FROM users WHERE public_id = ?");
$check_user->execute([$user_token]);
if($check_user->rowCount() == 0){
    echo json_encode(['status' => 'error-23', 'message' => 'Invalid user token.']);
    exit;
}

$check_loan_type = $pdo->prepare("SELECT * FROM loan_types WHERE loan_type_id = ?");
$check_loan_type->execute([$loan_type]);

if($check_loan_type->rowCount() == 0){
    echo json_encode(['status' => 'error-24', 'message' => 'Invalid loan type selected.']);
    exit;
}


$check_user_loan = $pdo->prepare("SELECT * FROM loan_applications WHERE user_id = ? AND status = 'approved' OR status = 'pending'");
$check_user_loan->execute([$user_token]);

$check_user_loan = $check_user_loan->fetch(PDO::FETCH_ASSOC);

if(is_array($check_user_loan)){
    if(count($check_user_loan) != 0){
        echo json_encode(['status' => 'error-26', 'message' => 'You have an active loan application. Please wait for it to be processed before applying for a new loan.']);
        exit;
    }
}


$check_user_loan_status = $pdo->prepare("SELECT * FROM loans WHERE user_id = ? AND status = 'active' ");
$check_user_loan_status->execute([$user_token]);

$check_user_loan_status = $check_user_loan_status->fetch(PDO::FETCH_ASSOC);

if(is_array($check_user_loan_status)){
    if(count($check_user_loan_status) != 0){
        echo json_encode(['status' => 'error-26', 'message' => 'You have an active loan application. Please wait for it to be processed before applying for a new loan.']);
        exit;
    }
}

$check_user_profile = $pdo->prepare("SELECT * FROM user_profiles WHERE user_id = ? LIMIT 1");
$check_user_profile->execute([$user_token]);

$profile = $check_user_profile->fetch(PDO::FETCH_ASSOC);

if (!$profile) {
    echo json_encode(['status' => 'error-27', 'message' => 'You have not completed uploading your personal profile.']);
    exit;
}

if ($profile['status'] !== 'approved') {
    echo json_encode([
        'status' => 'error-30', 
        'message' => 'Your profile details are still ' . $profile['status'] . '. Please wait for approval before applying.'
    ]);
    exit;
}

if (empty($profile['next_of_kin_name'])) {
    echo json_encode([
        'status' => 'error-29', 
        'message' => 'You have not added your next of kin details.'
    ]);
    exit;
}

$reference_id = uniqid('GL_');

$apply_loan = $pdo->prepare("INSERT INTO loan_applications (reference_id, user_id, loan_type_id, requested_amount, status) VALUES (?, ?, ?, ?, 'pending')");
$apply_loan->execute([$reference_id, $user_token, $loan_type, $loan_amount]);

if($apply_loan->rowCount() == 0){
    echo json_encode(['status' => 'error-25', 'message' => 'Failed to submit loan application. Please try again later.']);
    exit;
}


$user = $check_user->fetch();
echo json_encode(['status' => 'success', 'message' => "successfully applied for loan.", 'reference_id' => $reference_id]);
exit();
?>











