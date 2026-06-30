import { useState } from "react";
import { Link } from "react-router";

import styles from "./Home.module.css";
import useFetchProducts from "../../hooks/useFetchProducts";

const Home = () => {
    const { products, isProductsLoading, isProductsError } = useFetchProducts();
    const [selectedCategory, setSelectedCategory] = useState("전체");

    const filteredProducts = products.filter(({category}) => {
        if (selectedCategory === "전체") {
            return true;
        }

        return selectedCategory === category; 
    });

    if (isProductsLoading) {
        return <div>상품 로딩 중...</div>
    }

    if (isProductsError) {
        return <div>상품 목록을 가져오는 중에 에러가 발생했습니다</div>
    }

    return (
        <>
            <ul className={styles.categoryList}>

                {[ "전체", "상의", "하의", "신발", "가방", "악세서리"].map(
                    (category) =>{
                        return (
                            <li key={category}
                                className={
                                    selectedCategory === category ? styles.selected : null
                                }
                                onClick={() => {
                                    setSelectedCategory(category);
                                }}
                            >
                                {category}
                            </li>
                        );
                    }
                )}
            </ul>

            <h3>상품 목록(20)</h3>
            <div className={styles.productList}>
                {filteredProducts.map(({ id, category, image, name, price }) => {
                    return (
                        <Link key={id} to={`/products/${id}`}>
                            <div className={styles.productListItem}>
                                <img src={image} />
                                <div className={styles.productInfo}>
                                    <div className={styles.productCategory}>{category}</div>
                                    <div className={styles.productName}>{name}</div>
                                    <div className={styles.productPrice}>{price.toLocaleString()}원</div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </>
    );
};

export default Home;
