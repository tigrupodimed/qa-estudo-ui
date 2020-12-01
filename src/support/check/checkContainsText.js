/**
 * Check if the given elements contains text
 * @param  {String}   elementType   Element type (element or button)
 * @param  {String}   selector       Element selector
 * @param  {String}   falseCase     Whether to check if the content contains
 *                                  the given text or not
 * @param  {String}   expectedText  The text to check against
 */
export default (elementType, selector, falseCase, expectedText) => {
    /**
     * The command to perform on the browser object
     * @type {String}
     */
    let command = 'getValue';

    if (
        ['button', 'container'].includes(elementType)
        || $(selector).getAttribute('value') === null
    ) {
        command = 'getText';
    }

    /**
     * False case
     * @type {Boolean}
     */
    let boolFalseCase;

    /**
     * The expected text
     * @type {String}
     */
    let stringExpectedText = expectedText;

    /**
     * The text of the element
     * @type {String}
     */
    const elem = $(selector);

    if(selector == "#loginFilial" || elementType == "input"){
        command = 'getValue'
    }
    browser.waitUntil(function (){
        let aux = $(elem).isDisplayed();
        return aux;
    }, 30000, "Elemento: "+elem+" continuou visivel após: "+30000, 50);
    const text = elem[command]();

    if (typeof expectedText === 'undefined') {
        stringExpectedText = falseCase;
        boolFalseCase = false;
    } else {
        boolFalseCase = (falseCase === ' não');
    }

    if (boolFalseCase) {
        expect(text).not.toContain(stringExpectedText);
    } else {
        expect(text).toContain(stringExpectedText);
    }
};
