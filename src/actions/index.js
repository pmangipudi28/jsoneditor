const FETCH_JSON_REQUEST = 'FETCH_JSON_REQUEST'
const FETCH_JSON_SUCCESS = 'FETCH_JSON_SUCCESS'
const FETCH_JSON_FAILURE = 'FETCH_JSON_FAILURE'
const CLEAR_JSON = 'CLEAR_JSON'
const UPDATING_JSON = 'UPDATING_JSON'
const UPDATE_JSON = 'UPDATE_JSON'

export const fetch_json_request = () => {
    return {
        type: FETCH_JSON_REQUEST
    }
}

export const fetch_json_success = data => {
    return {
        type: FETCH_JSON_SUCCESS,
        payload: data
    }
}

export const fetch_json_failure = error => {
    return {
        type: FETCH_JSON_FAILURE,
        payload: error
    }
}

export const clear_json = () => {
    return {
        type: CLEAR_JSON
    }
}

export const updating_json = () => {
    return {
        type: UPDATING_JSON
    }
}

export const update_json = (key, value) => { 
    return {
        type: UPDATE_JSON,
        key: key,
        value: value
    }
}