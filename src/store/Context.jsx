import React from "react";
import { useState, useEffect, useReducer } from "react";

const DUMMY_MEALS = [];
// const DUMMY_MEALS = [
//     {
//         id: 'm1',
//         name: 'Sushi',
//         description: 'Finest fish and veggies',
//         price: 22.99,
//     },
//     {
//         id: 'm2',
//         name: 'Schnitzel',
//         description: 'A german specialty!',
//         price: 16.5,
//     },
//     {
//         id: 'm3',
//         name: 'Barbecue Burger',
//         description: 'American, raw, meaty',
//         price: 12.99,
//     },
//     {
//         id: 'm4',
//         name: 'Green Bowl',
//         description: 'Healthy...and green...',
//         price: 18.99,
//     },
// ];

const Context = React.createContext();


const cartReducer = (state, action) => {
    let inx;
    switch(action.type) {
        case "add":
            //if item already in cart
            //{id, price, qty, name}
            inx = state.findIndex(item => item.id === action.payload.id);

            if(inx !== -1) { //repeated item
                const repeatedItem = state[inx];
                const qty = repeatedItem.qty + action.payload.qty;
                // const price = repeatedItem.price + newItem.price;

                const updatedItem = { ...repeatedItem, qty };
                const newCartItems = [...state];
                newCartItems[inx] = updatedItem;

                return newCartItems;
            } else {
                return [...state, action.payload];
            }
        case "remove":
            const updatedItems = [...state];
            inx = updatedItems.findIndex(item => item.id === action.payload.id);

            if(updatedItems[inx].qty > 1) {
                const updatedItem = { ...updatedItems[inx] };
                updatedItem.qty -= 1;

                updatedItems[inx] = updatedItem;

                return updatedItems;
            } else {
                updatedItems.splice(inx, 1);
                return updatedItems;
            }

        case "reset-cart":
            return [];
        default:
            return state;
    }
};

export function ContextComponent({ children }) {
    const [cartItems2, dispatchCart] = useReducer(cartReducer, []);

    const [cartOpened, setCartOpened] = useState(false);
    const [meals, setMeals] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //TODO: http Hook
    const fetchMeals = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("https://react-http-84fba-default-rtdb.europe-west1.firebasedatabase.app/meals.json");
            const data = await res.json();

            if(data) setMeals(data);

        } catch(err) {
            setError(err);
        }

        setLoading(false);
    };

    const orderMeals = async (order) => {
        // setLoading(true);
        // setError(null);

        try {
            const res = await fetch("https://react-http-84fba-default-rtdb.europe-west1.firebasedatabase.app/orders.json", {
                method: "POST",
                body: JSON.stringify(order),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            console.log("database response", data);

        } catch(err) {
            console.error(err);
            // setError(err);
        }

        // setLoading(false);
        // console.log(JSON.stringify(order));
        resetCart();
    }

    useEffect(() => {
        fetchMeals();
    }, []);
    
    const addItemToCartHandler2 = item => {
        dispatchCart({ type: "add", payload: item });
    };

    const removeItemFromCartHandler2 = id => {
        dispatchCart({ type: "remove", payload: { id } });
    };

    const resetCart = () => {
        dispatchCart({type: "reset-cart"});
    }


    const cartShowHandler = () => {
        setCartOpened(true);
    };

    const cartCloseHandler = () => {
        setCartOpened(false);
    };

    const context = {
        meals,
        cartOpened,
        cartShowHandler,
        cartCloseHandler,
        cartContainedItems: cartItems2,
        cartAddItem: addItemToCartHandler2,
        cartRemoveItem: removeItemFromCartHandler2,
        loading,
        error,
        orderMeals
    };

    return (
        <Context.Provider value={context}>
            {children}
        </Context.Provider>
    );
}

export default Context;