import { Outlet } from "react-router-dom";
import Home from "../../components/Home/Home";

export default function LoginPage() {
    return (
        <div>
            {<Home />}
            <Outlet />
        </div>
    )
};