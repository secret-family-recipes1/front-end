import {FETCHING_RECIPES_START, 
    FETCH_RECIPES_SUCCESS, 
    FETCH_RECIPES_FAILURE, 
    } from '../actions/recipeActions'


const initialState = {
    recipes: [],
    loading: false,
    errors: ''
}

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
                  recpies: []
                };
        default:
            return state;
    }
}