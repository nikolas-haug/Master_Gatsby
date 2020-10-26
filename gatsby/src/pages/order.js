import React from 'react';
import SEO from '../components/SEO';

export default function OrderPage() {
    return (
        <>
            <SEO title="Order a PIzza!" />
            <form>
                <fieldset>
                    <legend>Your Info</legend>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" />
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" />
                </fieldset>
                <fieldset>
                    <legend>Menu</legend>
                </fieldset>
                <fieldset>
                    <legend>Order</legend>
                </fieldset>
            </form>
        </>
    ) 
}