const LOAD_FAVORITES = "favorites/loadFavorites";
const ADD_FAVORITE = "favorites/addFavorite";
const REMOVE_FAVORITE = "favorites/removeFavorite";

export const loadFavorites = (favorites) => ({
    type: LOAD_FAVORITES,
    payload: favorites
})

export const createFavorites = (favorites) => ({
    type: ADD_FAVORITE,
    payload: favorites
})

export const deleteFavorites = (favoriteId) => ({
    type: REMOVE_FAVORITE,
    payload: favoriteId
})


export const readFavorites = (userId) => async (dispatch) => {
    const response = await fetch(`/api/favorites/${userId}`)
    const favorites = await response.json()
    console.log('favorites', favorites)
    dispatch(loadFavorites(favorites))
}

export const addFavorites = (favorite) => async (dispatch) => {
    const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(favorite)
    })
    if (response.ok) {
        const favorite = await response.json()
        dispatch(createFavorites(favorite))
        console.log('add-favoriate----', favorite)
        return favorite
    }
}
































const initialState = { }

export const favoriteReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        default:
            newState = {...state}
            return newState
    }
}
