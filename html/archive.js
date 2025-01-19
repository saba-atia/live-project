document.addEventListener('DOMContentLoaded', function () {
    const archiveContainer = document.getElementById('archive-container');

    loadArchivedCards();

    function loadArchivedCards() {
        const archivedCards = JSON.parse(localStorage.getItem('archivedCards')) || [];
        archivedCards.forEach(card => {
            createArchivedCard(card.name, card.description, card.date, card.color);
        });
    }

    function createArchivedCard(name, description, date, color) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.backgroundColor = color;

        card.innerHTML = `
            <h4 class="card-name">${name}</h4>
            <p class="card-description">${description}</p>
            <p class="card-date">${date}</p>
                        <button class="delete-button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg></button>
        `;
        card.querySelector('.delete-button').addEventListener('click', () => {
            card.remove();
            });

        archiveContainer.appendChild(card);
    }
});
