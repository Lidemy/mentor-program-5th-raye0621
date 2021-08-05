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

  if (!$user || $user['role'] !== 'ADMIN') {
    header('Location: index.php');
    exit;
  }

  $stmt = $conn->prepare("SELECT id, role, nickname, username FROM raye_users order by id asc ");
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
  <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
  <link rel="stylesheet" href="style.css">
</head>

<body class="debug">
  <h1 class="prompt">本網站為練習用網站，故忽略資安實作部分，請勿使用真實的帳號密碼！</h1>
  <main>
    <div class="admin__board">

      <a class="board__btn" href="index.php">前台</a>
      <div class="board__title">管理後臺</div>

      <div class="board_divider"></div>
      <section>
        <table>
          <tr>
            <th>id</th>
            <th>暱稱</th>
            <th>使用者名稱</th>
            <th>身分</th>
            <th>調整權限</th>
          </tr>
          <?php
            while($row = $result->fetch_assoc()) {
          ?>
          <tr>
            <td class="admin__board__id"><?php echo escape($row['id']) ?></td>
            <td><?php echo escape($row['nickname']) ?></td>
            <td><?php echo escape($row['username']) ?></td>
            <td class="admin__board__role">
              <?php 
                if(escape($row['role']) == 'NORMAL') {
                  echo '一般用戶';
                } else if(escape($row['role']) == 'ADMIN') {
                  echo '管理員';
                } else if(escape($row['role']) == 'BANNED') {
                  echo '黑單用戶';
                }
              ?>
            </td>
            <td class="admin__board__update__role">
              <a href="handle_update_role.php?role=ADMIN&id=<?php echo escape($row["id"]); ?>">管理員</a>
              <a href="handle_update_role.php?role=NORMAL&id=<?php echo escape($row["id"]); ?>">使用者</a>
              <a href="handle_update_role.php?role=BANNED&id=<?php echo escape($row["id"]); ?>">停權</a>              
            </td>
          </tr>
          <?php
            }
          ?>
        </table>        
      </section>
    </div>
  </main>

  <script>
    const btn = document.querySelector('.update_nickname')
    btn.addEventListener('click', function() {
      const form = document.querySelector('.board__nickname-form')
      form.classList.toggle('hide')
    })
  </script>
</body>
</html>