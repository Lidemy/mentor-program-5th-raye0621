<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  
  if (empty($_GET['id'])) {
    header("Location: index.php?errCode=1");
    die('資料不齊全');
  }

  $id = $_GET['id'];
  $role = $_GET['role'];
  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);
  
  // 管理員不能管理自己的權限，一日管理員終身管理員。
  if ($user['id'] !== $id) {
    $sql = "UPDATE raye_users SET role = ? WHERE id = ?";
  } else {
    header("Location: admin.php");
    exit;
  }
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('si', $role, $id);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  header("Location: admin.php");
?>