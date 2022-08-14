const LOAD_CHANNELS = 'channels/LOAD'
const CREATE_CHANNEL = 'channel/CREATE'

const load_channels = channels => ({
    type: LOAD_CHANNELS,
    payload: channels
})

const create_channel = channel => ({
    type: CREATE_CHANNEL,
    payload: channel
})

export const getAllChannels = () => async dispatch => {
    const response = await fetch('/api/channels')

    if (response.ok) {
        const channels = await response.json()
        dispatch(load_channels(channels))
    }
}

export const createChannel = data => async dispatch => {
    const response = await fetch(`/api/channels/new`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })

    if(response.ok){
        const channel = await response.json()
        dispatch(create_channel(channel))
        return channel
    }
  }

const initialState = {}

export default function reducer(state = initialState, action) {
    let newState = {...state}
    switch (action.type) {
        case LOAD_CHANNELS:
            action.payload.channels.forEach(channel => {
                newState[channel.id] = channel
            })
        return newState

        case CREATE_CHANNEL:
            return {...state, [action.payload.id]: action.payload}

    default:
        return state
    }
}
