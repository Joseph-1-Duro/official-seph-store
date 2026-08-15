import CartButton from "../components/CartButton";
import CartDrawer from "../components/CartDrawer";
import Logo from "../components/Logo";
import Navabar from "../components/Navbar";
import SearchBox from "../components/SearchBox";

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__wrapper">
        <Logo />

        <Navabar />

        <div className="site-header__actions">
          <SearchBox />
          <CartButton />
        </div>
      </div>
      <CartDrawer />
    </header>
  )
}
