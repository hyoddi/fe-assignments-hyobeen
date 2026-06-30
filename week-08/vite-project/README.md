---

# 전체 폴더 구조

```jsx
src
├─ App.jsx
├─ main.jsx
├─ index.css
├─ **components**
│  ├─ Layout
│  │  ├─ index.jsx
│  │  └─ Layout.module.css
│  ├─ Home
│  │  ├─ index.jsx
│  │  └─ Home.module.css
│  ├─ ProductDetail
│  │  ├─ index.jsx
│  │  └─ ProductDetail.module.css
│  ├─ About.jsx
│  └─ NotFound.jsx
└─ **hooks**
   ├─ useFetchProducts.js
   ├─ useFetchProduct.js
   └─ useFetchReviews.js
```

컴포넌트는 화면 단위로 `components`에

서버에서 데이터를 가져오는 로직은 재사용하기 쉽도록 `hooks`에 커스텀 훅으로 분리

---

# 실행 방식

React 개발 서버 실행

```
npm run dev
```

json-server 실행

```
npm run json-server
```

`db.json` 파일을 데이터베이스처럼 사용하여 REST API를 제공하는 가짜 백엔드 서버(Mock Server)

`package.json`의 스크립트 중에,

```json
"scripts": {
  "json-server": "json-server -p 3000 -s ./server ./server/db.json",
  "dev": "vite"
}
```

React 앱은 Vite 서버에서 실행, 상품/리뷰 데이터는 `localhost:3000`의 json-server에서 받아온다는 뜻

---

## 1. 라우팅 구조

라우팅은 `App.jsx`에서 관리

```jsx
<Routes>
  <Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/products/:productId" element={<ProductDetail />} />
    <Route path="*" element={<NotFound />} />
  </Route>
</Routes>
```

### 핵심 포인트

`/products/:productId`에서 `:productId`는 동적 URL 파라미터!!

예를 들어 사용자가 아래 주소로 이동하면,

```jsx
/products/32
```

`productId` 값은 `"32"`가 됨

→ 이 값은 상세 페이지에서 `useParams()`로 가져옴

```jsx
const { productId } = useParams();
```

---

## 2. Layout 컴포넌트

`Layout`은 모든 페이지가 공통으로 사용하는 구조

```jsx
import { Link, Outlet } from "react-router";

const Layout = () => {
  return (
    <div>
      <Link to="/">
        <h1>멋사몰</h1>
      </Link>
      **<Outlet />**
    </div>
  );
};
```

`Layout`에 공통 부분을 넣고,

각 페이지는 `<Outlet />` 자리에 들어가게 하는 것이 포인트!

### Outlet?

`<Outlet />`은 **자식 라우트 컴포넌트**가 렌더링되는 자리

즉 현재 주소가 `/`이면 `Home`이 들어가고, `/products/32`이면 `ProductDetail`이 들어간다!

---

## 3. 상품 목록 페이지 흐름

상품 목록 페이지는 `Home` 컴포넌트가 담당

- 상품 목록 데이터 가져오기
- 카테고리 상태 관리
- 선택된 카테고리에 따라 상품 필터링
- 상품 카드를 클릭하면 상세 페이지로 이동

---

## 4. 상품 목록 데이터 가져오기

상품 목록 데이터는 `useFetchProducts` 커스텀 훅에서 가져옴

```jsx
const { products, isProductsLoading, isProductsError } = useFetchProducts();
```

`useFetchProducts.js` 내부에서는 `fetch`를 이용해 상품 목록 API를 호출한다.

```
const response = await fetch("http://localhost:3000/products");
const json = await response.json();

setProducts(json);
```

### 상태값

```
products
isProductsLoading
isProductsError
```

| 상태 | 의미 |
| --- | --- |
| products | 상품 목록 배열 |
| isProductsLoading | 상품 데이터를 불러오는 중인지 |
| isProductsError | 상품 데이터를 불러오다 에러가 났는지 |

---

## 9. 카테고리 필터링

`Home`에서는 선택된 카테고리를 state로 관리한다.

```
const [selectedCategory, setSelectedCategory] = useState("전체");
```

상품 목록은 선택된 카테고리에 따라 필터링된다.

```
const filteredProducts = products.filter(({ category }) => {
  if (selectedCategory === "전체") {
    return true;
  }

  return selectedCategory === category;
});
```

### 동작 방식

- 선택 카테고리가 `"전체"`이면 모든 상품을 보여준다.
- 그 외에는 상품의 `category`와 선택된 카테고리가 같은 상품만 보여준다.

---

## 10. 상품 카드 클릭 시 상세 페이지 이동

상품 목록에서 각 상품은 `Link`로 감싸져 있다.

```
<Link key={id} to={`/products/${id}`}>
  <div className={styles.productListItem}>
    <img src={image} />
    <div>{category}</div>
    <div>{name}</div>
    <div>{price.toLocaleString()}원</div>
  </div>
</Link>
```

