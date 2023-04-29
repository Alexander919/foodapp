import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";
import { useContext } from "react";
import Context from "../../store/Context";

function MealItem({name, price, description, id}) {
    const { cartAddItem } = useContext(Context);

    const onAddItem = (qty) => {
        const item = {name, price: price, id, qty: qty};
        cartAddItem(item);
    } 
    return (
        <li className={classes.meal}>
            <div>
                <h3>{name}</h3>
                <div className={classes.description}>{description}</div>
                <div className={classes.price}>${price.toFixed(2)}</div>
            </div>
            <div>
                <MealItemForm id={id} onAddItem={onAddItem} />
            </div>
        </li>
    );
}

export default MealItem;