const express = require('express');
const pp = express();

const port = 8500;

users={};

pp.use(express.static('static'));
pp.listen(port, () => console.log(`listening on port ${port}`));

pp.get('/:user/:pts', (req, res) => {
    users[req.params.user] = req.params.pts
    let str = '';
    for (const [name, pts] of Object.entries(users)) {
        str += `<p>${name}: ${pts} Points</p>`
    }
    res.send(str);
});