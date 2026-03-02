<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
require_once 'connection.php';

$status = $_GET['status'] ?? 'pending';

try {
    // We join 4 tables to give the Admin a full "Dossier" of the applicant
    $query = "
        SELECT 
            app.loan_application_id,
            app.reference_id,
            app.user_id,
            app.requested_amount,
            app.status,
            app.applied_at,
            -- From User Profiles
            up.nrc_number,
            up.nrc_image_front,
            -- From Business Profiles
            bp.business_name,
            bp.business_location,
            -- From Loan Types
            lt.name AS loan_type_name,
            lt.interest_rate
        FROM loan_applications app
        LEFT JOIN user_profiles up ON app.user_id = up.user_id
        LEFT JOIN business_profiles bp ON app.user_id = bp.user_id
        LEFT JOIN loan_types lt ON app.loan_type_id = lt.loan_type_id
        WHERE app.status = :status
        ORDER BY app.applied_at DESC
    ";

    $stmt = $pdo->prepare($query);
    $stmt->execute(['status' => $status]);
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'data' => $results
    ]);

} catch (PDOException $e) {
    echo json_encode([
        'success' => false, 
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}