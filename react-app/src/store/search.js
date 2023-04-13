const CREATE_SEARCH = "search/create"

const createSearch = (search) => ({
    type: CREATE_SEARCH,
    payload: search
})

export const searchThunk = (search) => async (dispatch) => {
    const response = await fetch(`/api/search/${search}`);

    if (response.ok){
        const data = await response.json()
        // console.log('data', data)
        dispatch(createSearch(data))
        return data
    }

}

const initialState = {}

export const searchReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case CREATE_SEARCH:
            newState= {}
            action.payload.forEach(result =>
                newState[result.id] = result)
                // console.log('action', action.payload)
            return newState
      default:
        return state;
    }
}
