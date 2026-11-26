import {  createSlice, createAsyncThunk } from '@reduxjs/toolkit';



export const fetchAllProducts = createAsyncThunk('products/fetchProducts', 
        async () =>{
            const response = await fetch("https://dummyjson.com/products?limit=500&skip=0");
            if (!response.ok) throw new Error(`Request failed: ${response.status}`);
            const data = await response.json();
            return data.products;
        },
        {
          condition: (_, { getState }) => {
          const status = getState().products.status;
          // skip if a request is in flight, or the products are already loaded
          return status !== 'loading' && status !== 'succeeded';
          },
         }
)


const initData = {
  products: [],
  status: 'idle',   // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const productsSlice = createSlice({
    name:'products',
    initialState:initData,
    reducers:{},
    extraReducers:(builder) => {
          builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
        state.status = 'succeeded';
        state.error = null;
    })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const selectAllProducts = (state) => state.products.products;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
export default productsSlice.reducer;
