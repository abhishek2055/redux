const redux = require('redux')
const createStore = redux.createStore

const produce = require('imer').produce

const initialState = {
    name: 'abhishek',
    address: {
        street: "123 AFC KKKN",
        city: 'butwal',
        state: 'Lumnini'
    }
}

const STREET_UPDATED = 'STREET_UPDATED'

const updateStreet = (street) =>{
    return{
        type: STREET_UPDATED,
        payload: street
    }

}

const reducer = (state = initialState , action)=>{
    switch(action.type) {
        case STREET_UPDATED:
        //     return {
        //         ...state,
        //         address: {
        //             ...state.address,
        //             street: action.payload
        //         }
        // }
        return produce(state,(draft)=>{
            draft.address.street = action.payload
        })
        default:
            return state
    }
}

const store = createStore(reducer)
console.log('initial state', store.getState());

const unsubscribe = store.subscribe(()=>{
    console.log('updated state', store.getState());
})
store.dispatch(updateStreet('saljhandi'))

unsubscribe()

