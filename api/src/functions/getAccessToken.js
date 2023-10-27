// eslint-disable-next-line @typescript-eslint/no-var-requires
const { app } = require('@azure/functions');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios');

app.http('getAccessToken', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
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

            context.res = {
                status: 200,
                body: response.data,
            };
        } catch (error) {
            context.log(`[ERROR] Error fetching the access token: ${error.message}`);

            if (error.response) {
                
                context.log(error.response.data);
                // context.log(error.response.status);
                // context.log(error.response.headers);
            }

            context.res = {
                status: 500,
                body: 'Error fetching the access token.',
            };
        }
    }
});
