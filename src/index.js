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
    const tasksContainerFirstChild = taskContainerChilds[0];

    if(tasksContainerFirstChild !== taskInput) {
        taskLoadContainer.prepend(taskInput);
        newTaskTitle = document.querySelector('.new-task-title');
        newTaskDescription = document.querySelector('.new-task-description');
        newTaskCancelButton = document.querySelector('.cancel-input');
        newTaskAddButton = document.querySelector('.add-task-input');
        

        newTaskCancelButton.addEventListener('click', () => {
            taskLoadContainer.firstChild.remove();
        });

        newTaskAddButton.addEventListener('click', handleAddTaskClick);
    };

    function handleAddTaskClick() {
        const newTaskElement = addNewTask(newTaskTitle.value, newTaskDescription.value);
        taskLoadContainer.append(newTaskElement);
        taskLoadContainer.firstChild.remove();
        setTaskInLocalStorage(newTaskTitle.value, newTaskDescription.value)
    };
});

function addNewTask(title, description) {
    const articleTask = document.createElement('article');
    articleTask.classList.add('task-container');
    articleTask.innerHTML = `
    <input type="checkbox" name="check-task" id="check-task">
    <h3 class="task-title">${title}</h3>
    <p class="task-description">${description}</p>
    <div class="task-container__actions">
        <img class="task-container__actions__edit" src="./assets/icons/edit-icon.svg" alt="Edit task" width="20px">
        <img class="task-container__actions__delete" src="./assets/icons/trash-icon.svg" alt="Delete task" width="20px">
    </div>`;

    return articleTask
};

taskLoadContainer.addEventListener('click', (event) => {
    const taskArticle = event.target.classList.contains('task-container');

    if(event.target.classList.contains('task-container__actions__delete')) {
        if(isTaskDeleted()) {
            const taskTarget = event.target.closest('.task-container');
            const taskTargetChildren = taskTarget.children;
            deleteTaskFromStorage(taskTargetChildren[1].textContent);
            taskTarget.remove();
        }
    }

    if(event.target.classList.contains('task-container__actions__edit')) {
        const taskContainer = event.target.closest('.task-container');
        console.log(taskContainer)
        const taskFormHtml = editTask(taskContainer);

        taskFormHtml.addEventListener('click', (event) => {
            event.preventDefault();
            if(event.target.classList.contains('edit-task-cancel-button')) {
                // I'm stuck here, god dammit
            }
        });
    }
});

function isTaskDeleted() {
    const userRespond = window.confirm('Are you sure you want to delete this task?');

    return userRespond
};

function editTask(taskParent) {
    const parentElement = taskParent;
    const taskContainerChildren = taskParent.children;
    const taskTitle = taskContainerChildren[1];
    const taskDescription = taskContainerChildren[2];
    const taskIcons = taskParent.closest('.task-container__actions');

    let newTitleContent = '';
    let newDescriptionContent = '';

    const editTaskForm = `
    <form class="edit-task-form">
        <input type="text" value="${taskTitle.textContent}">
        <input type="text" value="${taskDescription.textContent}">
        <div>
            <button class"edit-task-cancel-button">Cancel</button>
            <button class"edit-task-save-button">Save</button>
        </div>
    </form>
    `

    taskParent.innerHTML = editTaskForm;

    return taskParent
}

function setTaskInLocalStorage(title, description) {
    let tasksArray = JSON.parse(localStorage.getItem('tasks') || '[]');
    
    tasksArray.push({
        title: title,
        description: description
    });

    localStorage.setItem(`tasks`, JSON.stringify(tasksArray));
}

function loadTasks() {
    const userTasks = JSON.parse(localStorage.getItem('tasks'));

    if(userTasks.length) {
        userTasks.forEach((element) => {  
            taskLoadContainer.append(addNewTask(element.title, element.description));
        });
    }
}

function deleteTaskFromStorage(taskTitle) {
    const tasksArray = JSON.parse(localStorage.getItem('tasks') || '[]');
    
    const updateTasksArray = tasksArray.filter((element) => element.title !== taskTitle);

    localStorage.clear()
    localStorage.setItem('tasks', JSON.stringify(updateTasksArray));
}

loadTasks()