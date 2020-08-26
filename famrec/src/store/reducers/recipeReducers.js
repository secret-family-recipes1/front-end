import {FETCHING_RECIPES_START, 
    FETCH_RECIPES_SUCCESS, 
    FETCH_RECIPES_FAILURE, 
    FETCH_INGREDIENTS_SUCCESS,
    FETCH_INSTRUCTIONS_SUCCESS
    } from '../actions/recipeActions'


const initialState = {
    recipes: [],
    loading: false,
    errors: '',
    ingredients: '',
    instructions: '',
}

// Reducer for recipe actions
export const recipeReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_RECIPES_START: 
        return {
            ...state,
            loading: true,
            errors: '',
        }
        case FETCH_RECIPES_SUCCESS:
            return {
              ...state,
              loading: false,
              recipes: action.payload,
            };
        case FETCH_RECIPES_FAILURE:
            return {
                ...state,
                loading: false,
                errors: action.payload,
            };
        case FETCH_INGREDIENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                ingredients: action.payload
            }
        case FETCH_INSTRUCTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                instructions: action.payload
            }
        default:
            return state;
    }
}