### 핵심 포인트

```
to={`/products/${id}`}
```

백틱을 사용해야 `id` 값이 실제로 들어간다.

```
to={"/products/${id}"}
```

이렇게 쓰면 `${id}`가 문자 그대로 들어가기 때문에 잘못된 주소가 된다.

---

## 11. 상품 상세 페이지 흐름

상세 페이지는 `ProductDetail` 컴포넌트가 담당한다.

역할은 다음과 같다.

- URL에서 `productId` 가져오기
- 해당 상품 상세 정보 가져오기
- 상품 이미지, 이름, 가격, 설명 표시
- 상품에 연결된 리뷰 목록 표시

---

## 12. useParams로 productId 가져오기

```
const { productId } = useParams();
```

예를 들어 현재 URL이:

```
/products/43
```

이라면:

```
productId === "43"
```

이 된다.

이 값을 API 요청에 사용한다.

---

## 13. 상품 상세 데이터 가져오기

상품 상세 데이터는 `useFetchProduct` 훅에서 가져온다.

```
const { product, isProductLoading, isProductError } =
  useFetchProduct(productId);
```

API 요청은 다음과 같다.

```
const response = await fetch(
  `http://localhost:3000/products/${productId}?_embed=reviews`
);
```

---

## 14. `_embed=reviews`란?

`?_embed=reviews`는 json-server에서 제공하는 관계 데이터 조회 기능이다.

```
/products/43?_embed=reviews
```

이렇게 요청하면 상품 하나만 가져오는 것이 아니라, 해당 상품과 연결된 리뷰들도 함께 가져온다.

응답 데이터는 이런 형태가 된다.

```
{
  id: "43",
  category: "악세서리",
  name: "브라운 레더 벨트",
  price: 29000,
  description: "...",
  reviews: [
    {
      id: "...",
      productId: "43",
      username: "mike_zz",
      rating: 5,
      text: "..."
    }
  ]
}
```

즉 리뷰를 따로 요청하지 않아도 `product.reviews`로 바로 접근할 수 있다.

---

## 15. 이전 리뷰 fetch 방식

처음에는 리뷰를 따로 가져오는 `useFetchReviews` 훅을 만들었다.

```
fetch("http://localhost:3000/reviews")
```

또는:

```
fetch(`http://localhost:3000/reviews?productId=${productId}`)
```

하지만 현재 구조에서는 `useFetchProduct`에서 `_embed=reviews`로 리뷰까지 한 번에 가져오기 때문에 `useFetchReviews`는 사용하지 않는다.

그래서 `ProductDetail`에서는 다음 코드가 주석 처리되어 있다.

```
// import useFetchReviews from "../../hooks/useFetchReviews";

// const { reviews, isReviewsLoading, isReviewsError } =
//     useFetchReviews(productId);
```

현재는 아래처럼 `product.reviews`를 사용한다.

```
<h3>리뷰({product.reviews.length})</h3>
```

```
{product.reviews.map((review) => {
  return (
    <div key={review.id}>
      <div>{review.username}</div>
      <div>({review.rating}/5)</div>
      <div>{review.text}</div>
    </div>
  );
})}
```

---

## 16. 상세 페이지 렌더링 구조

`ProductDetail`의 전체 흐름은 다음과 같다.

```
const { productId } = useParams();

const { product, isProductLoading, isProductError } =
  useFetchProduct(productId);

if (isProductLoading) {
  return <div>상품 정보를 불러오고 있습니다...</div>;
}

if (isProductError) {
  return <div>상품 정보를 불러오는 중에 에러가 발생했습니다...</div>;
}

