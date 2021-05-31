const FETCH_JSON_REQUEST = 'FETCH_JSON_REQUEST'
const FETCH_JSON_SUCCESS = 'FETCH_JSON_SUCCESS'
const FETCH_JSON_FAILURE = 'FETCH_JSON_FAILURE'
const CLEAR_JSON = 'CLEAR_JSON'
const UPDATING_JSON = 'UPDATING_JSON'

const initialState = {
    loading: false,
    jsonData: [],
    error: '',
    updating: false
}

const jsonReducer = (state = initialState, action) => {
    switch(action.type) {
      case FETCH_JSON_REQUEST:
          return {
              ...state,
              loading: true  
          }          
      case FETCH_JSON_SUCCESS:            
            return {  
              ...state,            
              loading: false,
              jsonData: action.payload,
              error: '',
              updating: false
            }
      case FETCH_JSON_FAILURE:
        return {
            ...state,
            loading: false,
            jsonData: [],
            error: action.payload,
            updating: false
          }
      case UPDATING_JSON:
        return {
            ...state,
            updating: true
          }    
      case CLEAR_JSON:
        return {
            loading: false,
            jsonData: [],
            error: '',
            updating: false
        }    
      default:
          return state;  
    }
  };
  
  export default jsonReducer;