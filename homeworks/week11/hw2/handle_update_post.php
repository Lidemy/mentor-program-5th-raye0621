<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  require_once("check_permission.php");  

  if (
    empty($_POST['content'])  ||
    empty($_POST['title'])  ||
    empty($_POST['id'])  
  ) {
    header("Location: " . $_SERVER['HTTP_REFERER']);
    die('資料不齊全');
  }

  $id = $_POST['id'];
  $content = $_POST['content'];
  $title = $_POST['title'];
  $last_page = $_POST['page'];

  $sql = "UPDATE raye_posts SET content = ?, title = ? WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ssi', $content, $title, $id);

  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  header("Location: " . $last_page);
?>