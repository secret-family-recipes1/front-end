import {axiosWithAuth} from '../../utils/axiosWithAuth'

export const FETCHING_RECIPES_START = 'FETCHING_RECIPES_START'
export const FETCH_RECIPES_SUCCESS = 'FETCH_RECIPES_SUCCESS' 
export const FETCH_RECIPES_FAILURE = 'FETCH_RECIPES_FAILURE'
export const TOGGLE_LOGIN = 'TOGGLE_LOGIN'

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

export const toggleLogin = () => (dispatch) => {
    console.log('toggle login')
    dispatch({type: TOGGLE_LOGIN})
}