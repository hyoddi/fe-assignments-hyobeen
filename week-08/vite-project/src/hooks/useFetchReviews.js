import { useEffect, useState } from "react";

function useFetchReviews(productId) {
    const [reviews, setReviews] = useState([]);
    const [isReviewsLoading, setIsReviewsLoading] = useState(true);
    const [isReviewsError, setIsReviewsError] = useState(false);

    useEffect(() => {
        async function fetchReviews() {
            try {
                setIsReviewsLoading(true);

                const response = await fetch("http://localhost:3000/reviews");

                if (!response.ok) {
                    throw new Error();
                }

                const json = await response.json();

                const filteredReviews = json.filter((review) => {
                    return review.productId === productId;
                });

                console.log(filteredReviews);

                setReviews(filteredReviews);
                setIsReviewsLoading(false);
            } catch {
                setIsReviewsError(true);
                setIsReviewsLoading(false);
            }
        }

        fetchReviews();
    }, [productId]);

    return {
        reviews,
        isReviewsLoading,
        isReviewsError,
    };
}

export default useFetchReviews;
