<?php
  require_once('conn.php');

  // 回傳的是 json 格式並以 utf8 編碼
  header('Content-type:application/json;charset=utf-8');
  // CORS 問題所以要加上這行
  header('Access-Control-Allow-Origin: *');
  // 這邊看有沒有東西傳送進來，沒有的話導回去
  if (
    empty($_POST['todo'])
  ) {
    $json = array(
      "ok" => false,
      "message" => "Please input missing fields"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $todo = $_POST['todo'];

  $sql = "INSERT INTO raye_todos(todo) VALUE (?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $todo);
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

  $json = array(
    "ok" => true,
    "message" => "success",
    "id" => $conn->insert_id
  );
  $response = json_encode($json);
  echo $response;
  die();
?>