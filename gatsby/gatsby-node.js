import path from 'path';

async function turnPizzasIntoPages({ graphql, actions }) {
    // 1. Get a template for this page
    const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
    // 2. Query all pizzas
    const { data } = await graphql(`
        query {
            pizzas: allSanityPizza {
                nodes {
                    name
                    slug {
                        current
                    }
                }
            }
        }
    `);
    console.log(data);
    // 3. Loop over each pizza and create a page for that pizza
    data.pizzas.nodes.forEach(pizza => {
        actions.createPage({
            // What is the URL for this new page?
            path: `pizza/${pizza.slug.current}`,
            component: pizzaTemplate,
            context: {
                slug: pizza.slug.current
            }
        });
    })
}

async function turnToppingsIntoPages({ graphql, actions }) {
    console.log('Turning the toppings into pages!');
    // 1. Get a template for this page
    const toppingsTemplate = path.resolve('./src/pages/pizzas.js');
    // 2. Query all toppings
    const { data } = await graphql(`
        query {
            toppings: allSanityTopping {
                nodes {
                    name
                    id
                }
            }
        }
    `);
    // 3. Create page for that topping
    data.toppings.nodes.forEach(topping => {
        console.log('Creating page for ' + topping.name);
        actions.createPage({
            path: `topping/${topping.name}`, 
            component: toppingsTemplate,
            context: {
                topping: topping.name,
                // TODO: Regex for topping
                toppingRegex: `/${topping.name}/i`
            }
        })
    });
    // 4. Pass topping data to 
}

export async function createPages(params) {
    // Create pages dynamically
    // Wait for all promises to be resolved before finishing this function
    await Promise.all([
        // 1. Pizzas
        turnPizzasIntoPages(params),
        // 2. Toppings
        turnToppingsIntoPages(params)
        // 3. Slicemasters

    ]);
}