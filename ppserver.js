const express = require('express');
const pp = express();

const port = 8500;

users = {};

pp.use(express.static('static'));
pp.listen(port, () => console.log(`listening on port ${port}`));

pp.get('/user/:user', (req, res) => {
    users[req.params.user] = '';
    res.send("User updated");
});

pp.get('/user/:user/:pts', (req, res) => {
    users[req.params.user] = req.params.pts;
    res.send("Points updated");
});

pp.get('/result',  (req, res) => {
    res.send(JSON.stringify(users));
})