class TodoList {
    constructor() {
        if (TodoList.instance) {
            return TodoList.instance;
        }

        this.todos = this.getTodosFromStorage();
        this.listElement = document.querySelector('.todolist');
        this.inputElement = document.querySelector('.textarea');
        this.buttonElement = document.querySelector('.buttoninput');

        this.buttonElement.addEventListener('click', (e) => this.handleAddTodo(e));
        this.listElement.addEventListener('click', (e) => this.handleTodoActions(e));
        
        this.loadTodos();

        TodoList.instance = this; // Armazena a instância criada
    }

    handleAddTodo(event) {
        event.preventDefault();
        if (!this.inputElement.value) return;

        const todo = { text: this.inputElement.value, id: Date.now() };
        this.todos.push(todo);
        this.saveTodosToStorage();
        
        const todoElement = TodoFactory.createTodoElement(todo);
        this.listElement.appendChild(todoElement);

        this.inputElement.value = '';
    }

    handleTodoActions(event) {
        const target = event.target;
        const parent = target.closest('.itemall');

        if (!parent) return;
        const todoId = parent.getAttribute('data-id');

        if (target.classList.contains('check-button')) {
            parent.classList.toggle('checklist');
            this.saveTodosToStorage()
        } else if (target.classList.contains('trash-button')) {
            parent.remove();
            this.todos = this.todos.filter(todo => todo.id != todoId);
            this.saveTodosToStorage();
        }
    }

    loadTodos() {
        this.todos.forEach(todo => {
            const todoElement = TodoFactory.createTodoElement(todo);
            this.listElement.appendChild(todoElement);
        });
    }

    getTodosFromStorage() {
        return JSON.parse(localStorage.getItem('todos')) || [];
    }

    saveTodosToStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
}

class TodoFactory {
    static createTodoElement(todo) {
        const itemall = document.createElement('div');
        itemall.classList.add('itemall');
        itemall.setAttribute('data-id', todo.id);

        const item = document.createElement('p');
        item.classList.add('item');
        item.innerText = todo.text;
        itemall.appendChild(item);

        const checkbutton = document.createElement('button');
        checkbutton.innerHTML = '<i class="fa-solid fa-check"></i>';
        checkbutton.classList.add('check-button');
        itemall.appendChild(checkbutton);

        const trashbutton = document.createElement('button');
        trashbutton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        trashbutton.classList.add('trash-button');
        itemall.appendChild(trashbutton);

        return itemall;
    }
}

document.addEventListener('DOMContentLoaded', () => new TodoList());
