<?php
  // Original Ref: https://www.tutorialspoint.com/php/php_mysql_login.htm
   session_start();

   if($_SERVER["REQUEST_METHOD"] == "POST") {
      // username and password sent from form 
      $username = $_POST['username'];
      $password = $_POST['password']; 

      // TODO: Connect so that count = 1 iff username and password is correct
      if ($username == "Sunera" && $password == "pass123"){
        $count = 1; 
      }else{
        $count = 0; 
      }

      if($count == 1) {
         $_SESSION['user'] = $username;
         echo "pass";
      }else {
         echo "fail";
      }
   }
?>
