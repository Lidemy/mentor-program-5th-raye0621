<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");
  
  $id = $_GET['id'];
  $username = NULL;
  $user = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($_SESSION['username']);
    $nickname = $user['nickname'];
  }

  $stmt = $conn->prepare("SELECT * FROM raye_board WHERE id = ?");
  $stmt->bind_param("i", $id);
  $result = $stmt->execute();
  if (!$result) {
    die('Error: ' . $conn->error);
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>留言板斑</title>
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
  <link rel="stylesheet" href="https://meyerweb.com/eric/tools/css/reset/reset.css">
</head>

<body class="debug">
  <h1 class="prompt">本網站為練習用網站，故忽略資安實作部分，請勿使用真實的帳號密碼！</h1>
  <main>
    <div class="board">
      <div class="board__title">修改留言</div>
      <form action="handle_update_board.php" method="POST" class="board__form">
        <div class="board__form-top">
          
          <?php
            if (!empty($_GET['errCode'])) {
              $code = $_GET['errCode'];
              $msg = 'Error';
              if ($code === '1') {
                $msg = '請填寫完整資料';
              }
              echo '<span>' . $msg . '<span>';
            }          
          ?>
        </div>        
        <textarea name="content" class="board__comment" rows="5"><?php echo escape($row['content']) ?></textarea>
        <input type="hidden" name="id" value="<?php echo $row['id']?>" />
        <div class="board__button">
          <input class="board__button-input" type="submit">
        </div>
      </form>
    </div>
  </main>

</body>

</html>