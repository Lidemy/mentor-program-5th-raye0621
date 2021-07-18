<?php
  require_once('conn.php');

  // 回傳的是 json 格式並以 utf8 編碼
  header('Content-type:application/json;charset=utf-8');
  // CORS 問題所以要加上這行
  header('Access-Control-Allow-Origin: *');
  // 這邊看有沒有東西傳送進來，沒有的話導回去
  if (
    empty($_GET['id'])
  ) {
    $json = array(
      "ok" => false,
      "message" => "Please add id in url"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  // 別忘記轉成數字好習慣 intval
  $id = intval($_GET['id']);

  // 傳回所有檔案
  $sql = "SELECT id, todo FROM raye_todos WHERE id = ? " ;
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);

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
  $row = $result->fetch_assoc();
  
  $json = array(
    "ok" => true,
    "data" => array(
      "id" => $row["id"],
      "todo" => $row["todo"]
    )
  );
  $response = json_encode($json);
  echo $response;
?>