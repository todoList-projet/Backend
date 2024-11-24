class CustomError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

class AlreadyExistError extends CustomError {
    constructor(resource = 'Resource') {
        super(409, `${resource} already exists`);
    }
}

module.exports = {
    CustomError,
    AlreadyExistError,
};