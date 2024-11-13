
class SuccessMessage {
    constructor(message) {
        this.message = message;
    }
}

class ModelSuccessMessage extends SuccessMessage {
    constructor(model, name, action,) {
        super(`${model} : ${name}, ${action} successfully `);
    }
}

module.exports = {
    SuccessMessage,
    ModelSuccessMessage,
};