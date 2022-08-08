const LOAD_SERVERS = 'servers/LOAD'
const CREATE_SERVER = 'server/CREATE'

const load_servers = servers => ({
    type: LOAD_SERVERS,
    payload: servers
})

const create_server = server => ({
    type: CREATE_SERVER,
    payload: server
})

export const getAllServers = () => async dispatch => {
    const response = await fetch('/api/servers')

    if (response.ok) {
        const servers = await response.json()
        dispatch(load_servers(servers))
    }
}

export const createServer = data => async dispatch => {
    const response = await fetch(`/api/servers`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })

    if(response.ok){
        const server = await response.json()
        dispatch(create_server(server))
        return server
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

        case CREATE_SERVER:
            return {...state, [action.payload.server.id]: action.payload.server}

    default:
        return state
    }
}
