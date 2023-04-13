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

export const addFavorites = (userId, productId) => async (dispatch) => {
    const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: userId,
            product_id: productId
        }),
      });
    if (response.ok) {
        const favorite = await response.json()
        console.log('add-favorite----', favorite)
        dispatch(createFavorites(favorite))
        return favorite
    }
}

export const removeFavorites = (id) => async (dispatch) => {
    const response = await fetch(`/api/favorites/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    if (response.ok) {
        const data = await response.json()
        console.log('DATA-----',data)
        dispatch(deleteFavorites(data))
        return data
    }
}

const initialState = {
    favorites: {}
}

export const favoriteReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        // case LOAD_FAVORITES:
        //     let copy = {}
        //    action.payload.forEach((favorite) => {
        //         console.log('action', action.payload)
        //         copy[favorite.id] = favorite
        //     })
        //     newState.favorites = copy
        //     return newState
        // case ADD_FAVORITE:
        //     // newState = { ...state };
        //     // if (action.payload.Favorite) {
        //     //     newState.favorites[action.payload.id] = action.payload;
        //     // }
        //     // return newState;
        //     newState = {...state, favorites: {...state.favorites}}
        //     newState.favorites[action.payload.id] = action.payload
        //     return newState
        case LOAD_FAVORITES:
            return {
                ...state,
                favorites: [...action.payload]
            }
        case ADD_FAVORITE:
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            }
        case REMOVE_FAVORITE:
            // newState = { ...state };
            // if (newState.favorites[action.payload.id]) {
            //     delete newState.favorites[action.payload.id];
            // }
            // return newState;
            newState = {...state}
            let copy2 = {...newState.favorites}
            delete copy2[action.payload.product_id]
            newState.favorites = copy2
            return newState
        default:
            newState = {...state}
            return newState
    }
}
