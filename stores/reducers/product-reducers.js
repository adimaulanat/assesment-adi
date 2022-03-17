const initialState = {
    loading: false,
    products: null,
    productCategories: null,
    parentProductCategory: null,
    pagination: null,
};

const productReducers = (state = initialState, action) => {
    switch (action.type) {
        case "product/SET_LOADING":
            return {
                ...state,
                loading: true,
            };
        case "product/SET_PRODUCT":
            return {
                ...state,
                loading: false,
                products: action.payload.data,
                total: action.payload.total,
            };
        case "product/SET_PRODUCT_CATEGORY":
            const parent = action.payload.filter((item) => {
                return item?.parent_id === 0 && item?.status !== 0;
            });
            return {
                ...state,
                loading: false,
                productCategories: action.payload,
                parentProductCategory: parent,
            };
        default:
            return { ...state };
    }
};

export default productReducers;
