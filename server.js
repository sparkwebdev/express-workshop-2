const express = require("express");
const app = express();
// Add this to the top of your file
const exphbs  = require('express-handlebars');
const fs = require('fs');

// Then these two lines after you initialise your express app 
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// The extensions 'html' allows us to serve file without adding .html at the end 
// i.e /my-cv will server /my-cv.html
app.use(express.static("public", {'extensions': ['html']}));

// what does this line mean: process.env.PORT || 3000
app.listen(process.env.PORT || 3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});

app.get('/', function (req, res) {
  const filePath = __dirname + '/data/posts.json';
  const callbackFunction = function(error, file) {
    const fileData = file.toString();
    const postsJson = JSON.parse(fileData);
    res.render('index', {
      'title': 'Home Page',
      'subheading': 'A modern Website built in Node',
      posts: postsJson
    });
  };
  fs.readFile(filePath, callbackFunction);
});

app.get('/my-cv', function(req, res) {
  res.render('my-cv');
});

app.get('/admin', function(req, res) {
  res.render('admin');
});

app.get('/post', function(req, res) {
  res.render('post');
});

app.get('/contact', function(req, res) {
  res.send('test');
});

app.get('/api/posts', function(req, res) {
  res.render(__dirname + '/api/posts');
});