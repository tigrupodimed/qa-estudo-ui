
module.exports = (value,element) => {
    $(element).waitForDisplayed({ timeout: 20000 });
    $(element).setValue(value);
};

