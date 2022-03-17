import { Card, Col, List, Pagination, Row, Skeleton } from "antd";
import Meta from "antd/lib/card/Meta";
import Paragraph from "antd/lib/typography/Paragraph";
import useProduct from "hooks/use-product";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import currency from "utils/currency";

const ProductList = () => {
    const router = useRouter();
    const { page, per_page } = router.query;
    const { getProduct } = useProduct();
    const { loading, products, total } = useSelector(
        (state) => state.productReducers
    );

    const onChange = (page, pageSize) => {
        router.push(
            `?category_name=${router.query["category_name"]}&per_page=${pageSize}&page=${page}`
        );
        getProduct({
            category_name: router.query["category_name"],
            page,
            per_page: pageSize,
        });
    };

    if (products) {
        return (
            <>
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 5,
                        xxl: 3,
                    }}
                    className="p-8 min-h-screen"
                    dataSource={products}
                    renderItem={(item) => (
                        <List.Item>
                            <Card
                                key={item.id.toString()}
                                hoverable
                                style={{ width: 250, borderRadius: 16 }}
                                cover={
                                    <img
                                        alt="example"
                                        src={
                                            item?.images?.length &&
                                            item?.images.length > 0 &&
                                            item?.images[0]
                                        }
                                        className="object-cover h-[200px] rounded-t-2xl"
                                    />
                                }
                                loading={loading}
                            >
                                <Skeleton loading={loading} avatar active>
                                    <Meta
                                        title={item.product_name}
                                        description={
                                            <>
                                                <Row gutter={16}>
                                                    <Col span={12}>
                                                        <Paragraph
                                                            className="text-xs"
                                                            delete={
                                                                item.discount !==
                                                                0
                                                            }
                                                        >
                                                            {currency(
                                                                item.price
                                                            )}
                                                        </Paragraph>
                                                    </Col>
                                                    {item.discount !== 0 && (
                                                        <Col span={12}>
                                                            <Paragraph className="text-xs">
                                                                {currency(
                                                                    item.price -
                                                                        item.price *
                                                                            (item.discount /
                                                                                100)
                                                                )}
                                                            </Paragraph>
                                                        </Col>
                                                    )}
                                                </Row>
                                                <Col span={24}>
                                                    {item.city_name}
                                                </Col>
                                            </>
                                        }
                                    />
                                </Skeleton>
                            </Card>
                        </List.Item>
                    )}
                />
                <Pagination
                    className="mb-4 flex justify-center items-center"
                    current={parseInt(page)}
                    total={total || 0}
                    defaultPageSize={per_page || 10}
                    onChange={onChange}
                />
            </>
        );
    }
    return null;
};

export default ProductList;
