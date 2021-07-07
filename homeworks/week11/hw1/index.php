<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  $user = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($_SESSION['username']);
    $nickname = $user['nickname'];
  }

  $page = 1;
  if (!empty($_GET['page'])) {
    $page = $_GET['page'];
  }
  $items_per_page = 5;
  $offset = ($page - 1) * $items_per_page;

  $stmt = $conn->prepare(
    "SELECT ".
      "B.id AS id, B.content as content, B.create_time, ".
      "U.nickname AS nickname, U.username ".
    "FROM raye_board AS B ".
    "LEFT JOIN raye_users AS U ON B.username = U.username ".
    "WHERE B.is_deleted IS NULL ".
    "ORDER BY B.id DESC ". 
    "LIMIT ? OFFSET ? " 
  );

  $stmt->bind_param('ii', $items_per_page, $offset);
  $result = $stmt->execute();
  if (!$result) {
    die('Error: ' . $conn->error);
  }
  $result = $stmt->get_result();

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
        <span class="board__btn update_nickname">編輯暱稱</span>
      <?php } ?>
      <?php if (isAdmin($user)) { ?>
        <a class="board__btn" href="admin.php">管理後台</a>
      <?php } ?>
      <div class="board__title">留言板斑</div>
      <?php if ($username) { ?>
        <div class="board__postby">哈囉！<?php echo $nickname  ?></div>
        <form class="hide board__nickname-form" method="POST" action="update_user.php">
          <div class="board__update__nickname">
            <label>
              新的暱稱：<input type="text" name="nickname">
            </label>
            <input type="submit" class="board__button-input">
          </div>
        </form>
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
        
        <!-- 如果已經登入但是沒有權限的話 -->
        <?php if ($username && !hasPermission($user, "create", NULL)) { ?>
          <h1>你已被停權</h1>
        <?php } else if ($username) { ?>
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
              <span class="card__author"><?php echo escape($row['nickname']) ?> (@<?php echo escape($row['username']) ?>)</span>
              <span class="card__time"><?php echo escape($row['create_time']) ?></span>

              <?php if (hasPermission($user, "update", $row)) { ?>
                <a href="update_board.php?id=<?php echo $row['id'] ?>">編輯</a>
                <a href="handle_delete_board.php?id=<?php echo $row['id'] ?>">刪除</a>
              <?php } ?>
            </div>
            <div class="card__content"><?php echo escape($row['content']) ?></div>
          </div>
        </div>
        <?php
          }
        ?>
      </section>
      <?php 
        $stmt = $conn->prepare("SELECT COUNT(id) AS count FROM raye_board WHERE is_deleted IS NULL");
        $result = $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $count = $row['count'];
        $total_page = ceil($count / $items_per_page);
      ?>
      <div class="page_info">
        <span>總共有 <?php echo $count ?> 筆留言，頁數：</span>
        <span><?php echo $page ?> / <?php echo $total_page ?></span>
      </div>
      <div class="paginator">
        <?php if ($page != 1) { ?> 
          <a href="index.php?page=1">首頁</a>
          <a href="index.php?page=<?php echo $page - 1 ?>">上一頁</a>
        <?php } ?>
        <?php if ($page != $total_page) { ?>
          <a href="index.php?page=<?php echo $page + 1 ?>">下一頁</a>
          <a href="index.php?page=<?php echo $total_page ?>">最後一頁</a> 
        <?php } ?>
      </div>

    </div>
  </main>
  <script>
    var btn = document.querySelector('.update_nickname')
    btn.addEventListener('click', function() {
      var form = document.querySelector('.board__nickname-form')
      form.classList.toggle('hide')
    })
  </script>
</body>

</html>