import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem";
import Context from "../../store/Context";
import { useContext } from "react";

function AvailableMeals() {
    const { DUMMY_MEALS } = useContext(Context);

    const mealsList = DUMMY_MEALS.map(meal => {
        return (
            <MealItem id={meal.id} key={meal.id} name={meal.name} price={meal.price} description={meal.description} />
        );
    });

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    );
}

export default AvailableMeals;