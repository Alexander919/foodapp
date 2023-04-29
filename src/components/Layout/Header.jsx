import headerImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";
import classes from "./Header.module.css";

function Header() {
    return (
        <>
            <header className={classes.header}>
                <h1>React</h1>
                <HeaderCartButton />
            </header>
            <div className={classes["main-image"]}>
                <img src={headerImage} alt="A table full of food" />
            </div>
        </>
    );
}

export default Header;