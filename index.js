const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    fs.readdir('./files', (err, files) => {
        res.render('index', { files: files });
    });
});

app.post('/create', (req, res) => {
    const filename = req.body.title.split(' ').join('') + '.txt';
    fs.writeFile(`./files/${filename}`, req.body.details, (err) => {
        res.redirect('/');
    });
});

app.get('/file/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, 'utf-8', (err, filedata) => {
        res.render('show', { filename: req.params.filename, filedata: filedata });
    });
});

app.get('/edit/:filename', (req, res) => {
    res.render('edit', { filename: req.params.filename });
});

app.post('/edit', (req, res) => {
    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}.txt` , (err) => {
        res.redirect('/');
    })
});

app.listen(3000, () => {
    console.log('server is running');
});

