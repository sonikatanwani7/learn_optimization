import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';

let store = configureStore({reducer:
    {
    products:productsReducer
}
});

export default store;
