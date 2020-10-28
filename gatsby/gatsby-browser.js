import React from 'react';
import Layout from './src/components/layout';
import { OrderProvider } from './src/components/OrderContext';

export function wrapPageElement({ element, props }) {
    return <Layout {...props}>{ element }</Layout>;
}

export function wrapRootElement({ element }) {
    return <OrderProvider>{element}</OrderProvider>
}