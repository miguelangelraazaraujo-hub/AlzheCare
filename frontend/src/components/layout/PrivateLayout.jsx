import { Outlet } from "react-router";
import PrivateHeader from "./PrivateHeader";
import PrivateBottomNav from "./PrivateBottomNav";
import "./PrivateLayout.css";

export default function PrivateLayout() {
    return (
        <div className="private-layout">
            <PrivateHeader />

            <main className="private-main">
                <Outlet />
            </main>

            <PrivateBottomNav />
        </div>
    );
}