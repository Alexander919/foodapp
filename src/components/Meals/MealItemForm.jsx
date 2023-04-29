import classes from "./MealItemForm.module.css";
import Input from "../UI/Input";
import { useState } from "react";

function MealItemForm({id, onAddItem }) {
    const [quantity, setQuantity] = useState(1);

    const changeValueHandler = (e) => {
        const qty = parseInt(e.target.value);
        setQuantity(qty);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        onAddItem(quantity);
        setQuantity(1);
    };

    return (
        <form onSubmit={onSubmitHandler} className={classes.form} action="">
            <Input input={{id: `amount_${id}`, onChange: changeValueHandler, type: "number", min: "1", max: "5", step: "1", value: quantity}} label="Amount" />
            <button>+ Add</button>
        </form>
    );
}

export default MealItemForm;