// eslint-disable-next-line @typescript-eslint/no-var-requires
const { app } = require('@azure/functions');

module.exports = async function (context, req) {
    context.res.json({
        message: "Hello from the API"
    });
};