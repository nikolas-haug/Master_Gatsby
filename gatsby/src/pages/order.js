import React from 'react';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';

export default function OrderPage() {
    const { values, updateValues } = useForm({
        name: '',
        email: ''
    });
    return (
        <>
            <SEO title="Order a PIzza!" />
            <form>
                <fieldset>
                    <legend>Your Info</legend>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={values} onChange={updateValues} />
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