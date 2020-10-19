import { graphql } from 'gatsby';
import React from 'react';

export default function PizzasPage({ data }) {
    const pizzas = data.pizzas.nodes;
    return (
         <>
            <p>Hey! There are { pizzas.length } Pizzas!!! </p>
        </>
    )
}

export const query = graphql`
    query PizzaQuery {
        pizzas: allSanityPizza {
            nodes {
                name
                id
                slug {
                    current
                }
                toppings {
                    id
                    name
                }
                image {
                    asset {
                        fluid(maxWidth: 400) {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
            }
        }
    }
`;