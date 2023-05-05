import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Form from "./Form";
import { useContext, useState } from "react";
import  Context from "../../store/Context";

function Cart() {
    const { cartCloseHandler, cartContainedItems, orderUploading, orderUploadingError, orderPlaced, uploadOrder, uploadOrderAction } = useContext(Context);
    const [orderBtnPressed, setOrderBtnPressed] = useState(false);

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
        // cartCloseHandler();
        uploadOrder("https://react-http-84fba-default-rtdb.europe-west1.firebasedatabase.app/orders.json", {
            method: "POST",
            body: JSON.stringify({total: totalPrice, items: cartContainedItems, client}),
            headers: {
                "Content-Type": "application/json"
            }
        }, uploadOrderAction);
    };

    const cart = (
        <>
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
        </>
    );

    return (
        <Modal closeHandler={cartCloseHandler}>
            {!orderUploading && !orderPlaced && cart}
            {orderUploading && <p>Placing you order...</p>}
            {!orderUploading && orderPlaced !== null && <p>Thank you, your order has been placed! Order number {orderPlaced.name}.</p>}
        </Modal>
    );
}

export default Cart;