const ValidationMotives = Object.freeze({
    DEFAULT: 'invalid',
    REQUIRED: 'required',
    STRING: 'must-be-string',
    INT: 'must-be-int',
    NUMBER: 'must-be-number',
    LETTERS: 'must-be-only-letters',
    TOO_LONG: (len) => `max-length-exceeded:${len}`,
});

module.exports = ValidationMotives;
