const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//fake db with an array
const comments = [
  {
    username: 'Todd',
    comment: 'lol that is so funny!',
  },
  {
    username: 'Skyler',
    comment: 'birdwatching with my dog!',
  },
  {
    username: 'Sk8erBoi',
    comment: 'plz delete my account Todd!',
  },
];

app.get('/comments', (req, res) => {
  res.render('comments/index', { comments });
});

app.get('/tacos', (req, res) => {
  res.send('GET / tacos response');
});

app.post('/tacos', (req, res) => {
  const { meat, qty } = req.body;
  res.send(`OK ,here are your ${qty} ${meat} tacos`);
});

app.listen(3000),
  () => {
    console.log('omn port 3000 listening...');
  };
