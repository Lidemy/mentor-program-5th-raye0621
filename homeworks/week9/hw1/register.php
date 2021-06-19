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
      <a class="board__btn" href="index.php">回到留言板</a>
      <a class="board__btn" href="login.php">登入</a>
      <div class="board__title">註冊頁面</div> 
      <form action="./handle_register.php" method="POST" class="board__form">
        <div class="board__field-errMsg">
          <?php
            if (!empty($_GET['errCode'])) {
              $code = $_GET['errCode'];
              $msg = 'Error';
              if ($code === '1') {
                $msg = '請填寫完整資料';
              }
              if ($code ==='2') {
                $msg = '帳號已被註冊囉！';
              }
              echo '<span>' . $msg . '<span>';
            }
          ?>
        </div>
        <div class="board__field">
          <label>
            暱稱：<input type="text" name="nickname">
          </label>
        </div>
        <div class="board__field">
          <label>
            帳號：<input type="text" name="username">
          </label>
        </div>
        <div class="board__field">
          <label>
            密碼：<input type="password" name="password">
          </label>
        </div>
        <div class="board__button">
         <input class="board__button-input" type="submit">
        </div>
      </form>
      <div class="board_divider"></div>
    </div>
  </main>
</body>
</html>