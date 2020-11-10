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
            `)}
         </ul>
         <p>Your total is $${total} due at pickup</p>
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

exports.handler = async (event, context) => {
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

    // sent the email

    // Send the success or error message

    // Test send an email
    const info = await transporter.sendMail({
        from: 'Slick\'s Slices <slick@examaple.com',
        to: 'orders@example.com',
        subject: 'New Order',
        html: `<p>Your new pizza order is here!</p>`
    });
    console.log(info);
    console.log(`event: ${event}, context: ${context}`);
    return {
        statusCode: 200,
        body: JSON.stringify(info)
    }
}