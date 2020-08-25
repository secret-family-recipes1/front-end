import {axiosWithAuth} from '../../utils/axiosWithAuth'

export const FETCHING_RECIPES_START = 'FETCHING_RECIPES_START'
export const FETCH_RECIPES_SUCCESS = 'FETCH_RECIPES_SUCCESS' 
export const FETCH_RECIPES_FAILURE = 'FETCH_RECIPES_FAILURE'

export const getRecipes = () => (dispatch) => {
    dispatch({type: FETCHING_RECIPES_START})
    axiosWithAuth()
    .get('/api/recipes')
    .then(res => {
        console.log(res.data)
        dispatch({type: FETCH_RECIPES_SUCCESS, payload: res.data})
    })
    .catch(err => {
        console.error(err)
        dispatch({type: FETCH_RECIPES_FAILURE, payload: err})
    })
}

export const addRecipe = (recipe) => (dispatch) => {
    dispatch({type: FETCHING_RECIPES_START})
    console.log('adding recipe')
    axiosWithAuth()
    .post('/api/recipes', recipe)
    .then(res => {
        console.log(res)
        dispatch({type: FETCH_RECIPES_SUCCESS, payload: res.data})
    })
    .catch(err => {
        console.error(err)
        dispatch({type: FETCH_RECIPES_FAILURE, payload: err})
    })
}

export const searchRecipeById = (recipeId) => (dispatch) => {
    console.log('fetch recipe by id')
    dispatch({type: FETCHING_RECIPES_START })
    axiosWithAuth()
    .post(`/api/recipes/${recipeId}`)
    .then(res => {
        console.log(res.data)
        dispatch({type:FETCH_RECIPES_SUCCESS, payload: res.data})
    })
    .catch(err => {
        console.log(err)
        dispatch({type:FETCH_RECIPES_FAILURE, payload: err})
    })
}
