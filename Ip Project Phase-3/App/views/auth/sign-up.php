<?php
            session_start();
            $conn = mysqli_connect('localhost','root','') or die(mysqli_connect_error());
            $db_select = mysqli_select_db($conn, 'trial') or die(mysqli_connect_error());
?>

<?php
   if(isset($_SESSION['add'])){
      echo $_SESSION['add'];
      unset($_SESSION['add']);
   }
?>


<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta name="author" content="Group - 7">
   <base href="../../../../Ip Project Phase-3/">
   <link rel="stylesheet" href="Resources/css/base.css">
   <link rel="stylesheet" href="Resources/css/auth.css">
	<script src="Resources/js/dataSet.js"></script>
   <title>Sign Up</title>
</head>
<body>
   <div class="main-card">
      <div class="nav-bar">
         <span>SIGN UP</span>
         <a href="App/views/landing-page.html">
            <img src="Resources/images/svg/close.svg" class="nav-icon">
         </a>
      </div>

      <div class="button-box">
         <button class="switch"><a href="App/views/auth/login.html">LOGIN</a></button>
         <button class="switch on">SIGN UP</button>
      </div>

      <form onsubmit="return validateSignUp()" name="signupForm" method = "POST">
         <div class="profile-photo-container">
            <img src="Resources/images/svg/user.svg" class="profile-picture" id="profilePic">

            <input 
            type="file" name="photo" 
            id="photo" class="hidden-input" 
            accept="image/*" oninput='photo = this.files[0].name, profilePic.src = "Resources/images/" + this.files[0].name'>
            <label for="photo" ></label>

         </div>

         <label for="fName">First Name</label>
         <input type="text" name="fName" id="fName" class="text-input" maxlength="15" required>

         <label for="lName">Last Name</label>
         <input type="text" name="lName" id="lName" class="text-input" maxlength="15">

         <label for="sex">Sex</label>
         <select name="sex" id="sex" class="text-input">
            <option value="male">Male</option>
            <option value="female">Female</option>
         </select>

         <label for="email">E-mail</label>
         <input type="email" name="email" id="email" class="text-input" placeholder="ets05**13feng@aastu.edu.et" required>

         <label for="phone">Phone</label>
         <input type="tel" name="phone" id="phone" class="text-input">

         <label for="password">Password</label>
         <input type="password" minlength="8" maxlength="16" name="password" id="password" class="text-input" required>

         <label for="confirm">Confirm Password</label>
         <input type="password" minlength="8" maxlength="16" name="confirm" id="confirm" class="text-input" required>

         <label for="privacy">
            <input type="checkbox" name="privacy" id="privacy" required>
            by checking this box you will agree to the terms of 
            privacy policy
         </label>
         <button type="submit" class="login" name = "submit">SIGN UP</button>  
      </form>
      <?php
      if(isset($_POST['submit']))
      {
         $fname = $_POST['fName'];
         $lname = $_POST['lName'];
         $sex = $_POST['sex'];
         $email = $_POST['email'];
         $phone = $_POST['phone'];
         $password = md5($_POST['password']); //SHA


         $sql = "INSERT INTO signin SET
                  first_name = '$fname',
                  last_name  = '$lname',
                  sex = '$sex',
                  email = '$email',
                  phone = '$phone',
                  password = '$password'";
            $res = mysqli_query($conn, $sql) or die(mysqli_error($conn)); 

            if($res = TRUE)
            {
               $_SESSION['add'] = '<div>User Successfuly Registered!</div>';
               header('location: '.'../main/index.html');
            }
            else 
            {
               $_SESSION['add'] = '<div>Failed to Regiter!</div>';
               header('location: '.'../main/index.html');
            }
         }
      ?>

   </div>
<script>
   function User(fname, sex, email, password, 
   lname = "", phone = null, photo = "user.svg",
   groups = [], ownGroups = []) {
      this.fname = fname;
      this.lname = lname;
      this.sex = sex;
      this.phone = phone;
      this.email = email;
      this.password = password;
      this.photo = photo;
      this.groups = groups;
      this.ownGroups = ownGroups;
};
var users, chatList, groupList;

var user, photo = "Resources/images/svg/user.svg";
function validateSignUp() {
   var fName = document.forms['signupForm']['fName'].value;
   var sex = document.forms['signupForm']['sex'].value;
   var email = document.forms['signupForm']['email'].value;
   var password = document.forms['signupForm']['password'].value;
   var confirm = document.forms['signupForm']['confirm'].value;
   var phone = document.forms['signupForm']['phone'].value;
   var lName = document.forms['signupForm']['lName'].value;

   user = users[email.substr(0,7)];
   if (user) {
      alert("the email has been taken");
      return false;
   }
   if ( !(email.length >= 26)) {
      alert("please insert a valid institutional email\nlike 'ets058912feng@astu.edu.et'");
      return false;
   }
   if (!(email.slice(13, 26) == "@aastu.edu.et")) {
      alert("please insert a valid institutional email\nlike 'ets058912feng@astu.edu.et'");
      return false;
   }
   if (phone == "") {
      alert("phone number is required");
      return false;
   }
   if ((/09[0-9]{8}/.exec(phone) == phone) == false) {
      alert("please enter a 10 digit phone number starting with '09'");
      document.forms['signupForm']['phone'].focus;
      return false;
   }  
   if (confirm == password) {
      user = new User(fName, sex, email, password, lName, phone, photo);
      localStorage.setItem("curUser", email.substr(0,7));
      alert("successfully created an account")
      users[email.substr(0,7)] = user;
      localStorage.setItem('users', JSON.stringify(users));
      return true;
   }
   else {
      alert("Please match the passwords!");
      return false;
   }
}
</script>
</body>
</html>



