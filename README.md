# Execução
## Ruby
`ruby thousands_separator_test.rb`

## JS/Node
Para instalar jest para testes (*pode usar `npm` se preferir*):
`yarn`

Executar testes:
`yarn test`

---

# Desafio para programadores Ruby ou JavaScript

Utilizando Ruby ou Node.Js, faça:

- Um clone deste repositório,
- Crie um branch com seu nome,
- Resolva o problema abaixo e
- Nos envie um pull request com a solução.

---

## Separador de Milhar

Crie uma classe chamada *ThousandsSeparator*
com um único método público chamado **format**
que aceita como parâmetro um número inteiro positivo >= 0 em formato decimal ou string
com comprimento de zero à 15 caracteres,
que retorne sempre uma string numérica de acordo com os requisitos abaixo:

Receba um número e retorne-o como string,
agrupado a cada 3 dígitos da direita para esquerda,
separado por vírgula (,). Exemplo: (como é feito em formatação monetária)

| ENTRADA    	| SAÍDA         	|
|------------	|---------------	|
| 1234       	| 1,234         	|
| 987654321  	| 987,654,321   	|
| 123        	| 123           	|
| 9876543210 	| 9,876,543,210 	|

## Bônus de Implementação

Além da solução apresentada, será somado pontos ao candidato que implementar cada uma das melhorias abaixo, em ordem de importância ( mais importante para o menos):

- Implementar testes unitários (mais importante de todos)
- Este problema tem pelo menos 3 soluções, crie uma classe separada para cada uma delas, exemplo: ThousandsSeparatorRegExp
- Você consegue implementar uma quarta solução além das 3 acima?
- Resolver nas duas linguagens, Ruby e Node.js, separando as duas soluções nas pastas "ruby" e "node" na raiz do repositório.
- Aceitar qualquer outro valor de entrada - como string vazia, null, undefined, boolean, etc - a função deve retornar a string zero: `"0"`
- Aceitar número negativo, mantendo o sinal do número, por exemplo, para a entrada -1234, a função deverá retornar a string "-1,234"
- Aceitar um segundo parâmetro com o caracter para ser utilizado como separador, sendo a vírgula o parâmetro padrão.

---

**IMPORTANTE: NÃO É PERMITIDO O USO DE BIBLIOTECAS EXTERNAS OU FUNÇÕES PRONTAS DE FORMATAÇÃO EXISTENTES NA LINGUAGEM!**

*May the force be with you!*