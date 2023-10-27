// eslint-disable-next-line @typescript-eslint/no-var-requires
const { app } = require('@azure/functions');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios');

app.http('getAccessToken', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {

        return context.res = {
            status: 200,
            body: JSON.stringify({
                message: "Hello from the API",
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const params = new URLSearchParams();
        params.append('client_id', process.env.CLIENT_ID);
        params.append('scope', `${process.env.CLIENT_ID}/.default`);
        params.append('grant_type', 'client_credentials');
        params.append('client_secret', process.env.CLIENT_SECRET);

        const tenantId = process.env.TENANT_ID;
        const endpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

        try {
            const response = await axios.post(endpoint, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            return context.res = {
                status: 200,
                body: JSON.stringify(response.data),
                headers: {
                    'Content-Type': 'application/json'
                }
            };

        } catch (error) {
            context.log(`[ERROR] Error fetching the access token: ${error.message}`);

            if (error.response) {

                context.log(error.response.data);
                // context.log(error.response.status);
                // context.log(error.response.headers);
            }

            return context.res = {
                status: 500,
                body:  JSON.stringify({
                    error: 'Error fetching the access token.',
                    details: error.message
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }

    }
});
