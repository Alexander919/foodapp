import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem";
import Context from "../../store/Context";
import { useContext } from "react";

function AvailableMeals() {
    const { meals, mealsLoading: loading, mealsError: error } = useContext(Context);
    // console.log(meals, loading, error);
    let listOfMeals = <p>No meals available</p>;

    if(meals.length > 0) {
        listOfMeals = meals.map(meal => {
            return (
                <MealItem id={meal.id} key={meal.id} name={meal.name} price={meal.price} description={meal.description} />
            );
        });
    }

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {error !== null && <p>{error.message}</p>}
                    {loading && !error && <p>List of meals is loading...</p>}
                    {!loading && !error && listOfMeals }
                </ul>
            </Card>
        </section>
    );
}

export default AvailableMeals;