window.onload = function () {
    main();
};

const main = function () {

    const nameInput = document.getElementById('name');
    const nameForm = document.getElementById('nameForm');
    const resultsDiv = document.getElementById('results');
    const pointCards = document.querySelectorAll('#points .card');
    const url = document.baseURI;

    fetch(url + 'result')
        .then(res => res.json())
        .then(users => addResult(users))
        .catch(err => console.log(err));

    pointCards.forEach(card => {
        const points = card.innerHTML;
        card.addEventListener('click', event => subPoints(event, points))
    })

    function subName(event) {
        const name = nameInput.value;
        event.preventDefault();
        fetch(url + 'user/' + name)
            .then(res => res.text())
            .then(txt => console.log('Name submitted', txt))
            .catch(err => console.log(err));
    }

    function subPoints(event, points) {
        const name = nameInput.value;
        event.preventDefault();
        fetch(url + 'user/' + name + '/' + points)
            .then(res => res.text())
            .then(txt => console.log('Points submitted', txt))
            .catch(err => console.log(err));
    }

    nameForm.addEventListener('submit', subName);

    function addResult(users) {
        for (const [name, pts] of Object.entries(users)) {
            const user = document.createElement('div');
            const text = document.createTextNode(`${name}: ${pts} Points`);
            user.appendChild(text);
            resultsDiv.appendChild(user);
        }
    }
}
