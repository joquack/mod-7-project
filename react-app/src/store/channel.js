const LOAD_CHANNELS = 'channels/LOAD'

const load_channels = channels => ({
    type: LOAD_CHANNELS,
    payload: channels
})

export const getAllChannels = () => async dispatch => {
    const response = await fetch('/api/channels')

    if (response.ok) {
        const channels = await response.json()
        dispatch(load_channels(channels))
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

    default:
        return state
    }
}
