import { Outlet } from "react-router-dom";
import LoginForm from "components/Login/LoginForm";

export default function LoginPage() {
    return (
        <div>
            {<LoginForm />}
            <Outlet />
        </div>
    )
};