import {Bar, Hamburger, Logo, MainNav, NavBarToggle, NavButton, NavLi, NavLink} from "@/components/layout";
import {useState} from "react";
import {useCheckAuthQuery} from "@/stores/slices/regapi";


export default function NavBar() {
    const [displayNav, setDisplayNav] = useState<'flex' | 'none'>('none')
    const user = useCheckAuthQuery({})

    const toggleNavBar = () => setDisplayNav(displayNav === 'flex' ? 'none' : 'flex')
    const logout = () => {
        localStorage.removeItem('token');
        window.location.href='/';
    }

    return (
        <Bar>
            <NavBarToggle onClick={toggleNavBar}>
                <Hamburger />
            </NavBarToggle>
            <Logo href="">SBoard</Logo>
            <MainNav $display={displayNav}>
                {user.data ?  (
                    <>
                        <NavLi>
                            <NavLink href="/posts" >Посты</NavLink>
                        </NavLi>
                        <NavLi>
                            {user.data && <NavLink href="/me">{user.data.firstName}</NavLink>}
                        </NavLi>
                        <NavLi>
                            <NavButton onClick={logout} >Выйти</NavButton>
                        </NavLi>
                    </>
                ) : (
                    <>
                        <NavLi>
                            <NavLink href="/login" >Войти</NavLink>
                        </NavLi>
                        <NavLi>
                            <NavLink href="/register" >Зарегистрироваться</NavLink>
                        </NavLi>
                    </>
                ) }
            </MainNav>
        </Bar>
    )
}