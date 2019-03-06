<?php

  include 'config_file.php';
  $conn = mysqli_connect($host_name,$host_user,$host_password,$database_name);


  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $json = file_get_contents('php://input');
  $obj = json_decode($json,true);
  $email = $obj['Email'];

  $sql = "SELECT * FROM user where email='$email'";

  $result = $conn->query($sql);
  if ($result->num_rows >0) {
    while($row[] = $result->fetch_assoc()) {
      $tem = $row;
      $json = json_encode($tem);
    }
  } else {
    echo "No Results Found.";
  }
  echo $json;
  $conn->close();

?>
