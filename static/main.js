window.onload = function () {
    main();
};

const main = function () {

    const nameInput = document.getElementById('name');
    const nameForm = document.getElementById('nameForm');
    const resultsDiv = document.getElementById('results');
    const pointCards = document.querySelectorAll('#points .card');
    const pointsDiv = document.getElementById('points');
    const url = document.baseURI;

    pointCards.forEach(card => {
        const points = card.innerHTML;
        card.addEventListener('click', event => subPoints(event, points, card))
    });

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
                pointCards.forEach(card => card.classList.remove('selected'))
                card.classList.add('selected');
            })
            .catch(err => console.log(err));
    }

    nameForm.addEventListener('submit', subName);

    const results = [];

    function addResult(users) {
        results.forEach(user => user.remove());
        for (const [name, info] of Object.entries(users)) {
            const user = document.createElement('div');
            const hasVoted = info.voted ? '🗸' : '';
            const pts = info.pts || '';
            const text = document.createTextNode(`${name} ${hasVoted} ${pts}`);
            user.appendChild(text);
            results.push(user);
            resultsDiv.appendChild(user);

        }
    }
}
