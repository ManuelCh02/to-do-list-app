const addTaskButton = document.querySelector('.add-task-button');
const taskLoadContainer = document.querySelector('.tasks__load-task-container');

let newTaskTitle = undefined;
let newTaskDescription = undefined;
let newTaskCancelButton = undefined;
let newTaskAddButton = undefined;

function createTaskInput() {
    const articleElement = document.createElement('article');
    const titleElement = document.createElement('input');
    const descriptionElement = document.createElement('input');
    const cancelTaskButtonElement = document.createElement('button');
    const addTaskButtonElement = document.createElement('button');
    
    titleElement.type = 'text';
    titleElement.placeholder = 'Type Task Name'
    descriptionElement.type = 'text';
    descriptionElement.placeholder = 'Type task description'
    cancelTaskButtonElement.textContent = 'Cancel'
    addTaskButtonElement.textContent = 'Add Task'

    articleElement.append(titleElement, descriptionElement, cancelTaskButtonElement, addTaskButtonElement);

    articleElement.classList.add('new-task-article');
    titleElement.classList.add('new-task-title');
    descriptionElement.classList.add('new-task-description');
    cancelTaskButtonElement.classList.add('cancel-input');
    addTaskButtonElement.classList.add('add-task-input');

    return articleElement
};

addTaskButton.addEventListener('click', () => {
    const taskInput = createTaskInput();
    const taskContainerChilds = taskLoadContainer.children;
    const tasksContainerFirstChild = taskContainerChilds[0] || undefined;

    if(!tasksContainerFirstChild) {
        taskLoadContainer.prepend(taskInput);
        newTaskTitle = document.querySelector('.new-task-title');
        newTaskDescription = document.querySelector('.new-task-description');
        newTaskCancelButton = document.querySelector('.cancel-input');
        newTaskAddButton = document.querySelector('.add-task-input');

        newTaskAddButton.addEventListener('click', () => {
            const newTaskElement = addNewTask(newTaskTitle.value, newTaskDescription.value);
            taskLoadContainer.append(newTaskElement);
        });
    };
});

function addNewTask(title, description) {
    const articleTask = document.createElement('article');
    articleTask.classList.add('task-container');
    articleTask.innerHTML = `
    <input type="checkbox" name="check-task" id="check-task">
    <h3>${title}</h3>
    <p class"task-description">${description}</p>
    <div class="task-container__actions">
        <img src="./assets/icons/eye-icon.svg" alt="Visualice task description" width="20px">
        <img src="./assets/icons/edit-icon.svg" alt="Edit task" width="20px">
        <img src="./assets/icons/trash-icon.svg" alt="Delete task" width="20px">
    </div>`

    return articleTask
};



