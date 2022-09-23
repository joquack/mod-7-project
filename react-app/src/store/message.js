const LOAD_MESSAGES = 'messages/LOAD'
const CREATE_MESSAGE = 'message/CREATE'
const UPDATE_MESSAGE = 'message/UPDATE'
const DELETE_MESSAGE = 'message/DELETE'

const load_messages = messages => ({
    type: LOAD_MESSAGES,
    payload: messages
})

const create_message = message => ({
    type: CREATE_MESSAGE,
    payload: message
})

const update_message = message => ({
    type: UPDATE_MESSAGE,
    payload: message
})

const delete_message = messageId => ({
    type: DELETE_MESSAGE,
    payload: messageId
})

export const getAllMessages = () => async dispatch => {
    const response = await fetch('/api/messages')

    if (response.ok) {
        const messages = await response.json()
        dispatch(load_messages(messages))
    }
}

export const createMessage = data => async dispatch => {
    const response = await fetch(`/api/messages/new`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })

    if(response.ok){
        const message = await response.json()
        dispatch(create_message(message))
        return message
    }
}

export const updateMessage = (data, id) => async dispatch => {
    const response = await fetch(`/api/messages/edit/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok){
        const message = await response.json()
        dispatch(update_message(message))
        return message
    }
};

export const deleteMessage = messageId => async dispatch => {
    const response = await fetch(`/api/messages/delete/${messageId}`, {
        method: 'DELETE'
    })

    if(response.ok){
        const deletedMessage = await response.json()
        dispatch(delete_message(deletedMessage))
    }
}

const initialState = {}

export default function reducer(state = initialState, action) {
    let newState = {...state}
    switch (action.type) {
        case LOAD_MESSAGES:
            action.payload.messages.forEach(message => {
                newState[message.id] = message
            })
        return newState

        case CREATE_MESSAGE:
            return {...state, [action.payload.id]: action.payload}

        case UPDATE_MESSAGE:
            return {...state, [action.payload.id]: action.payload}

        case DELETE_MESSAGE:
            delete(newState[action.payload.id])
            return newState

    default:
        return state
    }
}

