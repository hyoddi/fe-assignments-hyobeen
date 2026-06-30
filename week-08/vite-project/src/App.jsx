import { Routes, Route } from "react-router"

import Home from './components/Home/index'
import About from "./components/About"
import ProductDetail from "./components/ProductDetail/index"
import NotFound from "./components/NotFound"

import Layout from "./components/Layout"

function App() {

  return (
    <>
          
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          {/* :productId -> 동적 Segment, 여기는 고정된 문자열이 아니라 변수라는 뜻 */}
          <Route path="*" element={<NotFound />} /> {/* '*'로 그 지정 외 페이지 처리*/}
        </Route>
      </Routes>
      
        {/* 
          Routes: 여러 Route를 관리하는 컨테이너
          Route: URL 하나와 컴포넌트 하나를 연결하는 규칙
        */}

    </>

    // <> </>는 React Fragment의 축약 문법
    // JSX에서는 하나의 부모 요소만 반환 가능
    // 이거 쓰면 불필요한 div 생성 안하고도 여러 요소 그룹화 가능하다!

  )
}

export default App
