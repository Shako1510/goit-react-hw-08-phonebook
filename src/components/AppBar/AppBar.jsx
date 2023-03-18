import { useSelector } from "react-redux";
import UserMenu from "../UserMenu/UserMenu";
import Navigation from "../Navigation/Navigation";
import AuthNav from "../AuthNav/AuthNav";
import { Header, BoxHeader, Logo } from "./AppBarStyled";
import { getIsLoged } from "redux/selectors";



export default function AppBar() {
    const isLogin = useSelector(getIsLoged)
    console.log(isLogin)

    return (
        <Header>
            <BoxHeader>
                <Logo to="/" end>PhoneBook</Logo>
                <Navigation />
                {isLogin ? <UserMenu /> : <AuthNav />}
            </BoxHeader>
        </Header>
    )
}