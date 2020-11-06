import { useState, useContext } from "react";
import OrderContext from '../components/OrderContext';
import calculateOrderTotal from "./calculateOrderTotal";
import formatMoney from "./formatMoney";

export default function usePizza({ pizzas, values }) {
    // 1. Create some state to hold our order
    // We got rid of this line because we moved useState up to the provider
    // const [order, setOrder] = useState([]);
    // Now we access both our state and our update function (setOrder) via context
    const [order, setOrder] = useContext(OrderContext);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    // 2. Make a function to add things to order
    function addToOrder(orderedPizza) {
        setOrder([...order, orderedPizza]);
    }
    // 3. Make a function to remove things from order
    function removeFromOrder(index) {
        setOrder([
            // everything before the item we want to remove
            ...order.slice(0, index),
            // everything after the item we want to remove
            ...order.slice(index + 1)
        ])
    }

    // this is the function that is run when someone submits the form
    async function submitOrder(e) {
        e.preventDefault();
        console.log(e);
        setLoading(true);
        // gather all of the data
        const body = {
            order,
            total: formatMoney(calculateOrderTotal(order, pizzas)),
            name: values.name,
            email: values.email
        }
        console.log(body);
    }
    // 4. Send this data to a serverless function when they check out
    // TODO: 

    return {
        order,
        addToOrder,
        removeFromOrder,
        error,
        loading,
        message,
        submitOrder
    }
}