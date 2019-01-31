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
    addTodo: document.getElementById('addTodoButton').onclick = function() {
        let addTodoInput = document.getElementById('addTodoInput')
            todoList.addTodo(addTodoInput.value)
            addTodoInput.value = ''
    },
    
    changeTodo: document.getElementById('changeTodoButton').onclick = function() {
        let changeTodoLocation = document.getElementById('changeTodoLocation')
        let changeTodoText = document.getElementById('changeTodoText')
        todoList.changeTodoName(changeTodoLocation.value, changeTodoText.value)
        changeTodoLocation.value = ''
        changeTodoText.value = ''
    },
    
    toggleTodo: document.getElementById('toggleTodoButton').onclick = function() {
        let toggleTodoInput = document.getElementById('toggleTodoInput')
        todoList.toggleTodo(toggleTodoInput.value)
        toggleTodoInput.value = ''
    },
    
    toggleTodos: document.getElementById('toggleAllTodosButton').onclick = function() {
        todoList.toggleAll()
    }
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
                let todo = todoList.myTodos[i]
                
                //checks if the todo is completed and then assigns todo text to li so it displays in the DOM
                if(todo.completed === true) {
                    todosLi.textContent = '(X) ' + todoList.myTodos[i].todoName
                } else {
                    todosLi.textContent = '( ) ' + todoList.myTodos[i].todoName
                }
                todosLi.appendChild(this.createDeleteButton())
                todosUl.appendChild(todosLi)
            }
        }
    },
    
    createDeleteButton: function() {
        var deleteButton = document.createElement('button')
        deleteButton.textContent = 'Delete'
        deleteButton.className = 'deleteButton'
        return deleteButton
    }
}