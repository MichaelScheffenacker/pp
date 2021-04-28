const express = require('express');
const pp = express();

const port = 8500;

let users = {};
let turn = false;

pp.use(express.static('static'));
pp.listen(port, () => console.log(`listening on port ${port}`));

pp.get('/user/:user', (req, res) => {
    users[req.params.user] = null;
    res.send("User updated");
});

pp.get('/user/:user/:pts', (req, res) => {
    users[req.params.user] = req.params.pts;
    res.send("Points updated");
});

pp.get('/result',  (req, res) => {
    const info = {};
    for (const [name, pts] of Object.entries(users)) {
        info[name] = {voted: !!pts, pts: turn ? pts : null}
    }
    res.send(JSON.stringify(info));
})