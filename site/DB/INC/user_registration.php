<?php

include 'config_file.php';

$message = '';

$connection = new mysqli($host_name, $host_user, $host_password, $database_name);

if ($connection->connect_error)
{
 die("Connection failed: " . $connection->connect_error);
}

$json = json_decode(file_get_contents('php://input'), true);

$hashedPW = hash('sha256', $json['Password']);

$query = "INSERT INTO user(Email, Name, LastName, Photo, Tel, Password)
          values('$json[Email]', '$json[Name]', '$json[LastName]', 'https://olitot.com/DB/USER/inconnu.jpg', '$json[Tel]', '$hashedPW')";


$query_result = $connection->query($query);

if ($query_result === true)
{
 $message = 'Success!';
}

else
{
 $message = 'Error! Try Again.';
}

echo json_encode($message);

$connection->close();

?>
