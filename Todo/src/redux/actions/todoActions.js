export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";

export const addTodo = (text) => ({
    type: ADD_TODO,
    payload: {
        id: Date.now(),
        text,
        completed: false,
        createdAt: new Date().toISOString(), 
    },
    //   payload: { id: Date.now(), text, completed: false },

});



export const deleteTodo = (id) => ({
    type: DELETE_TODO,
    payload: id,
});

export const updateTodo = (id, text) => ({
    type: UPDATE_TODO,
    payload: { id, text },
});

export const toggleTodo = (id) => ({
    type: TOGGLE_TODO,
    payload: id,
});
