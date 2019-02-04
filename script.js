let todoList = {
	myTodos: [],

    addTodo: function(todoText) {
        this.myTodos.push({
            todoName: todoText,
            completed: false
        })
      view.displayTodos()
    },

    changeTodoName: function(todoPosition, changedTodo){
        this.myTodos[todoPosition].todoName = changedTodo
        view.displayTodos()
    },

    deleteTodo: function(todoPosition) {
        this.myTodos.splice(todoPosition, 1)
        view.displayTodos()
    },
    
    toggleTodo: function(position) {
        var todo = this.myTodos[position]
        todo.completed = !todo.completed
        view.displayTodos()
    },
    
    toggleAll: function() {
        var completedTodos = 0
        var totalTodos = this.myTodos.length
        
        for(var i = 0; i < totalTodos; i++) {
            if(this.myTodos[i].completed === true) {
                completedTodos++
            }
        }
        
        if(completedTodos === totalTodos) {
            for(var i = 0; i < totalTodos; i++) {
                this.myTodos[i].completed = false
            }
        } else {
            for(var i = 0; i < totalTodos; i++) {
                this.myTodos[i].completed = true
            }
        }
        view.displayTodos()
        completedTodos = 0
    }
}

let handlers = {
    addTodo: document.getElementById('addTodoInput').addEventListener('keyup', function(event) {
        let addTodoInput = document.getElementById('addTodoInput')
        if(event.keyCode === 13) {
            todoList.addTodo(addTodoInput.value)
            addTodoInput.value = ''
        }
    }),
    
    changeTodo: document.getElementById('changeTodoButton').onclick = function() {
        let changeTodoLocation = document.getElementById('changeTodoLocation')
        let changeTodoText = document.getElementById('changeTodoText')
        todoList.changeTodoName(changeTodoLocation.value, changeTodoText.value)
        changeTodoLocation.value = ''
        changeTodoText.value = ''
    },
    
    toggleTodos: document.getElementById('toggleAllTodosButton').onclick = function() {
        todoList.toggleAll()
    },
}

let view = {
    displayTodos: function() {
        //Finds the UL and empties it to avoid duplicates
        let todosUl = document.querySelector('ul')
        todosUl.innerHTML = ''
        
        //checks if the todo list is empty
        if(todoList.myTodos == '') {
            let todosLi = document.createElement('li')
            todosUl.appendChild(todosLi)
            todosLi.textContent = 'Todo List is Empty'
        
        } else {
            
            //creates a list element for each todo in the array
            for(var i = 0; i < todoList.myTodos.length; i++) {
                let todosLi = document.createElement('li')
                let todosInput = document.createElement('input')
                let todo = todoList.myTodos[i]
                
                //checks if the todo is completed and then assigns todo text to li so it displays in the DOM
                if(todo.completed === true) {
                    todosLi.textContent = '(X) ' + todoList.myTodos[i].todoName
                } else {
                    todosLi.textContent = '( ) ' + todoList.myTodos[i].todoName
                }
                todosLi.appendChild(this.createDeleteButton())
                todosLi.appendChild(this.createEditButton())
                todosLi.appendChild(this.createToggleButton())
                todosUl.appendChild(todosLi)
                todosUl.appendChild(todosInput)
                todosInput.setAttribute('hidden', 'true')
                todosLi.id = i
                todosInput.id = i
            }
        }
    },
    
    createDeleteButton: function() {
        let deleteButton = document.createElement('button')
        deleteButton.textContent = 'Delete'
        deleteButton.className = 'deleteButton'
        return deleteButton
    },
    
    createEditButton: function() {
        let editButton = document.createElement('button')
        editButton.textContent = 'Edit'
        editButton.className = 'editButton'
        return editButton
    } ,
    
    createToggleButton: function() {
        let toggleButton = document.createElement('button')
        toggleButton.textContent = '√'
        toggleButton.className = 'toggleButton'
        return toggleButton
    } 
}

    let todoUl = document.querySelector('ul')
    todoUl.addEventListener('click', function(event) {

    let elementClicked = event.target

    if(elementClicked.className === 'deleteButton') {
        todoList.deleteTodo(elementClicked.parentNode.id)
        
    } else if (elementClicked.className === 'toggleButton') {
        todoList.toggleTodo(elementClicked.parentNode.id)
    
    }
})

