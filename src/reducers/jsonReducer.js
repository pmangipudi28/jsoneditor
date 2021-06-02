const FETCH_JSON_REQUEST = 'FETCH_JSON_REQUEST'
const FETCH_JSON_SUCCESS = 'FETCH_JSON_SUCCESS'
const FETCH_JSON_FAILURE = 'FETCH_JSON_FAILURE'
const CLEAR_JSON = 'CLEAR_JSON'
const UPDATING_JSON = 'UPDATING_JSON'
const UPDATE_JSON = 'UPDATE_JSON'

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
      case UPDATE_JSON:

        // console.log(Array.from(state.jsonData));

       

      // let newElement = new Element({"firstname": "Rajesh Gandhi"})
      // const currentState = Array.from(state.jsonData);
      // const newState = update(currentState, newElement);
      // console.log(newState);


        // const changedIdx = currentState.findIndex((item) => item.key === key);
        // console.log(changedIdx);
        // const newState = [...currentState.slice(0, changedIdx), action.payload, ...currentState.slice(changedIdx + 1)]

        // console.log(state.jsonData);
        // return {...state.jsonData, newState};
        // //return { ...state.jsonData, [key]: {value} };


        const {key, value} = action.payload;
        console.log("Key ==== " + key);
        console.log("Value ==== " + value);

        const currentState = Array.from(state.jsonData);
        
        return {...state, jsonData: {
                            ...state.jsonData,
                            [key]: value
                }, updating: false}

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