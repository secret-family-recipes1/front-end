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
    .get(`/api/recipes/${recipeId}`)
    .then(res => {
        console.log(res.data)
        dispatch({type:FETCH_RECIPES_SUCCESS, payload: res.data})
    })
    .catch(err => {
        console.log(err)
        dispatch({type:FETCH_RECIPES_FAILURE, payload: err})
    })
}


export const submitEverything = (recipe, ingredient, instruction) => (dispatch) => {

    dispatch({type: FETCHING_RECIPES_START})
    console.log('adding recipe')
    axiosWithAuth()
    .post('/api/recipes', recipe)
    .then(res => {
        console.log(res)
        dispatch({type: FETCH_RECIPES_SUCCESS, payload: res.data})

        console.log(res.data.id)
        const id = res.data.id
        axiosWithAuth()
        .post(`/api/recipes/${res.data.id}/ingredients`, ingredient)
        .then(response => {
            console.log(response)
        })
        axiosWithAuth()
        .post(`/api/recipes/${res.data.id}/instructions`, instruction)
        .then(resp => {
            console.log(resp)
        })
    })
    .catch(err => {
        console.error(err)
        dispatch({type: FETCH_RECIPES_FAILURE, payload: err})
    })
}

export const deleteRecipe = (id) => (dispatch) => {
    console.log('delete recipe by id')
    console.log(id)
    dispatch({type: FETCHING_RECIPES_START })
    axiosWithAuth()
    .delete(`/api/recipes/${id}`)
    .then(res => {
        console.log(res.data)
        dispatch({type:FETCH_RECIPES_SUCCESS, payload: res.data})
    })
    .catch(err => {
        console.log(err)
        dispatch({type:FETCH_RECIPES_FAILURE, payload: err})
    })
}

export const editEverything = (recipe, ingredient, instruction, ingredientId, instructionId) => (dispatch) => {
    dispatch({type: FETCHING_RECIPES_START})
    console.log('editing recipe')
    axiosWithAuth()
    .put(`/api/recipes/${recipe.id}`, recipe)
    .then(res => {
        console.log(res)
        dispatch({type: FETCH_RECIPES_SUCCESS, payload: res.data})
        axiosWithAuth()
        .put(`/api/recipes/${recipe.id}/ingredients/${ingredientId}`, {ingredient: ingredient})
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.error(err)
        })
        axiosWithAuth()
        .put(`/api/recipes/${recipe.id}/instructions/${instructionId}`, {instruction: instruction})
        .then(resp => {
            console.log(resp)
        })
    })
    .catch(err => {
        console.error(err)
        dispatch({type: FETCH_RECIPES_FAILURE, payload: err})
    })
}
