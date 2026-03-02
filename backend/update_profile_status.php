<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

include_once 'connection.php';

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->public_id) &&
    !empty($data->status)
) {
    try {
        $public_id = $data->public_id;
        $status = $data->status;
        $reason = !empty($data->reason) ? $data->reason : "No reason provided";

        if ($status === 'rejected') {

            $query = "DELETE FROM user_profiles WHERE public_id = :public_id";
            $stmt = $pdo->prepare($query);
            $stmt->bindParam(':public_id', $public_id);

        } else {

            $query = "UPDATE user_profiles 
                    SET status = :status,
                        reason = :reason,
                        reviewed_at = CURRENT_TIMESTAMP
                    WHERE public_id = :public_id";

            $stmt = $pdo->prepare($query);
            $stmt->bindParam(':status', $status);
            $stmt->bindParam(':reason', $reason);
            $stmt->bindParam(':public_id', $public_id);
        }

        if ($stmt->execute()) {
            echo json_encode([
                "success" => true, 
                "message" => "Profile updated to " . $status
            ]);
        } else {
            echo json_encode([
                "success" => false, 
                "message" => "Unable to update profile."
            ]);
        }
    } catch (PDOException $e) {
        echo json_encode([
            "success" => false, 
            "message" => "Execution error: " . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        "success" => false, 
        "message" => "Incomplete data. Public ID and Status required."
    ]);
}
?>