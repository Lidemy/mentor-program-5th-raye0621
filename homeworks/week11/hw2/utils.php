<?php
  require_once("conn.php");

  function getUserFromUsername($username) {
    global $conn;
    $sql = sprintf(
      "SELECT * FROM raye_users WHERE username = '%s'",
      $username
    );
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    return $row; 
  }
  
  // 跳脫字元函式
  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }

?>