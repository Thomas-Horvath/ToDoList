// Bootstrap tooltip megjelenítése
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))




// szelektált elemek
const inputText = document.querySelector('.input-text');
const inputForm = document.querySelector('.input-form');
const list = document.querySelector('.item-list');
const edit = document.querySelector('.edit');
const alertText = document.querySelector('.form-text');



// litaelemek mintájának elkészítése
function listItemTamplate(value, id, success) {
    const li = document.createElement('li');
    li.setAttribute('id', `${id}`);
    li.classList.add('list-group-item', 'list-item', 'd-flex', 'flex-column', 'flex-sm-row', 'align-items-center', 'align-items-md-center', 'gap-md-2');

    // Létrehozzuk a belső <div class="content-wrapper">
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('content-wrapper', 'd-flex', 'flex-column', 'flex-sm-row', 'w-100', 'justify-content-between', 'align-items-center', 'align-items-md-center');

    // Létrehozzuk a <input> elemet
    const input = document.createElement('input');
    input.classList.add('text', 'w-100', 'p-2', 'text-center', 'text-sm-start');
    input.setAttribute('maxlength', '40');
    input.setAttribute('type', 'text');
    input.setAttribute('value', `${value}`);
    input.setAttribute('disabled', 'true');
    input.setAttribute("style", "background : transparent");
    if (success) {
        input.classList.add('line');
    }
    // Hozzáadjuk az <input> elemet a contentWrapper-hez
    contentWrapper.appendChild(input);

    // Létrehozzuk a <div class="button-group">
    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('button-group', 'd-flex', 'gap-2');

    // Létrehozzuk a szerkesztés (<button class="btn btn-warning edit">)
    const editButton = document.createElement('button');
    editButton.classList.add('btn', 'btn-warning', 'edit');
    editButton.setAttribute('data-bs-toggle', 'tooltip');
    editButton.setAttribute('data-bs-placement', 'bottom');
    editButton.setAttribute('data-bs-title', 'Szerkesztés');
    editButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';

    // Létrehozzuk a befejezés (<button class="btn btn-success success">)
    const successButton = document.createElement('button');
    successButton.classList.add('btn', 'btn-success', 'success');
    successButton.setAttribute('data-bs-toggle', 'tooltip');
    successButton.setAttribute('data-bs-placement', 'bottom');
    successButton.setAttribute('data-bs-title', 'Befejezés');
    successButton.innerHTML = '<i class="fa-solid fa-check"></i>';

    // Létrehozzuk a törlés (<button class="btn btn-danger delete">)
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger', 'delete');
    deleteButton.setAttribute('data-bs-toggle', 'tooltip');
    deleteButton.setAttribute('data-bs-placement', 'bottom');
    deleteButton.setAttribute('data-bs-title', 'Törlés');
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

    // Hozzáadjuk a gombokat a buttonGroup-hoz
    buttonGroup.appendChild(editButton);
    buttonGroup.appendChild(successButton);
    buttonGroup.appendChild(deleteButton);

    // Hozzáadjuk a buttonGroup-ot a contentWrapper-hoz
    contentWrapper.appendChild(buttonGroup);

    // Hozzáadjuk a contentWrapper-t a <li> elemhez
    li.appendChild(contentWrapper);



    return li;


};



// feladatlista létrehozás vagy betöltése a localtoragből
const storedTasksList = localStorage.getItem("tasksList");
const tasksList = storedTasksList ? JSON.parse(storedTasksList) : [];


// add new task
function addTask() {
    inputForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let inputValue = inputText.value.trim();

        const newTask = {
            id: 'task-' + (tasksList.length + 1),
            value: inputValue,
            success: false,
        };


        if (inputValue === '') {
            alertText.innerHTML = " Írj be egy új feladatot";
            setTimeout(() => { alertText.innerHTML = "Max. 40 karakter hosszú lehet a bejegyzésed!" }, 2000);
        } else {
            tasksList.push(newTask);
            inputText.value = "";
        }


        // console.log(tasksList);
        renderTasks(tasksList);

    })
};










function renderTasks(tasksList) {
    list.innerHTML = "";
    tasksList.forEach((task, index) => {
        const html = listItemTamplate(task.value, task.id, task.success);
        list.appendChild(html);

        const deleteBtn = document.querySelector(`#${task.id} .delete`);
        deleteBtn.addEventListener('click', () => {
            tasksList.splice(index, 1);
            renderTasks(tasksList);
        });

        const successBtn = document.querySelector(`#${task.id} .success`);
        successBtn.addEventListener('click', () => {
            const input = document.querySelector(`#${task.id} .text`);
            task.success = !task.success;
            input.classList.toggle("line");
            localStorage.setItem("tasksList", JSON.stringify(tasksList));
        });

        const editBtn = document.querySelector(`#${task.id} .edit`);
        editBtn.addEventListener('click', () => {
            const input = document.querySelector(`#${task.id} .text`);
            if (input.disabled) {
                input.disabled = false;
            } else {
                task.value = input.value.trim();
                input.disabled = true;
                localStorage.setItem("tasksList", JSON.stringify(tasksList));
                renderTasks(tasksList);
            }
        });
    });
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
}


renderTasks(tasksList)
addTask()