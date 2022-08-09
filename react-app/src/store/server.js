const LOAD_SERVERS = 'servers/LOAD'
const CREATE_SERVER = 'server/CREATE'
const UPDATE_SERVER = 'server/UPDATE'

const load_servers = servers => ({
    type: LOAD_SERVERS,
    payload: servers
})

const create_server = server => ({
    type: CREATE_SERVER,
    payload: server
})

const update_server = server => ({
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
    const fData = new FormData();

    fData.append('user_id', data.user_id);
    fData.append('server_name', data.server_name);
    fData.append('server_img', data.server_img);

    const response = await fetch(`/api/servers/new`, {
        method: 'POST',
        body: fData
    })
    if(response.ok){
        const server = await response.json()
        dispatch(create_server(server))
        return server
    }
}

export const updateServer = (data, id) => async dispatch => {
    const fData = new FormData();

    fData.append('user_id', data.user_id);
    fData.append('server_name', data.server_name);
    fData.append('server_img', data.server_img);

    const response = await fetch(`/api/servers/edit/${id}`, {
        method: 'PUT',
        body: fData
    });

    if (response.ok){
        const server = await response.json()
        dispatch(update_server(server))
        return server
    }
};

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
                return {...state, [action.payload.id]: action.payload}

            case UPDATE_SERVER:
                return {...state, [action.payload.id]: action.payload}

            default:
                return state
            }
            }
