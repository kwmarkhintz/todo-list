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
    
}

let view = {
    displayTodos: function() {
        //Finds the UL and empties it to avoid duplicates
        let todosUl = document.querySelector('ul')
        todosUl.innerHTML = ''
        
        //checks if the todo list is empty
        if(todoList.myTodos == '') {
            console.log('Todo List is Empty')
        
        } else {
            
            //creates a list element for each todo in the array
            for(var i = 0; i < todoList.myTodos.length; i++) {
                let todosLi = document.createElement('li')
                let todo = todoList.myTodos[i]
                
                //checks if the todo is completed and then assigns todo text to li so it displays in the DOM
                if(todo.completed === true) {
                    todosUl.appendChild(todosLi)
                    todosLi.textContent = '(X) ' + todoList.myTodos[i].todoName
                } else {
                    todosUl.appendChild(todosLi)
                    todosLi.textContent = '( ) ' + todoList.myTodos[i].todoName
                }
            }
        }
    }
}