# language: pt
Funcionalidade: Recibo em Branco
    Paulo deseja ter seu recibo sempre disponível para rápido preenchimento e posterior impressão.

    Cenário: Recibo em branco
        Dada a página de recibo acessada
        Então o título da página deve ser "Recibo"
        E deve existir uma imagem no cabeçalho
        E no cabeçalho devem existir campos para: "imagem, nome, endereço, telefone, data"
        E os campos devem estar vazios
        E a tabela deve conter cabeçalho com "Qtd., Descrição, Valor Unitário, Valor Total"
        E o corpo da tabela deve ter sete linhas 
        E cada linha deve ter quatro campos vazios
        E o rodapé deve ter uma linha contendo "Total Geral"
        E um campo de total geral vazio

