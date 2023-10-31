// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios');

module.exports = async function (context, req) {
    let response = {
        status: 500,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const params = new URLSearchParams();
    params.append('client_id', process.env.CLIENT_ID);
    params.append('scope', `${process.env.CLIENT_ID}/.default`);
    params.append('grant_type', 'client_credentials');
    params.append('client_secret', process.env.CLIENT_SECRET);

    context.log(params);

    const tenantId = process.env.TENANT_ID;
    const endpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

    try {
        const loginResponse = await axios.post(endpoint, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        response.status = 200;
        response.body = JSON.stringify(loginResponse.data);

    } catch (error) {
        context.log(`[ERROR] Error fetching the access token: ${error.message}`);

        if (error.response) {
            context.log(error.response.data);
            // context.log(error.response.status);
            // context.log(error.response.headers);
        }

        response.status = 500;
        response.body = JSON.stringify({
            error: 'Error fetching the access token.',
            details: error.message
        });
    }

    context.res = response;
};