import { Link, Outlet } from "react-router";

const Layout = () => {
  return (
    <div>
      <h1>멋사몰</h1>
      <ul>
        <li><Link to="/">홈페이지</Link></li>
        <li><Link to="/about">어바웃</Link></li>
        <li><Link to="/products/11">프로덕트 동적 URL</Link></li>
      </ul>
      <Outlet />
    </div>
  );
};

export default Layout;