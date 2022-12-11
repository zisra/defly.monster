const Sentry = require('@sentry/node');

const errorTypes = {
	success: {
		message: 'Success',
		success: true,
		code: 200, // Success
	},
	serverError: {
		message: 'Server error',
		success: false,
		code: 500, // Server error
	},
	notFound: {
		message: 'Not found',
		success: false,
		code: 404, // Not found
	},
	missingParameter: {
		message: 'Missing parameter',
		success: false,
		code: 400, // Client error
	},
	invalidParameter: {
		message: 'Invalid parameter',
		success: false,
		code: 400, // Client error
	},
	internalError: {
		message: 'Internal error',
		success: false,
		code: 500, // Internal error
	},
	notImplemented: {
		message: 'Not implemented',
		success: false,
		code: 501, // Not implemented
	},
	unauthorized: {
		message: 'Unauthorized',
		success: false,
		code: 401, // Unauthorized
	},
};

function Response(res, { type, message, data, err }) {
	if (!res) throw new TypeError('First parameter must be a response object');
	const responseType = errorTypes[type] || errorTypes['serverError'];
	res.status(responseType.code).json({
		type: type,
		message: message || responseType.message,
		data: data || null,
		success: responseType.success,
	});

	if (err) {
		console.error(err);
		Sentry.captureException(err);
	}
}

module.exports = Response;
