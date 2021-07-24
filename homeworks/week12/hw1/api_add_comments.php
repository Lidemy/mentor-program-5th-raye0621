<?php
  require_once('conn.php');

  // 回傳的是 json 格式並以 utf8 編碼
  header('Content-type:application/json;charset=utf-8');
  // CORS 問題所以要加上這行
  header('Access-Control-Allow-Origin: *');
  // 這邊看有沒有東西傳送進來，沒有的話導回去
  if (
    empty($_POST['content']) ||
    empty($_POST['nickname']) ||
    empty($_POST['site_key'])
  ) {
    $json = array(
      "ok" => false,
      "message" => "Please input missing fields"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $nickname = $_POST['nickname'];
  $site_key = $_POST['site_key'];
  $content = $_POST['content'];

  $sql = "INSERT INTO raye_discussions(site_key, nickname, content) VALUE (?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $site_key, $nickname, $content);
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
    "message" => "success"
  );
  $response = json_encode($json);
  echo $response;
  die();
?>