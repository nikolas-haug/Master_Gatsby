// Vercel modifications
// module.exports = async (req, res) => ({
//     statusCode: 200,
//     body: 'Hello!'
// });

exports.handler = async (event, context) => {
    return {
        statusCode: 200,
        body: 'Hello'
    }
}