return (
  <div>
    <div>
      <img src={product.image} />
      <div>{product.category}</div>
      <h2>{product.name}</h2>
      <div>{product.price.toLocaleString()}원</div>
      <button>구매하기</button>
    </div>

    <p>{product.description}</p>

    <h3>리뷰({product.reviews.length})</h3>

    {product.reviews.map((review) => {
      return (
        <div key={review.id}>
          <div>{review.username}</div>
          <div>({review.rating}/5)</div>
          <div>{review.text}</div>
        </div>
      );
    })}
  </div>
);
```

---

## 17. CSS Module 사용

이 프로젝트는 CSS Module을 사용한다.

파일 이름은 이런 식이다.

```
Home.module.css
ProductDetail.module.css
Layout.module.css
```

컴포넌트에서는 이렇게 import한다.

```
import styles from "./Home.module.css";
```

사용할 때는 문자열 클래스명이 아니라 객체처럼 접근한다.

```
<div className={styles.productListItem}>
```

### CSS Module 장점

일반 CSS에서는 클래스명이 전역으로 적용된다.

```
.selected {
  color: black;
}
```

다른 컴포넌트에도 `.selected`가 있으면 충돌할 수 있다.

하지만 CSS Module은 클래스명을 자동으로 고유하게 바꿔주기 때문에 컴포넌트끼리 스타일 충돌을 줄일 수 있다.

---

## 18. 주요 커스텀 훅 정리

### useFetchProducts

상품 목록 전체를 가져오는 훅.

```
GET /products
```

사용 위치:

```
Home
```

반환값:

```
{
  products,
  isProductsLoading,
  isProductsError
}
```

---

### useFetchProduct

상품 하나의 상세 정보를 가져오는 훅.

```
GET /products/:productId?_embed=reviews
```

사용 위치:

```
ProductDetail
```

반환값:

```
{
  product,
  isProductLoading,
  isProductError
}
```

특징:

- 상품 상세 정보 가져오기
- `_embed=reviews`를 통해 리뷰까지 함께 가져오기
- 상세 페이지에서 `product.reviews` 사용 가능

---

### useFetchReviews

리뷰만 따로 가져오려고 만들었던 훅.

현재 상세 페이지에서는 사용하지 않는다.

이전 방식 학습용으로 남아 있다.

---

## 19. 데이터 흐름 정리

### 상품 목록 페이지

```
Home 컴포넌트 렌더링
→ useFetchProducts 실행
→ GET /products 요청
→ products state에 저장
→ 카테고리 필터링
→ 상품 카드 렌더링
→ 상품 클릭 시 /products/:productId 이동
```

---

### 상품 상세 페이지

```
/products/43 접속
→ useParams로 productId = "43" 추출
→ useFetchProduct(productId) 실행
→ GET /products/43?_embed=reviews 요청
→ product state에 상품 + reviews 저장
→ 상품 상세 정보 렌더링
→ product.reviews.map으로 리뷰 렌더링
```

---

## 20. 발표할 때 핵심 설명 포인트

### 1. 라우팅

`React Router`를 사용해서 페이지를 나누었다.

```
/ → 상품 목록
/products/:productId → 상품 상세
/about → 소개 페이지
* → NotFound
```

### 2. 동적 라우팅

`/products/:productId`에서 `:productId`는 상품 id에 따라 달라지는 값이다.

상세 페이지에서는 `useParams()`로 이 값을 받아 API 요청에 사용한다.

### 3. 데이터 fetch 분리

API 요청 로직은 컴포넌트 안에 직접 길게 쓰지 않고 커스텀 훅으로 분리했다.

```
useFetchProducts
useFetchProduct
```

이렇게 하면 컴포넌트는 UI에 집중하고, 데이터 요청은 훅이 담당한다.

### 4. 카테고리 필터링

상품 목록은 `selectedCategory` state에 따라 필터링된다.

```
selectedCategory === "전체" || selectedCategory === category
```

### 5. 리뷰 데이터 처리

처음에는 리뷰를 따로 요청하는 훅을 만들었지만, 최종적으로는 json-server의 `_embed=reviews` 기능을 사용했다.

덕분에 상품 상세 API 한 번으로 상품 정보와 리뷰 목록을 같이 받을 수 있다.

---

## 21. 중간에 겪은 이슈와 해결

### 이슈 1. CSS Module 파일명 오타

문제:

```
Home.moudule.css
```

올바른 이름:

```
Home.module.css
```

CSS Module은 `.module.css`로 끝나야 정상적으로 import할 수 있다.

---

### 이슈 2. Link에서 id가 안 들어감

문제 코드:

```
to={"/products/${id}"}
```

이렇게 쓰면 `${id}`가 문자 그대로 들어간다.

해결:

```
to={`/products/${id}`}
```

백틱을 사용해야 변수 값이 문자열 안에 들어간다.

---

### 이슈 3. map에서 return 줄바꿈 문제

문제 코드:

```
return

<div>...</div>
```

JavaScript는 `return` 뒤에 줄바꿈이 있으면 자동으로 세미콜론을 붙여서 `return;`처럼 처리한다.

해결:

```
return (
  <div>...</div>
);
```

---

### 이슈 4. 리뷰 필터 API가 빈 배열 반환

`json-server@1.0.0-beta.15`에서 다음 요청이 기대처럼 동작하지 않았다.

```
/reviews?productId=32
```

그래서 처음에는 전체 리뷰를 가져와 프론트에서 필터링했다.

```
const filteredReviews = json.filter((review) => {
  return review.productId === productId;
});
```

이후 강의 방식대로 `_embed=reviews`를 사용해서 상품 상세 요청 한 번으로 리뷰까지 가져오는 방식으로 변경했다.

---

## 22. 최종 구조 요약

```
목록 페이지:
GET /products
→ 상품 목록 렌더링
→ 카테고리 필터링
→ 상품 클릭 시 상세 이동

상세 페이지:
GET /products/:productId?_embed=reviews
→ 상품 상세 정보 렌더링
→ product.reviews로 리뷰 렌더링
```