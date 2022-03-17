import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import useProduct from "hooks/use-product";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Navbar = () => {
    const router = useRouter();
    const { per_page } = router.query;
    const { productCategories, parentProductCategory } = useSelector(
        (state) => state.productReducers
    );
    const { getProduct } = useProduct();

    const renderSubMenu = (id) => {
        const menu = productCategories.filter((item) => {
            return item.parent_id === id && item.status !== 0;
        });
        const submenu = menu.map((item) => (
            <Menu.Item
                onClick={() => handleOnClick(item.category_name)}
                key={item.id.toString()}
            >
                {item.category_name}
            </Menu.Item>
        ));
        return submenu;
    };

    function handleOnClick(categoryName = "") {
        getProduct({
            category_name: categoryName,
            page: 1,
            per_page: per_page || 10,
        });
        router.push(
            `?category_name=${categoryName}&per_page=${per_page || 10}&page=1`
        );
    }

    return (
        <>
            <Menu mode="horizontal" className="bg-transparent text-white">
                <SubMenu
                    key={"Home"}
                    title={"Home"}
                    onTitleClick={() => handleOnClick()}
                />
                {parentProductCategory &&
                    parentProductCategory.map((item) => (
                        <SubMenu
                            key={item.id.toString()}
                            title={item.category_name}
                            onTitleClick={() =>
                                handleOnClick(item.category_name)
                            }
                        >
                            {renderSubMenu(item.id)}
                        </SubMenu>
                    ))}
            </Menu>
        </>
    );
};

export default Navbar;
