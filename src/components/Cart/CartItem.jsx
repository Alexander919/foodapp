import classes from './CartItem.module.css';
import Context from '../../store/Context';
import { useContext } from 'react';

const CartItem = ({ name, qty, price, id }) => {
    const {cartAddItem, cartRemoveItem} = useContext(Context);

    const onRemove = () => {
        cartRemoveItem(id);
    };

    const onAdd = () => {
        cartAddItem({name, qty: 1, price, id});
    };

    return (
        <li className={classes['cart-item']}>
            <div>
                <h2>{name}</h2>
                <div className={classes.summary}>
                    <span className={classes.price}>${(price * qty).toFixed(2)}</span>
                    <span className={classes.amount}>x {qty}</span>
                </div>
            </div>
            <div className={classes.actions}>
                <button onClick={onRemove}>−</button>
                <button onClick={onAdd}>+</button>
            </div>
        </li>
    );
};

export default CartItem;
