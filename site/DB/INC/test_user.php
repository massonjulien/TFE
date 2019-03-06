<?php

// Importing DBConfig.php file.
include 'config_file.php';

// Creating connection.
 $con = mysqli_connect($host_name,$host_user,$host_password,$database_name);

 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');

 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);

// Populate User email from JSON $obj array and store into $email.
$email = $obj['Email'];
$hashedPW = hash('sha256', $obj['Password']);


$Sql_Query = "select * from user where Email = '$email' AND Password='$hashedPW'";

// Executing SQL Query.
$check = mysqli_fetch_array(mysqli_query($con,$Sql_Query));

//if email already existing can't create another one with the same name
if(isset($check)){
  $EmailExisting = true;
  $EmailExisting = json_encode($EmailExisting);
  echo $EmailExisting ;
//if email doesn't exist we can create the email with this name
 } else{
   $InvalidMSG = false ;
   $InvalidMSGJSon = json_encode($InvalidMSG);
   echo $InvalidMSGJSon ;
 }
 mysqli_close($con);
?>
