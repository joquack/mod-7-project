const LOAD_SERVERS = 'servers/LOAD'

const load_servers = servers => ({
    type: LOAD_SERVERS,
    servers
})

const getAllServers = () => async dispatch => {
    const response = await fetch('/api/servers')

    if (response.ok) {
        const servers = await response.json()
        dispatch(load_servers(servers))
    }
}

const initialState = {}

const serversReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case LOAD_SERVERS:
            action.servers.forEach(server => {
                newState[server.id] = server
            })
        return newState
    }
}

export default serversReducer
