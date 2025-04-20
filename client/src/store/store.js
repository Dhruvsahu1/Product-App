import { configureStore } from  "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductsSlice from './admin/products-slice/index';
import ShopProductsSlice from './shop/products-slice';

const store = configureStore({
    reducer:{
        auth: authReducer,
        adminProduct : AdminProductsSlice,
        shopProducts : ShopProductsSlice
    }
})

export default store;