<?php
  require_once('conn.php');

  // 回傳的是 json 格式並以 utf8 編碼
  header('Content-type:application/json;charset=utf-8');
  // CORS 問題所以要加上這行
  header('Access-Control-Allow-Origin: *');
  // 這邊看有沒有東西傳送進來，沒有的話導回去
  if (
    empty($_GET['site_key'])
  ) {
    $json = array(
      "ok" => false,
      "message" => "Please add site_key in url"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $site_key = $_GET['site_key'];
  // $before = $_GET['before'];
  

  // 傳回所有檔案
  $sql = "SELECT id, nickname, content, created_at " .
  "FROM raye_discussions " .
  "WHERE site_key = ? " . 
  (empty($_GET['before']) ? "" : "and id < ? ") .
  "ORDER BY id DESC LIMIT 5";
  $stmt = $conn->prepare($sql);
  if (empty($_GET['before'])) {
    $stmt->bind_param('s', $site_key);
  } else {
    $stmt->bind_param('si', $site_key, $_GET['before']);
  }
  $result = $stmt->execute();

  if (!$result) {
    $json = array(
      "ok" => false,
      "message" => $conn->error // 一般不會這樣做
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  $result = $stmt->get_result();
  $discussions = array();
  while($row = $result->fetch_assoc()) {
    array_push($discussions, array(
      "id" => $row["id"],
      "nickname" => $row["nickname"],
      "content" => $row["content"],
      "created_at" => $row["created_at"]
    ));
  }
  
  $json = array(
    "ok" => true,
    "discussions" => $discussions
  );
  $response = json_encode($json);
  echo $response;
?>