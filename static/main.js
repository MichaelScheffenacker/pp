window.onload = function () {
    main();
};

const main = function () {

    const nameInput = document.getElementById('name');
    const nameForm = document.getElementById('nameForm');
    const resultsDiv = document.getElementById('results');
    const seatsNorthDiv = document.getElementById('seats-north');
    const seatsSouthDiv = document.getElementById('seats-south');
    const pointCards = document.querySelectorAll('#points .card');
    const pointsDiv = document.getElementById('points');
    const turnBtn = document.getElementById('turn');
    const newBtn = document.getElementById('new');
    const nukeBtn = document.getElementById('nuke');
    const url = document.baseURI;

    pointCards.forEach(card => {
        const points = card.innerHTML;
        card.addEventListener('click', event => subPoints(event, points, card));
    });

    turnBtn.addEventListener('click', () => fetch(url + 'turn'));
    newBtn.addEventListener('click', () => fetch(url + 'new'));
    nukeBtn.addEventListener('click', () => fetch(url + 'nuke'));

    const update = function () {
        fetch(url + 'result')
            .then(res => res.json())
            .then(users => addResult(users))
            .catch(err => console.log(err));
    }

    window.setInterval(update, 2000);

    function subName(event) {
        const name = nameInput.value;
        event.preventDefault();
        fetch(url + 'user/' + name)
            .then(res => res.text())
            .then(txt => {
                console.log('Name submitted');
                nameForm.classList.add('hidden');
                resultsDiv.classList.remove('hidden');
                pointsDiv.classList.remove('hidden');
            })
            .catch(err => console.log(err));
    }

    function subPoints(event, points, card) {
        const name = nameInput.value;
        fetch(url + 'user/' + name + '/' + points)
            .then(res => res.text())
            .then(txt => {
                console.log('Points submitted');
                pointCards.forEach(card => card.classList.remove('selected'));
                card.classList.add('selected');
            })
            .catch(err => console.log(err));
    }

    nameForm.addEventListener('submit', subName);

    const results = [];
    let switcher = true;

    function addResult(users) {
        results.forEach(user => user.remove());

        for (const [name, info] of Object.entries(users)) {
            if (name === nameInput.value && !info.voted) {
                pointCards.forEach(card => card.classList.remove('selected'));
            }
            const seatDiv = document.createElement('div');
            const seatCardDiv = document.createElement('div');
            seatDiv.classList.add('seat');
            seatCardDiv.classList.add('card');
            const hasVoted = info.voted ? '🗸' : '';
            const pts = info.pts || '';
            const nameNode = document.createTextNode(name);
            const voteNode = document.createTextNode(`${hasVoted} ${pts}`);
            seatDiv.appendChild(nameNode);
            seatDiv.appendChild(seatCardDiv);
            seatCardDiv.appendChild(voteNode);
            results.push(seatDiv);
            if (switcher) {
                seatsNorthDiv.appendChild(seatDiv);
            } else {
                seatsSouthDiv.appendChild(seatDiv);
            }
            switcher = !switcher;
        }
    }
}
