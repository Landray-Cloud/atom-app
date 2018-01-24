module.exports = {
    StringToBase64: (str) => {
        return new Buffer(str).toString('base64');
    },
    Base64ToString: (str) => {
        return new Buffer(str, 'base64').toString();
    }
}
