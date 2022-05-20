<?php
include 'DB.php';
$conn = OpenCon();
if($conn)
{
   echo '<script type="text/javascript">window.alert("your connection has been set and is ready to be added to DB");</script>';
}
if (isset($_POST['submit'])) {
  $firstname= ($_POST['fName']);
  $lastname= ($_POST['lName']);
  $password = ($_POST['password']);
  $phone  = ($_POST['phone']);
	$email = ($_POST['email']);
  $sql = "INSERT INTO user VALUES ('558', '$firstname','$lastname' , '$password', '$email', '$phone')";
  if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
  }
   else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
}

CloseCon($conn);
?>