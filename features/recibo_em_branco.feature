# language: pt
Funcionalidade: Recibo em Branco
    Paulo deseja ter seu recibo sempre disponível para preenchimento e para posterior impressão.

    Cenário: Recibo em branco
        Quando acessar página do recibo
        Então o recibo deve ter o seguintes campos vazios: "imagem, nome, endereço, telefone, data"
        E a tabela de produtos deve ter cabeçalho contendo "Quantidade, Descrição, Valor Unitário, Total"
        E deve ter sete linhas com campos vazios
        E deve ter uma linha contendo "Total Geral"
        E um campo de total geral vazio

