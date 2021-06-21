<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }
  $result = $conn->query("SELECT * FROM raye_board order by id desc");
  if (!$result) {
    die('Error: ' . $conn->error);
  }
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
      <?php if (!$username) { ?>
        <a class="board__btn" href="register.php">註冊</a>
        <a class="board__btn" href="login.php">登入</a>
      <?php } else { ?>
        <a class="board__btn" href="logout.php">登出</a>
      <?php } ?>
      <div class="board__title">留言板斑</div>
      <?php if ($username) { ?>
        <div class="board__postby">哈囉！<?= $username ?></div>
      <?php } ?>
      <form action="./handle_add.php" method="POST" class="board__form">
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
        <textarea name="content" class="board__comment" rows="5"></textarea>        
        <?php if ($username) { ?>
          <div class="board__button">
            <input class="board__button-input" type="submit">
          </div>
        <?php } else { ?>
          <h1>請登入以輸入留言</h1>
        <?php } ?>        
      </form>
      <div class="board_divider"></div>
      <section>
        <?php
          while($row = $result->fetch_assoc()) {
        ?>
        <div class="card">
          <div class="card__avatar"></div>
          <div class="card__body">
            <div class="card__info">
              <span class="card__author"><?php echo $row['nickname'] ?></span>
              <span class="card__time"><?php echo $row['create_time'] ?></span>
            </div>
            <div class="card__content"><?php echo $row['content'] ?></div>
          </div>
        </div>
        <?php
          }
        ?>
      </section>
    </div>
  </main>
</body>
</html>