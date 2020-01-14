# language: pt
Funcionalidade: Recibo em Branco
    Paulo deseja ter um recibo sempre limpo para rápido preenchimento e posterior impressão.

    Cenário: Recibo em branco para rápido preenchimento
        Dada a página de recibo acessada
        Então a página deve ter o título "Recibo"
        E a página deve possuir uma margem de 8px
        E os campos devem possuir texto de tamanho 16px
        E deve existir uma imagem no cabeçalho
        E no cabeçalho devem existir campos vazios para: "imagem, nome, endereço, telefone"
        E o campo data deve conter a data de hoje
        E a tabela deve conter cabeçalho com "Qtd., Descrição, Valor Unitário, Valor Total"
        E o corpo da tabela deve ter sete linhas 
        E cada linha deve ter quatro campos vazios
        E o rodapé deve ter uma linha contendo "Total Geral" vazio

    Cenário: Recibo em branco para rápido preenchimento
        Dada a página de recibo acessada em um dispositivo 320 x 568
        Então a tabela deve estar em um componente de no máximo 320px