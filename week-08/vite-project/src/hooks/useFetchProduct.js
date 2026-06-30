import { useState, useEffect } from "react";

function useFetchProduct(productId) {
    const [product, setProduct] = useState(null);
    const [isProductLoading, setIsProductLoading] = useState(true);
    const [isProductError, setIsProductError] = useState(false);

    useEffect(() => {
        async function fetchProduct() {
            try {
                setIsProductLoading(true);
                setIsProductError(false);

                const response = await fetch(
                    // _embed=reviews를 붙이면 상품 1개와 연결된 리뷰 목록이 reviews 배열로 같이 들어옴
                    `http://localhost:3000/products/${productId}?_embed=reviews`
                );

                if (!response.ok) {
                    throw new Error("");
                }

                const json = await response.json();

                setProduct(json);
                setIsProductLoading(false);
            } catch {
                setIsProductError(true);
                setIsProductLoading(false);
            }
        }

        fetchProduct();
    }, [productId]);

    return {
        product,
        isProductLoading,
        isProductError,
    };
}

export default useFetchProduct;
