const addTaskButton = document.querySelector('.addTask')

function addTask() {

// dodawanie taska
const todoTask = document.createElement('li');
todoTask.classList.add('list-group-item d-flex justify-content-between align-items-center');


// przycisk usuwania
const todoDelete = document.createElement('button');
todoDelete.classList.add('btn btn-outline-danger btn-sm ml-2 deleteItem');


// tekst
const todoText = document.createElement('textarea');
todoText.classList.add('form-control-plaintext');

// dodawanie tekstu do taska
todoTask.appendChild(todoText);


// dodawanie guzika do taska
todoTask.appendChild(todoDelete);

// wyselektowanie listy na poszczegolnej tablicy
const groupList = document.querySelector('.list-group')

// dodawanie taska do listy
groupList.appendChild(todoTask);

}

function addBoard() {

// dodawanie tablicy
const todoBoard = document.createElement('div');
todoBoard.classList.add('card list-group-flush m-3');

// tworzenie głównej tablicy
const todoMainBoard = document.createElement('div');
todoMainBoard.classList.add('container-fluid mainBoard');

// przycisk usuwania
const todoMainDelete = document.createElement('button');
todoMainDelete.classList.add('btn btn-success m-3 newBoard');

// tekst
const todoTitle = document.createElement('input');
todoTitle.classList.add('form-control-plaintext');

// dodawanie tablicy do strony
todoBoard.appendChild(todoMainBoard);

// dodawanie przycisku do tablicy
todoMainDelete.appendChild(todoBoard);
}


addTaskButton.addEventListener('click', function(e) {
addTask();
})