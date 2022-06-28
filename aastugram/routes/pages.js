const express = require("express");
const router = express.Router();
const {register, login, isLoggedIn, logout, verify, forgot} = require("../controllers/auth");

router.get('/', (req, res) => {

    res.render("main");
});

router.get('/index', (req, res) => {

    res.render('index');
});


router.get('/auth/register', (req, res) => {

    res.render("register");
});

router.post('/auth/register', register, (req, res) => {
    res.render("verify");
});

router.get('/auth/login', (req, res) => {

    res.render("login", {error:null});
});

router.post('/auth/login', login, (req, res) => {

    res.render("index");
});

router.get('/terms', (req, res) => {

  res.render('terms');
});

router.get('/auth/verify', (req, res) => {

  res.render("verify", {error:null});
});

router.post('/auth/verify', verify, (req, res) => {

  res.render("verify");
});

router.get('/auth/forgot', (req, res) => {

  res.render("forgot", {error:null});
});

router.post('/auth/forgot', forgot, (req, res) => {

  res.render("forgot", {error: null});
});

module.exports = router
