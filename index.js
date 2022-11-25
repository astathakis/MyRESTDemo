const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');

// ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//fake db with an array
let comments = [
  {
    id: uuidv4(),
    username: 'Todd',
    comment: 'lol that is so funny!',
  },
  {
    id: uuidv4(),
    username: 'Skyler',
    comment: 'birdwatching with my dog!',
  },
  {
    id: uuidv4(),
    username: 'Sk8erBoi',
    comment: 'plz delete my account Todd!',
  },
];

app.get('/comments', (req, res) => {
  res.render('comments/index', { comments });
});

app.get('/comments/new', (req, res) => {
  res.render('comments/new');
});

app.post('/comments', (req, res) => {
  // console.log(req.body);
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuidv4() });
  // res.send('it worked!!');///
  res.redirect('/comments');
});

app.get('/comments/:id', (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render('comments/show', { comment });
});

app.get('/comments/:id/edit', (req, res) => {
  const { id } = req.params;

  const comment = comments.find((c) => c.id === id);
  res.render('comments/edit', { comment });
});

app.patch('/comments/:id/', (req, res) => {
  const { id } = req.params;
  const newCommentText = req.body.comment;
  const foundComment = comments.find((c) => c.id === id);
  foundComment.comment = newCommentText;
  // console.log(req.body.comment);
  res.redirect('/comments');

  // res.send('all good!!!');
});

app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  //to remove comment from the array without mutating the original
  comments = comments.filter((c) => c.id !== id);
  res.redirect('/comments');
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
