document.addEventListener('DOMContentLoaded', function () {
    const projectContainer = document.getElementById('project-container');
    const createProjectButton = document.getElementById('create-project-button');
    const projectModal = document.getElementById('project-modal');
    const projectNameInput = document.getElementById('project-name');
    const saveProjectButton = document.getElementById('save-project-button');
    const closeProjectModalButton = document.getElementById('close-project-modal');
    let activeProject = null;

    // Load projects from localStorage when the page loads
    loadProjects();

    createProjectButton.addEventListener('click', () => {
        projectNameInput.value = '';
        projectModal.classList.add('active');
    });

    closeProjectModalButton.addEventListener('click', () => {
        projectModal.classList.remove('active');
    });

    saveProjectButton.addEventListener('click', (event) => {
        event.preventDefault();
        const projectName = projectNameInput.value.trim();

        if (!projectName) {
            alert('Project name is required!');
            return;
        }

        createProject(projectName);
        projectModal.classList.remove('active');
        saveProjects(); 
    });

  
    function createProject(name) {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');

        projectDiv.innerHTML = `
            <div class="project-header">
            <div class="control-divs">
                <h3 class="project-name">${name}</h3>
                </div>
                <div class="control-div">
                <button class="add-card-button">+ Add Task</button>
                <button class="delete-project-button">Delete</button>
                </div>
            </div>
            <div class="project-content">
                <div class="project-section" id="todo-section">
                    <h4>To Do</h4>
                    <div class="task-list"></div>
                </div>
                <div class="project-section" id="inprogress-section">
                    <h4>In Progress</h4>
                    <div class="task-list"></div>
                </div>
                <div class="project-section" id="completed-section">
                    <h4>Completed</h4>
                    <div class="task-list"></div>
                </div>
            </div>
        `;

        const addCardButton = projectDiv.querySelector('.add-card-button');
        addCardButton.addEventListener('click', () => {
            activeProject = projectDiv;
            openTaskModal(); 
        });

        const deleteProjectButton = projectDiv.querySelector('.delete-project-button');
        deleteProjectButton.addEventListener('click', () => {
            deleteProject(projectDiv);
        });

        projectContainer.appendChild(projectDiv);
    }

    function deleteProject(projectDiv) {
        projectDiv.remove();
        saveProjects();
    }

    const taskModal = document.getElementById('task-modal');
    const taskNameInput = document.getElementById('task-name');
    const taskDescriptionInput = document.getElementById('task-description');
    const saveTaskButton = document.getElementById('save-task-button');
    const closeTaskModalButton = document.getElementById('close-task-modal');

    function openTaskModal() {
        taskNameInput.value = '';
        taskDescriptionInput.value = '';
        taskModal.classList.add('active');
    }

    closeTaskModalButton.addEventListener('click', () => {
        taskModal.classList.remove('active');
    });

    saveTaskButton.addEventListener('click', () => {
        const taskName = taskNameInput.value.trim();
        const taskDescription = taskDescriptionInput.value.trim();

        if (!taskName || !taskDescription) {
            alert('Task name and description are required!');
            return;
        }

        const taskCard = document.createElement('div');
        taskCard.classList.add('task-card');
        taskCard.innerHTML = `
            <h5 class="task-name">${taskName}</h5>
            <p class="task-description">${taskDescription}</p>
            <div class="task-actions">
                <button class="move-to-progress">In Progress</button>
                <button class="move-to-complete">Complete</button>
                <button class="delete-task-button">Delete</button>
            </div>
        `;

        const moveToProgressButton = taskCard.querySelector('.move-to-progress');
        moveToProgressButton.addEventListener('click', () => {
            const progressSection = activeProject.querySelector('#inprogress-section .task-list');
            progressSection.appendChild(taskCard);
            moveToProgressButton.remove();
            saveProjects();

        });

        const moveToCompleteButton = taskCard.querySelector('.move-to-complete');
        moveToCompleteButton.addEventListener('click', () => {
            const completeSection = activeProject.querySelector('#completed-section .task-list');
            completeSection.appendChild(taskCard);
            taskCard.querySelector('.task-actions').remove();
            saveProjects();
 
        });

        const deleteTaskButton = taskCard.querySelector('.delete-task-button');
        deleteTaskButton.addEventListener('click', () => {
            deleteTask(taskCard);
            saveProjects();

        });

        const todoSection = activeProject.querySelector('#todo-section .task-list');
        todoSection.appendChild(taskCard);
        taskModal.classList.remove('active');
        saveProjects();
    });
    function deleteTask(taskCard) {
        taskCard.remove();
        saveProjects();
    }

    function saveProjects() {
        const projects = [];
        const allProjects = document.querySelectorAll('.project');

        allProjects.forEach(project => {
            const projectName = project.querySelector('.project-name').innerText;
            const todoTasks = getTasksFromSection(project.querySelector('#todo-section .task-list'));
            const inProgressTasks = getTasksFromSection(project.querySelector('#inprogress-section .task-list'));
            const completedTasks = getTasksFromSection(project.querySelector('#completed-section .task-list'));

            projects.push({
                name: projectName,
                todo: todoTasks,
                inProgress: inProgressTasks,
                completed: completedTasks
            });
        });

        localStorage.setItem('projects', JSON.stringify(projects));
    }

    function getTasksFromSection(section) {
        const tasks = [];
        const taskCards = section.querySelectorAll('.task-card');
        taskCards.forEach(card => {
            const taskName = card.querySelector('.task-name').innerText;
            const taskDescription = card.querySelector('.task-description').innerText;
            tasks.push({ taskName, taskDescription });
        });
        return tasks;
    }

    function loadProjects() {
        const savedProjects = JSON.parse(localStorage.getItem('projects'));

        if (savedProjects) {
            savedProjects.forEach(project => {
                createProject(project.name);

                const projectDiv = projectContainer.querySelector('.project:last-child');
                const todoSection = projectDiv.querySelector('#todo-section .task-list');
                const inProgressSection = projectDiv.querySelector('#inprogress-section .task-list');
                const completedSection = projectDiv.querySelector('#completed-section .task-list');

                project.todo.forEach(task => {
                    addTaskToSection(todoSection, task);
                });
                project.inProgress.forEach(task => {
                    addTaskToSection(inProgressSection, task);
                });
                project.completed.forEach(task => {
                    addTaskToSection(completedSection, task);
                });
            });
        }
    }

    function addTaskToSection(section, task) {
        const taskCard = document.createElement('div');
        taskCard.classList.add('task-card');
        taskCard.innerHTML = `
            <h5 class="task-name">${task.taskName}</h5>
            <p class="task-description">${task.taskDescription}</p>
            <div class="task-actions">
                <button class="move-to-progress">In Progress</button>
                <button class="move-to-complete">Complete</button>
                <button class="delete-task-button">Delete Task</button>
            </div>
        `;
        const deleteTaskButton = taskCard.querySelector('.delete-task-button');
        deleteTaskButton.addEventListener('click', () => {
            deleteTask(taskCard);
        });

        section.appendChild(taskCard);
    }
});
