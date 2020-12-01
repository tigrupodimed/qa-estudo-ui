//
// =====
// Hooks
// =====
// WebdriverIO provides a several hooks you can use to interfere the test process in order to
// enhance it and build services around it. You can either apply a single function to it or
// an array of methods. If one of them returns with a promise,
// WebdriverIO will wait until that promise is resolved to continue.
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const errorShotsPath = path.resolve(__dirname, '..', '..','errorShots');

exports.hooks = {
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    // onPrepare: function (config, capabilities) {
    // },
    /**
     * Gets executed before a worker process is spawned & can be used to initialize specific service
     * for that worker as well as modify runtime environments in an async fashion.
     * @param  {String} cid    capability id (e.g 0-0)
     * @param  {[type]} caps   object containing capabilities for session
     * @param  {[type]} specs  specs to be run in the worker process
     * @param  {[type]} args   object that will be merged with the main
     *                         configuration once worker is initialized
     * @param  {[type]} execArgv list of string arguments passed to the worker process
     */
    // onWorkerStart: function (cid, caps, specs, args, execArgv) {
    // },
    /**
     * Gets executed just before initializing the webdriver session and test framework.
     * It allows you to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    beforeSession: function (config, capabilities, specs) {
        global.actualSuite = config.suite;
    },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */

    before: function (capabilities, specs) {
        browser.options.login = 'rgarcia';
        browser.options.senha = 'teste123';
        require('expect-webdriverio')
        global.pedidoGlobal = null;  
        global.cpf = 0;
        global.cnpj = 0;
        global.pedidosPrevenda = [];
        global.verificadorSangria = 0;     

        var ms = 20000;
        browser.addCommand('waitForVisible', function(elem,tempo,reverse){
            if(reverse == true){
                browser.waitUntil(function (){
                    let aux = $(elem).isDisplayed();
                    return !aux;
                }, { timeout: tempo, timeoutMsg: "Elemento: "+elem+" continuou visivel após: "+tempo, interval: 50});
            }else{
                browser.waitUntil(function (){
                    let aux = $(elem).isDisplayedInViewport();
                    return aux;
                },{ timeout: tempo, timeoutMsg: "Elemento: "+elem+" continuou não visivel após: "+tempo, interval: 50});
            }
        });
        browser.addCommand('waitForEnabled', function(elem,tempo,reverse){
            if(reverse == true){
                $(elem).waitForEnabled({timeout: tempo ,reverse: true});
            }else{
            $(elem).waitForEnabled(ms)
            }
        });
        browser.addCommand('waitForExist', function(elem,tempo,reverse){
            if(reverse == true){
                $(elem).waitForExist({timeout: tempo ,reverse: true});
            }else{
            $(elem).waitForExist(ms)
            }
        });
        browser.addCommand('click', function(elem){
            $(elem).click()
        });
        browser.addCommand('getAttribute', function(elem){
            return $(elem).getText()
        });
        browser.addCommand('getText', function(elem){
            return $(elem).getText()
        });
        browser.addCommand('elements', function(elem){
            return browser.findElements("xpath",elem);
        });
        browser.addCommand('elementToBeClickable', function(elem){
            $(elem).waitForEnabled()
            browser.waitUntil(function (){
                let aux = $(elem).isDisplayed();
                return aux;
            }, ms, "Elemento: "+elem+" continuou visivel após: "+ms, 50);
        });
        browser.addCommand('isExisting', function(elem){
            $(elem).isExisting()
        });
        browser.addCommand('isVisible', function(elem){
            $(elem).isDisplayed()
        });
        browser.addCommand('getText', function(elem){
           return $(elem).getText()
        });
        browser.addCommand('moveToObject', function(elem){
            $(elem).moveTo()
        });
        browser.addCommand('setValue', function(elem, value){
            $(elem).setValue(value)
        });
        browser.addCommand('localStorage', function(tipo, chave){
            switch (tipo) {
                case 'GET':
                    return browser.execute(function (key) {
                        return this.localStorage.getItem(key)
                    }, chave);
                case 'POST':
                    browser.execute(function (key, value) {
                        this.localStorage.setItem(key, value)
                    }, chave.key, chave.value)
                    break;
                case "DELETE":
                    if(chave != null){
                        browser.execute(function (key) {
                            this.localStorage.removeItem(key)
                        }, chave)
                    }
                break;
                default:            }
        });
        browser.addCommand('waitForValue', function(elem){
            browser.waitUntil(function (){
                return $(elem).getValue()
            }, ms, "Tempo da funcao 'waitForValue' estourado", 50);
        });
        
        browser.addCommand('limpaCesta', function(){
            limpaCesta();
        });
        browser.addCommand('selectByValue', function(elem, value){
            $(elem).selectByAttribute('value', value)
        });

        browser.addCommand('salvaPrintErro', function(){
            if(!fs.existsSync(errorShotsPath)){
                fs.mkdirSync(errorShotsPath);
            }
            browser.saveScreenshot(errorShotsPath + '/erro_' + moment().format("YYYY-MM-DD_HH:mm:ss") + '.png');
        });
    },
    /**
     * Gets executed before the suite starts.
     * @param {Object} suite suite details
     */
    // beforeSuite: function (suite) {
    // },
    /**
     * This hook gets executed _before_ every hook within the suite starts.
     * (For example, this runs before calling `before`, `beforeEach`, `after`)
     *
     * (`stepData` and `world` are Cucumber-specific.)
     *
     */
    // beforeHook: function (test, context, stepData, world) {
    // },
    /**
     * Hook that gets executed _after_ every hook within the suite ends.
     * (For example, this runs after calling `before`, `beforeEach`, `after`, `afterEach` in Mocha.)
     *
     * (`stepData` and `world` are Cucumber-specific.)
     */
    // afterHook:function(test,context,{error, result, duration, passed, retries}, stepData,world) {
    // },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) starts.
     */
    // beforeTest: function (test, context) {
    // },
    /**
     * Runs before a WebdriverIO command is executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that the command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object, if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Function to be executed after a test (in Mocha/Jasmine)
     */
    // afterTest: function (test, context, {error, result, duration, passed, retries}) {
    // },
    /**
     * Hook that gets executed after the suite has ended.
     * @param {Object} suite suite details
     */
    // afterSuite: function (suite) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    //after: function (result, capabilities, specs) {
    //},
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers have shut down and the process is about to exit.
     * An error thrown in the `onComplete` hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    // onComplete: function (exitCode, config, capabilities, results) {
    //    console.log(logErros);
    // },
    /**
     * Gets executed when a refresh happens.
     * @param {String} oldSessionId session ID of the old session
     * @param {String} newSessionId session ID of the new session
     */
    // onReload: function (oldSessionId, newSessionId) {
    // },
    /**
     * Cucumber-specific hooks
     */
    // beforeFeature: function (uri, feature, scenarios) {
    // },
    beforeScenario: function (uri, feature, scenario, sourceLocation) {
        global.scenarioName = scenario.name;
    },
    // beforeStep: function ({uri, feature, step}, context) {
    // },
    // afterStep: function ({uri, feature, step}, context, {error, result, duration, passed}) {
    // },
    // afterScenario: function (uri, feature, scenario, result, sourceLocation) {
    // },
    // afterFeature: function (uri, feature, scenarios) {
    // }
};
