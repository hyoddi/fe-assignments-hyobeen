
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
// React는 기본적으로 라우팅 기능이 없어서 React Router 라이브러리를 사용

import App from './App.jsx'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <App />
  </BrowserRouter>

  // BrowserRouter : React에서 페이지 이동(라우팅)을 관리해주는 컴포넌트

  // BrowserRouter는 브라우저의 URL을 관리,
  // URL 변화에 따라 적절한 컴포넌트를 렌더링할 수 있도록 해주는 최상위 컴포넌트



  /* 단순 React만 있으면, 한 화면밖에 못보여준다!!

    function App() {
      return <Home />;
    }
  
  */
)
