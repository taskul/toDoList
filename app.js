const toDoList = document.querySelector('.to-do-list')
//load to do items from from last session if they exist
const userToDoItems = JSON.parse(localStorage.getItem('userToDoList'));
if (userToDoItems) {
    createItems(userToDoItems);
}

const form = document.querySelector('.to-do-input-form');
const newItemInput = document.querySelector('.new-item-input');

form.addEventListener('submit', function(event){
    if (!newItemInput.value) return; // prevents from making empty to do lists. 
    console.log(newItemInput);
    event.preventDefault(); // to avoid refreshing the page on submit
    const newItem = document.createElement('li');
    const removeButton = document.createElement('button');
    newItem.textContent = newItemInput.value; // set value of newItem to the text that was passed to input field
    newItem.classList.add('toDo-item')
    removeButton.textContent = 'X'
    removeButton.classList.add('remove-new-item'); //adding new class to a removeButton so we could control style with CSS
    newItem.append(removeButton); // adding a removeButton to a new toDo item
    toDoList.prepend(newItem); // adding toDO item to a toDoList in DOM on the web page.
    newItemInput.value = ''; // reseting the input field / clearing it.
    // form.reset(); would also work.
    // updating localStorage
    checkExistingItems();
})

toDoList.addEventListener('click', function(event){
    if (event.target.tagName === 'BUTTON') {
        event.target.parentElement.remove();
        checkExistingItems();
    } else if (event.target.tagName === 'LI') {
        event.target.classList.toggle('completed-item');
        checkExistingItems();
    }

})

function checkExistingItems () {
    // This function updates the localStorage with curently existing ToDo items
    const allToDos = document.querySelectorAll('.toDo-item');
    const listOfUserToDos = []; // local scope array that will keep track of item objects 
    for (let toDo of allToDos) {
        const liTextOnly = toDo.textContent.replace('X',''); // removing 'X' that comes from a button before passing it as a string.
        listOfUserToDos.push({'text':liTextOnly,'itemClass':toDo.className});
    localStorage.setItem('userToDoList', JSON.stringify(listOfUserToDos));
        }
    }

function createItems (userList) {
    for (let item of userList) {
        // this function creates user ToDo items if localStorage has some data stored. 
        const newListItem = document.createElement('li');
        const removeButton = document.createElement('button');
        newListItem.textContent = item.text;
        newListItem.className = item['itemClass'];
        removeButton.textContent = 'X';
        removeButton.className = 'remove-new-item';
        newListItem.append(removeButton);
        toDoList.append(newListItem);
    }
}
