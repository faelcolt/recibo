# language: pt
Funcionalidade: Recibo em Branco
    Paulo deseja ter um recibo sempre limpo para preenchimento e para posterior impressão.

    Cenário: Recibo em branco para rápido preenchimento
        Dada a página de recibo acessada
        Então a página deve ter o título "Recibo"
        E a página deve possuir uma margem de 8px
        E os campos devem possuir texto de tamanho 16px
        E deve existir uma imagem no cabeçalho
        E a tabela deve conter cabeçalho com "Qtd., Descrição, Valor Unitário, Valor Total"
        E o corpo da tabela deve ter sete linhas 
        E cada linha deve ter quatro campos vazios
        E o rodapé deve ter uma linha contendo "Total Geral"
        E um campo de total geral vazio

