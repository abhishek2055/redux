const redux = require('redux')
const createStore = redux.createStore

const bindActionCreators = redux.bindActionCreators

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'


function orderCake() {
    return {
        type: CAKE_ORDERED,
        quantity: 1
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

//(previousState, action) => newState

const initialState = {
    numOfCakes: 10,
    numOfIcecream: 20,
    anotherProperty: 0,
}

const reducer = (state = initialState , action) =>{
    switch(action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes -1,
                anotherProperty: state.anotherProperty+1,

            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload,

            }
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
 
const store = createStore(reducer)
console.log('initial state',store.getState())

const unsubscribe = store.subscribe(()=>{
    console.log('update state',store.getState())
})

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(10))

const action = bindActionCreators({orderCake,restockCake,orderIcecream,restockIcecream},store.dispatch)
action.orderCake()
action.orderCake()
action.restockCake(23)

action.orderIcecream(2)
action.orderIcecream(4)
action.restockIcecream(11)



unsubscribe()

