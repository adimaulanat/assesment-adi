import axios from "axios";
import { stringify } from "query-string";
import config from "utils/config";

const client = axios.create({
    baseURL: config?.api?.baseUrl || "",
});

const useProduct = () => {
    const getProduct = (params) => {
        client.get(`/product/search?${stringify(params)}`).then((res) => {
            return res;
        });
    };

    const getProductCategory = () => {
        client.get(`/category-product/list`).then((res) => {
            return res;
        });
    };

    return {
        getProduct,
        getProductCategory,
    };
};

export default useProduct;
