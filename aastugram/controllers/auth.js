const mysql = require("mysql");
const nodemailer = require('nodemailer');
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
    host: "localhost",
    user: "minase",
    password: "df",
    database: "aastugram"
});

module.exports={
  login :async (req, res) => {
      try {
          const { email, password } = req.body;
          if (!email || !password) {
              return res.status(400).render("login");
          }
          db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {

              if (results.length == 0 || !await bcrypt.compare(password, results[0].password)) {
                    res.status(200).render('login', {error: "Invalid Email or Password"});
              } else
                  res.status(200).render("index");
            });
      } catch (err) {
        console.log(err);
      }
  },

  register :(req, res) => {
      console.log(req.body);

      const {body} = req;

      var fname = body.fName;
      var lname = body.lName;
      var sex = body.sex;
      var email = body.email;
      var password = body.password;
      var confirm = body.confirm;
      var vkey =  (Math.floor(Math.random() * 1000 + 1000)).toString();

      db.query('SELECT email FROM users WHERE email = ?', [email], async (err, results) => {
          if (err) {
              console.log(err);
          } else {
              if (results.length > 0) {
                  return res.render("index", {
                      message: 'The email is already in use'})
              } else if (password != confirm) {
                  return res.render("index", {
                      message: "Password don't match"});
              }
          }
          let hashedPassword = await bcrypt.hash(password, 8);

          db.query('INSERT INTO users(fname, lname, email, password, sex, verified, vkey) VALUES(?, ?, ?, ?, ?, ?, ?)', 
                    [fname, lname, email, hashedPassword, sex, '0', vkey], (err, result) => {

              res.render("verify");
              if (err) {
                  console.log(err);
              } else {
                  console.log("sending email");
                  var transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                      // type: 'OAuth2',
                      user: 'minasedrg@gmail.com',
                      pass: 'dr@mino/cp'
                    }
                  });

                  var mailOptions = {
                    from: 'minasedrg@gmail.com',
                    to: email,
                    subject: 'Verification Email, AASTUGRAM',
                    text: `Your verification code is ${vkey}.`,
                  };

                  transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                    // res.render("/verify");
                  });
              }
          });
      });
  },

  logout :(req, res) => {
     res.status(200).render("/");
  },

  verify : (req, res) => {

      const { code } = req.body;

      db.query("UPDATE users verified = 1 WHERE vkey = ?", [code], (err, results) => {

          if (results.length != 0 && results[0].vkey != code)  {
                  res.status(200).render("verify", {error: "Invalid Code!!"});
          } else {
            res.status(200).render("index");
         }
      });
  },

  forgot: (req, res) => {
      console.log("resseting password");
      const { email, password, confirm } = req.body;
      if (password != confirm) 
         res.status(200).render("forgot", {error: "Password Mismatch!!"});

      let newpass = bcrypt.hash(password, 8);
      
      db.query("UPDATE users set password = ? WHERE email = ?", [newpass, email], (err, result) => {
           res.status(200).render("login");
      });

  }
}
