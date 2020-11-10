const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
    return `<div>
         <h2>Your Recent Order for ${total}</h2>
         <p>Please start walking over, we will have our order ready in the next 20 mins.</p>
         <ul>
            ${order.map(item => `<li>
                    <img src="${item.thumbnail}" alt="${item.name}" />
                    ${item.size} ${item.name} - ${item.price}
                </li>
            `).join('')}
         </ul>
         <p>Your total is <strong>${total}</strong> due at pickup</p>
         <style>
            ul {
                list-style: none;
            }
         </style>
    </div>`;
}

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

// custom utility wait function
function wait(ms = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
} 

exports.handler = async (event, context) => {
    await wait(5000);
    const body = JSON.parse(event.body);
    console.log(body);
    // Validate the data coming in is correct
    const requiredFields = ['email', 'name', 'order'];

    for(const field of requiredFields) {
        console.log(`Checking that ${field} is good`);
        if(!body[field]) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: `Oops! You are missing the ${field} field` })
            }
        }
    }

    // make sure they actually have items in that order
    if(!body.order.length) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: `Why would you order nothing?`
            })
        }
    }

    // sent the email

    // Send the success or error message

    // send the email
    const info = await transporter.sendMail({
        from: 'Slick\'s Slices <slick@examaple.com',
        to: `${body.name} <${body.email}>, order@example.com`,
        subject: 'New Order',
        html: generateOrderEmail({ order: body.order, total: body.total })
    });
    console.log(info);
    console.log(`event: ${event}, context: ${context}`);
    return {
        statusCode: 200,
        body: JSON.stringify(info)
    }
}