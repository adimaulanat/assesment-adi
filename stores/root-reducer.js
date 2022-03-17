import { combineReducers } from "redux";
import productReducers from "./reducers/product-reducers";

export const rootReducer = combineReducers({
    productReducers,
});
