const UPDATE_JSON = 'UPDATE_JSON'

export const update_json = (key, value) => { 
    return {
        type: UPDATE_JSON,
        key: key,
        value: value
    }
}