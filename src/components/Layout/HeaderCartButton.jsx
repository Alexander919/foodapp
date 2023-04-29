import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { useContext } from "react";
import Context from "../../store/Context";

function HeaderCartButton() {
    const { cartShowHandler, cartContainedItems } = useContext(Context);

    return (
        <button onClick={cartShowHandler} className={classes.button}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your cart</span>
            <span className={classes.badge}>
                {cartContainedItems.reduce((acc, val) => acc + val.qty, 0)}
            </span>
        </button>
    );
}

export default HeaderCartButton;