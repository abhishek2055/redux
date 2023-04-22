const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')

const initialState = {
    loading: false,
    users: [],
    error: '',

}

const FETCH_USER_REQUESTED = 'FETCH_USER_REQUESTED'
const FETCT_USER_SUCCEEDED = 'FETCT_USER_SUCCEEDED'
const FETCH_USER_FAILED = 'FETCH_USER_FAILED'

const fetchUserRequest = () =>{
    return {
        type: FETCH_USER_REQUESTED,
    }
}

const fetchUserSuccess = users =>{
    return {
        type: FETCT_USER_SUCCEEDED,
        payload: users
    }
}

const fetchUserFailure = error =>{
    return {
        type: FETCH_USER_FAILED,
        payload: error,
    }
}

const reducer = (state=initialState , action) =>{
    switch(action.type){
        case FETCH_USER_REQUESTED:
            return{
                ...state,
                loading: true,
            }
        case FETCT_USER_SUCCEEDED:
            return{
                loading: false,
                users: action.payload,
                error: ''
            }

        case FETCH_USER_FAILED:
            return{
                loading: false,
                users: [],
                error: action.payload
            }
    }
}

const fetchUsers = ()=>{
    return function(dispatch) {
                 dispatch(fetchUserRequest())
                axios.get('https://jsonplaceholder.typicode.com/users').then((response)=>{

                const users = response.data.map((user)=> user.address)
                dispatch(fetchUserSuccess(users))
                }).catch(error =>{
                    //error message
                    dispatch(fetchUserFailure(error.message))
                })
    }
}

const store = createStore(reducer,applyMiddleware(thunkMiddleware))

store.subscribe(()=>{
    console.log(store.getState());
})

store.dispatch(fetchUsers())