const redux = require('redux')
const createStore = redux.createStore

const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers


const applyMiddleware = redux.applyMiddleware
const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()




const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'

const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'

function orderCake(qty=1) {
    return {
        type: CAKE_ORDERED,
        payload: qty,
    }
}

function restockCake(qty = 1){
    return {
        type: CAKE_RESTOCKED,
        payload: qty,

    }
}
function orderIcecream(qty=1) {
    return {
        type: ICECREAM_ORDERED,
        payload: qty
    }
}

function restockIcecream(qty=1) {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty
    }
}

const cakeInitialState = {
    numOfCakes: 10,
}
const icecreamInitialState = {
    numOfIcecream: 10,
}

const cakeReducer = (state = cakeInitialState , action)=>{
    switch(action.type){
        case CAKE_ORDERED:
            return{
                ...state,
                numOfCakes: state.numOfCakes - action.payload, 

            }

        case CAKE_RESTOCKED:
            return{
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }
        default:
            return state
    }
}

const icecreamReducer = (state = icecreamInitialState , action)=>{
    switch(action.type){
        case ICECREAM_ORDERED:
            return{
                ...state,
                numOfIcecream: state.numOfIcecream - action.payload, 

            }
        case ICECREAM_RESTOCKED:
            return{
                ...state,
                numOfIcecream: state.numOfIcecream + action.payload
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: icecreamReducer,
})

const store = createStore(rootReducer,applyMiddleware(logger))
console.log('Initial State ',store.getState());

const unsubscribe = store.subscribe(()=>{
    // console.log('update state',store.getState())
})

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(10))

const action = bindActionCreators({orderCake,restockCake,orderIcecream,
    restockIcecream},store.dispatch)
action.orderCake(2)
action.orderCake(2)
action.restockCake(23)

action.orderIcecream(2)
action.orderIcecream(4)
action.restockIcecream(11)



unsubscribe()
