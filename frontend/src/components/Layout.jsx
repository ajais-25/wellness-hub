import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navigation />
      <main className="min-h-[calc(100vh-theme(spacing.16))]">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
