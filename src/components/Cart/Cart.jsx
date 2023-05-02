import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Form from "./Form";
import { useContext, useState } from "react";
import  Context from "../../store/Context";

function Cart() {
    const [orderBtnPressed, setOrderBtnPressed] = useState(false);

    const { cartCloseHandler, cartContainedItems, orderMeals } = useContext(Context);
    const totalPrice = cartContainedItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
    const hasItems = cartContainedItems.length > 0;

    const toggleOrder = hasItems && orderBtnPressed;

    const orderBtnHandler = () => {
        setOrderBtnPressed((btnState) => !btnState);
    };

    const cartItems = 
        <ul className={classes["cart-items"]}>
            {cartContainedItems.map(({qty, price, name, id}) => {
                return (
                    <CartItem key={id} id={id} name={name} qty={qty} price={price}/>
                );
            })}
        </ul>

    const placeOrder = (client) => {
        const total = cartContainedItems.reduce((acc, item) => acc + item.price * item.qty, 0);
        // console.log(total);
        // console.log(client);
        cartCloseHandler();
        //{items: cartContainedItems, client, total}
        orderMeals({total, items: cartContainedItems, client});
    }

    return (
        <Modal closeHandler={cartCloseHandler}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>${totalPrice}</span>
            </div>
            <div className={classes.actions}>
                <button onClick={cartCloseHandler} className={classes["button--alt"]}>Close</button>
                {hasItems && <button onClick={orderBtnHandler} className={classes.button}>Order</button>}
                {toggleOrder && <Form placeOrder={placeOrder}/>}
            </div>
        </Modal>
    );
}

export default Cart;