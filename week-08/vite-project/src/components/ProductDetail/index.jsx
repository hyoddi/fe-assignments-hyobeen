import { useParams } from "react-router";

import useFetchProduct from "../../hooks/useFetchProduct";
// import useFetchReviews from "../../hooks/useFetchReviews";
import styles from "./ProductDetail.module.css";

const ProductDetail = () => {
    const { productId } = useParams();

    const { product, isProductLoading, isProductError } =
        useFetchProduct(productId);
    // 이전 방식: 상품 정보와 리뷰 정보를 각각 따로 요청하는 방법
    // 지금은 useFetchProduct에서 _embed=reviews로 리뷰까지 같이 받아오므로 사용 X
    // const { reviews, isReviewsLoading, isReviewsError } =
    //     useFetchReviews(productId);

    if (isProductLoading) {
        return <div>상품 정보를 불러오고 있습니다...</div>;
    }

    if (isProductError) {
        return <div>상품 정보를 불러오는 중에 에러가 발생했습니다...</div>;
    }

    return (
        <div>
            <div className={styles.productContainer}>
                <img src={product.image} alt={product.name} />
                <div className={styles.productInfo}>
                    <div className={styles.productCategory}>
                        {product.category}
                    </div>
                    <h2>{product.name}</h2>
                    <div className={styles.productPrice}>
                        {product.price.toLocaleString()}원
                    </div>
                    <button>구매하기</button>
                </div>
            </div>
            <hr />
            <p className={styles.productDesc}>{product.description}</p>
            {/* _embed=reviews로 상품 안에 들어온 reviews 배열 사용 */}
            <h3>리뷰({product.reviews.length})</h3>
            <hr />
            {product.reviews.map((review) => {
                return (
                    <div key={review.id} className={styles.reviewItem}>
                        <div className={styles.reviewHeader}>
                            <div>{review.username}</div>
                            <div>({review.rating}/5)</div>
                        </div>
                        <div className={styles.text}>{review.text}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default ProductDetail;
