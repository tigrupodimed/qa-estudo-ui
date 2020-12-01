
import clickElement     from '../support/action/clickElement';
import setInputField    from '../support/action/setInputField';
import checkContainsText from '../support/check/checkContainsText';
import waitForEnabled from '../support/action/waitForEnabled';
import openWebsite from '../support/action/openWebsite';


const { When } = require('cucumber');


    When(
        /^Eu clico no elemento "([^"]*)?"$/,
        clickElement
    );

    When(
        /^Eu preencho "([^"]*)?" no inputfield "([^"]*)?"*$/,
        setInputField
    );
    When(
        /^Eu espero que o (button|elemento|input)* "([^"]*)?"( não)* contenha o texto "([^"]*)?"$/,
        checkContainsText
    );
    When(
        /^Eu espero até que o elemento "([^"]*)?" esteja habilitado$/,
        waitForEnabled
    );
    When(
        /^Eu abro o (url|site) "([^"]*)?"$/,
        openWebsite
    );