const LOAD_SERVERS = 'servers/LOAD'

const load_servers = servers => ({
    type: LOAD_SERVERS,
    payload: servers
})

export const getAllServers = () => async dispatch => {
    const response = await fetch('/api/servers')

    if (response.ok) {
        const servers = await response.json()
        dispatch(load_servers(servers))
    }
}

const initialState = {}

export default function reducer(state = initialState, action) {
    let newState = {...state}
    switch (action.type) {
        case LOAD_SERVERS:
            action.payload.servers.forEach(server => {
                newState[server.id] = server
            })
        return newState

    default:
        return state
    }
}
