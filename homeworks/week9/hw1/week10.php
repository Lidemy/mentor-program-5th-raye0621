<?php
    require_once('./conn.php');

    $mode         = isset($_GET["mode"]) ? htmlspecialchars($_GET["mode"]) : "";
    $restriction  = isset($_GET["norestriction"]) ? "" : "LIMIT 1";

    if ( $mode == "start" )
    {
      echo "<h1>歡迎來到綜合能力測驗</h1>";
      $instructions = array();
      $sql  = "SELECT * FROM huli_instructions ORDER BY number $restriction";
      $res  = $conn->query($sql);
      while ( $data = mysqli_fetch_array($res) )
      {
        $instructions[] = ($data['number'] > 2 ) ? "<p class='hidden'>提示 #". $data['number'] . " : " . $data['text'] . "</p>": "<p>提示 #". $data['instruction_number'] . " : " . $data['number'] . "</p>";
      }
      if ( !empty($instructions) )
      {
        echo("說明： " . join("", $instructions));
      }
    }

?>