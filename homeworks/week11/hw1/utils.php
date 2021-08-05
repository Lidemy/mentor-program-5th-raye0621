<?php
  require_once("conn.php");

  function generateToken() {
    $s = '';
    for($i = 1; $i <= 16; $i++) {
        $s .= chr(rand(65, 90));
    }
    return $s;
  }

  function getUserFromUsername($username) {
    global $conn;
    $sql = sprintf(
      "SELECT * FROM raye_users WHERE username = '%s'",
      $username
    );
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    return $row; // username id nickname role
  }
  
  // 跳脫字元函式
  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }

  // 判斷有無權限 , $action: update, delete, create
  function hasPermission($user, $action, $comment) {
    if ($user == NULL) {
      return false;
    }

    if ($user["role"] == "ADMIN") {
      return true;
    }

    if ($user["role"] == "NORMAL") {
      if ($action === "create") return true;
      return $comment["username"] === $user["username"];
    }

    if ($user["role"] == "BANNED") {
      if ($action === "create") {
        return false;
      }
      return $comment["username"] === $user["username"];
    }
  }

  function isAdmin($user) {
    if ($user == NULL) {
      return false;
    }
    return $user["role"] === "ADMIN";
  }

?>