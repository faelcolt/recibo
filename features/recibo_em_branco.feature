# language: pt
Funcionalidade: Recibo em Branco
    Paulo deseja ter seu recibo sempre disponível para preenchimento e para posterior impressão.

    Cenário: Recibo em branco
        Dada a página de recibo acessada
        E todos os campos identificados
        Então devem existir os campos: "imagem, nome, endereço, telefone, data"
        Então os campos devem estar vazios
        E a tabela de produtos deve ter cabeçalho contendo "Quantidade, Descrição, Valor Unitário, Total"
        E deve ter sete linhas com campos vazios
        E deve ter uma linha contendo "Total Geral"
        E um campo de total geral vazio

