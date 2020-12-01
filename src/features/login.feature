#language: pt 
 Funcionalidade: Login
    Como desenvolvedor
    Eu quero fazer login no site

Contexto:
    Dado    Eu abro o url "https://lojavirtualtst.panvel.com/panvel/main.do"         

 Esquema do Cenario: Login site panvel

    Dado    Eu espero até que o elemento ".navbar__menu-login--text>span" esteja habilitado
    E       Eu clico no elemento ".navbar__menu-login--text>span"
    Entao   Eu espero até que o elemento "#input-usuario" esteja habilitado
    
    Quando  Eu preencho "<LOGIN>" no inputfield "#input-usuario"
    E       Eu preencho "<SENHA>" no inputfield "[name=senha]"
    E       Eu clico no elemento "#btn-next-step"
    Entao   Eu espero até que o elemento ".navbar__menu-login.navbar__menu-login-dropdown" esteja habilitado
    E       Eu espero que o elemento ".navbar__menu-login.navbar__menu-login-dropdown" contenha o texto "DOUGLAS"

   Exemplos:   
      | LOGIN       | SENHA  |
      | 02807802060 | panvel |
