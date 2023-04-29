import React from "react";
import { useState, useReducer } from "react";

const DUMMY_MEALS = [
    {
        id: 'm1',
        name: 'Sushi',
        description: 'Finest fish and veggies',
        price: 22.99,
    },
    {
        id: 'm2',
        name: 'Schnitzel',
        description: 'A german specialty!',
        price: 16.5,
    },
    {
        id: 'm3',
        name: 'Barbecue Burger',
        description: 'American, raw, meaty',
        price: 12.99,
    },
    {
        id: 'm4',
        name: 'Green Bowl',
        description: 'Healthy...and green...',
        price: 18.99,
    },
];

const Context = React.createContext();

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    switch(action.type) {
        case "add":
            const updatedItems = state.items.concat(action.payload);
            const updatedTotalAmount = state.totalAmount + action.payload.price * action.payload.amount;
            return { items: updatedItems, totalAmount: updatedTotalAmount };
        case "remove":
            return
        default:
            return defaultCartState;
    }
};

export function ContextComponent({ children }) {

    const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);
    
    const addItemToCartHandler2 = (item) => {
        dispatchCart({type: "add", payload: item});
    };

    const removeItemFromCartHandler2 = (item) => {
        dispatchCart({type: "remove", payload: item});
    };

    const [cartOpened, setCartOpened] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const addItemToCartHandler = (newItem) => {
        //if item already in cart
        if (cartItems.some(cItem => cItem.id === newItem.id)) {
            setCartItems(oldCartItems => {
                return oldCartItems.map(({ id, qty: oldQty, price: oldPrice, name }) => {
                    if (id === newItem.id) {
                        const qty = oldQty + newItem.qty;
                        const price = oldPrice + newItem.price;

                        return { id, qty, price, name };
                    }
                    return { id, qty: oldQty, price: oldPrice, name };
                })
            });
        } else {
            setCartItems((oldCartItems) => {
                return [...oldCartItems, newItem];
            });
        }
    };
    const removeItemFromCartHandler = id => {
        console.log("item removed from the cart");
    };

    const cartShowHandler = () => {
        setCartOpened(true);
    };

    const cartCloseHandler = () => {
        setCartOpened(false);
    };

    const context = {
        DUMMY_MEALS,
        cartOpened,
        cartShowHandler,
        cartCloseHandler,
        cartContainedItems: cartItems,
        cartAddItem: addItemToCartHandler,
        cartRemoveItem: removeItemFromCartHandler
    };

    return (
        <Context.Provider value={context}>
            {children}
        </Context.Provider>
    );
}

export default Context;