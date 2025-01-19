document.addEventListener('DOMContentLoaded', function () {
  const addButton = document.getElementById('add-button');
  const modal = document.getElementById('modal');
  const overlay = document.getElementById('overlay');
  const saveButton = document.getElementById('save-button');
  const cancelButton = document.getElementById('cancel-button');
  const cardContainer = document.getElementById('card-container');
  const searchBar = document.getElementById('search-bar');
  const resetSearchButton = document.getElementById('reset-search');



//////////////////////هذا عشان ترتيب حسب التاريخ
document.getElementById("sort-button").addEventListener("click", () => {
  const cardContainer = document.getElementById("card-container");
  const cards = Array.from(cardContainer.children);

  cards.sort((a, b) => {
      const nameA = a.querySelector(".card-date")?.textContent.toUpperCase() || "";
      const nameB = b.querySelector(".card-date")?.textContent.toUpperCase() || "";
      return nameA.localeCompare(nameB);
  });

  cardContainer.innerHTML = "";
  cards.forEach(card => cardContainer.appendChild(card));
});
  /////////////////////////////////////////هذا عشان ترتيب بالاسم
  document.getElementById("sort-buttons").addEventListener("click", () => {
    const cardContainer = document.getElementById("card-container");
    const cards = Array.from(cardContainer.children);
    cards.sort((a, b) => {
        const nameA = a.querySelector(".card-name")?.textContent.toUpperCase() || "";
        const nameB = b.querySelector(".card-name")?.textContent.toUpperCase() || "";
        return nameA.localeCompare(nameB);
    });
    cardContainer.innerHTML = "";
    cards.forEach(card => cardContainer.appendChild(card));
  });

  /////////////////////////////////////////////////////////////////////


  let editTarget = null;

  const colors = ["#012e4d", "#012e4d"];
  loadCardsFromLocalStorage();


  addButton.addEventListener('click', openModal);
  cancelButton.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  saveButton.addEventListener('click', () => {
      const name = document.getElementById('name').value;
      const description = document.getElementById('description').value;
      const date = document.getElementById('date').value;

      if (!name || !description || !date) {
          alert('All fields are required!');
          return;
      }

      if (editTarget) {
          editTarget.querySelector('.card-name').textContent = name;
          editTarget.querySelector('.card-description').textContent = description;
          editTarget.querySelector('.card-date').textContent = date;
          editTarget = null;
      } else {
          createCard(name, description, date);
      }
      saveCardsToLocalStorage();

      closeModal();
  });

  searchBar.addEventListener('input', function () {
    const searchQuery = searchBar.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const cardName = card.querySelector('.card-name').textContent.toLowerCase();
        card.style.display = cardName.includes(searchQuery) ? 'block' : 'none';
    });
  });

  resetSearchButton.addEventListener('click', () => {
    searchBar.value = '';
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.style.display = 'block');
  });

  function generateRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  function openModal() {
    document.getElementById('name').value = ''; 
    document.getElementById('description').value = '';
    document.getElementById('date').value = '';
    modal.classList.add('active'); 
    overlay.classList.add('active'); 
  }

  function closeModal() {
    modal.classList.remove('active');
    overlay.classList.remove('active'); 
    editTarget = null;
  }
  function createCard(name, description, date) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.style.backgroundColor = generateRandomColor();
    

    const cardContent = `
        <h4 class="card-name">${name}</h4>
        <p class="card-description">${description}</p>
        <p class="card-date">${date}</p>
        <div class="card-buttons">
     <div class="card-buttons">
            <button class="edit-button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
</svg></button>
            <button class="complete-button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
</svg></button>
            <button class="delete-button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg></button>
        </div>
        

    `;
    card.innerHTML = cardContent;
    


    card.querySelector('.edit-button').addEventListener('click', () => {
        editTarget = card;
        document.getElementById('name').value = card.querySelector('.card-name').textContent;
        document.getElementById('description').value = card.querySelector('.card-description').textContent;
        document.getElementById('date').value = card.querySelector('.card-date').textContent;
        openModal();
    });

    card.querySelector('.complete-button').addEventListener('click', () => {
        card.classList.toggle('completed');
        const cardData = { name, description, date, color: card.style.backgroundColor };

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(cardData);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        card.remove();
        saveCardsToLocalStorage();
        alert("Task added to the task list!");
          
    });

    card.querySelector('.delete-button').addEventListener('click', () => {
        moveCardToArchive(card);
        card.remove();

        saveCardsToLocalStorage();
    });
  

    cardContainer.appendChild(card);
  }
  function moveCardToArchive(card) {
    const archivedCards = JSON.parse(localStorage.getItem('archivedCards')) || [];
    const cardData = {
        name: card.querySelector('.card-name').textContent,
        description: card.querySelector('.card-description').textContent,
        date: card.querySelector('.card-date').textContent,
        color: card.style.backgroundColor
    };
    archivedCards.push(cardData);
    localStorage.setItem('archivedCards', JSON.stringify(archivedCards));
}

  ////////هذا الكود عشان لما ارجع من صفحه الارشيف الاقيهم موجودين الديفات
  function saveCardsToLocalStorage() {
    const cards = document.querySelectorAll('.card');
    const cardData = Array.from(cards).map(card => ({
        name: card.querySelector('.card-name').textContent,
        description: card.querySelector('.card-description').textContent,
        date: card.querySelector('.card-date').textContent,
        color: card.style.backgroundColor
    }));
    localStorage.setItem('dashboardCards', JSON.stringify(cardData));
}
function loadCardsFromLocalStorage() {
    const savedCards = JSON.parse(localStorage.getItem('dashboardCards')) || [];
    savedCards.forEach(card => {
        createCard(card.name, card.description, card.date, card.color);
    });
}
window.addEventListener('beforeunload', saveCardsToLocalStorage);
createCard("Home Page", "Make sure sponsors are indicated for Tech Talk.", "Jan 16");
/////////////////////////////////////////////////////////////////////////////////////////
});
  
  
