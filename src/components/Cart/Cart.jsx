import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import { useContext } from "react";
import  Context from "../../store/Context";

function Cart() {
    const { cartCloseHandler, cartContainedItems } = useContext(Context);
    const totalPrice = cartContainedItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
    const hasItems = cartContainedItems.length > 0;

    const cartItems = 
        <ul className={classes["cart-items"]}>
            {cartContainedItems.map(({qty, price, name, id}) => {
                return (
                    <CartItem key={id} id={id} name={name} qty={qty} price={price}/>
                );
            })}
        </ul>

    return (
        <Modal closeHandler={cartCloseHandler}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>${totalPrice}</span>
            </div>
            <div className={classes.actions}>
                <button onClick={cartCloseHandler} className={classes["button--alt"]}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );
}

export default Cart;