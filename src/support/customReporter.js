const WDIOReporter = require('@wdio/reporter/build').default;
const color = require('cli-color');

module.exports = class CustomReporter extends WDIOReporter{

    contadorFalhas = 0;
    testesFalhados = [];

    constructor(options) {
        /*
         * make reporter to write to the output stream by default
         */
        options = Object.assign(options, { stdout: true })
        super(options)
    }

    onTestFail(test) {
        this.contadorFalhas++;
        this.testesFalhados.push({'index': this.contadorFalhas, 'nome': test.fullTitle, 'erro': test.error});
        browser.salvaPrintErro();
        browser.limpaCesta();
    }

    onRunnerEnd(){
        this.testesFalhados.forEach((elem, index)=>{
            this.write('\n\n' + elem.index + ')  ');
            this.write(elem.nome);
            this.write(color.red('\n\t' + elem.erro.message));
            this.write(color.blackBright('\n\t' + elem.erro.stack + '\n'));
        });
        if (this.contadorFalhas > 0){
            this.write(color.underline.redBright(this.contadorFalhas + " testes quebraram"));
        }
    }

}

