const express = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename(request, file, callback) {
    const extension = path.extname(file.originalname);
    callback(
      null,
      path.basename(file.originalname, extension) + Date.now() + extension
    );
  }
});

const homeUrl = 'http://localhost:3001/';

const upload = multer({ storage });

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use('/images', express.static('uploads'));

app.post('/upload', upload.array('photos'), (req, res) => {
  const uploadInfo = req.files.map((file) => {
    return {
      sourceName: file.originalname,
      newName: file.filename
    };
  });
  res.redirect(homeUrl);
});

app.get('/upload', (request, response) => {
  response.send(`
    <form action="upload" method="post" enctype="multipart/form-data">
      <input type="file" name="photos" multiple>
      <input type="submit">
    </form>
  `);
});

app.get('/uploads', (req, res) => {
  fs.readdir('./uploads', (err, files) => {
    res.send(files);
  });
});

app.get('/uploads/:image', (req, res) => {
  fs.readFile(`./uploads/${req.params.image}`, (err, file) => {
    res.send(file);
  });
});

app.listen(3000, () => console.log('Listening on port 3000 🙌'));
