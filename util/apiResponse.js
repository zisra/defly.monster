const Sentry = require('@sentry/node');

const errorTypes = {
    success: {
        message: 'Success',
        code: 200, // Success
    },
    serverError: {
        message: 'Server error',
        code: 500, // Server error
    }, 
    notFound: {
        message: 'Not found', 
        code: 404, // Not found
    },
    missingParameter: {
        message: 'Missing parameter',
        code: 400, // Client error
    },
    invalidParameter: {
        message: 'Invalid parameter',
        code: 400, // Client error
    }, 
    internalError: {
        message: 'Internal error',
        code: 500, // Internal error
    },
    notImplemented: {
        message: 'Not implemented',
        code: 501, // Not implemented
    }
}

function Response(res, {
    type, 
    message, 
    data,
}) {
    if(!res) throw new TypeError('First parameter must be a response object');
    const responseType = errorTypes[type] || errorTypes['serverError'];
    res.status(responseType.code);
    res.json({
        type: responseType,
        message: message || responseType.message,
        data: data || null,
    });

    if(err){
        console.error(err);
        Sentry.captureException(err);
    }
}

module.exports = Response;