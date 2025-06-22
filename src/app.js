require("dotenv").config();

const express = require('express');
const collection = require('./db');
const app = express();
const port = process.env.port || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/signup', async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password
  }

  const check = await collection.findOne({ name: data.name });
  if (check) {
    res.render("signuperror");
  }
  else {
    await collection.insertMany([data])
    res.render("home");
  }
})

app.post('/login', async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.name });

    if (check.password === req.body.password) {
      res.render("home2");
    } else {
      res.render("loginerror")
    }
  } catch (error) {
    res.render("loginerror")
    console.error(error);
  }
});


app.get('/signup', (req, res) => {
  res.render('signup')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
