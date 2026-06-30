import { useParams } from "react-router";

const ProductDetail = () => {
    const {productId} = useParams();
    // URL 경로(Path Parameter)에 들어있는 값을 가져오는 Hook

    return <div>Product Detail: {productId}</div>
};

export default ProductDetail;