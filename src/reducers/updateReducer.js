const UPDATE_JSON = 'UPDATE_JSON'
const FETCH_JSON_SUCCESS = 'FETCH_JSON_SUCCESS'

const updatedState = {
    jsonData: []
}

const updateReducer = (state = updatedState, action) => {
    const { key, value } = action  
    switch(action.type) {
        case FETCH_JSON_SUCCESS:            
            return {  
            ...state,            
            loading: false,
            jsonData: action.payload,
            error: '',
            updating: false
            }
        case UPDATE_JSON:
            console.log("Inside Update Reducer ==== ");
            
            console.log("Key ==== " + key);
            console.log("Value ==== " + value);
            console.log(key.toString().replace("root.", ""));
        
            return {...state, jsonData: {
                        ...state.jsonData,
                        [key.toString().replace("root.", "")]: value
            }}

                //   // return {...state, jsonData: {
      //   //                     ...state.jsonData,
      //   //                     [key]: value
      //   //         }, updating: false}

            // return Object.assign({}, state, {[key]: value});
      
      default:
          return state;  
    }
  };
  
  export default updateReducer;