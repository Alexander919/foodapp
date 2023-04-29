import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { useContext, useState, useEffect } from "react";
import Context from "../../store/Context";

function HeaderCartButton() {
    const [bump, setBump] = useState(false);
    const { cartShowHandler, cartContainedItems } = useContext(Context);

    const btnClasses = `${classes.button} ${bump ? classes.bump : ""}`;

    useEffect(() => {
        if(cartContainedItems.length) {
            setBump(true);
        }

        const timer = setTimeout(() => {
            setBump(false);
        },300);

        return () => {
            clearTimeout(timer);
        };

    },[cartContainedItems, setBump]);

    return (
        <button onClick={cartShowHandler} className={btnClasses}>
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