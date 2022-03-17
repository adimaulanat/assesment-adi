import axios from "axios";
import { stringify } from "query-string";
import { useDispatch } from "react-redux";
import config from "utils/config";

const client = axios.create({
    baseURL: config?.api?.baseUrl || "",
});

const useProduct = () => {
    const dispatch = useDispatch();
    const getProduct = (params) => {
        dispatch({
            type: "product/SET_LOADING",
        });
        client.get(`/product/search?${stringify(params)}`).then((res) => {
            dispatch({
                type: "product/SET_PRODUCT",
                payload: res?.data,
            });
            return res;
        });
    };

    const getProductCategory = () => {
        dispatch({
            type: "product/SET_LOADING",
        });
        client
            .get(`/category-product/list`)
            .then((res) => {
                dispatch({
                    type: "product/SET_PRODUCT_CATEGORY",
                    payload: res?.data?.data || [],
                });
                return res;
            })
            .catch((e) => {
                dispatch({
                    type: "product/SET_PRODUCT_CATEGORY",
                    payload: [],
                });
                return e;
            });
    };

    return {
        getProduct,
        getProductCategory,
    };
};

export default useProduct;
