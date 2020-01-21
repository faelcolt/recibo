# language: pt
Funcionalidade: Recibo em Branco
    Paulo deseja ter um recibo sempre limpo para rápido preenchimento e posterior impressão.

    Cenário: Recibo em branco para rápido preenchimento
        Dado um dispositivo 'comum' de 800px por 600px
        Quando a página do recibo é acessada
        Então o conteúdo não deve ultrapassar a margem de 8px
        E o conteúdo não deve ultrapassar 680px de largura
        E os campos devem possuir texto de pelo menos 16px
        E deve existir uma imagem no cabeçalho
        E no cabeçalho devem existir campos vazios para: "nome, endereço, telefone"
        E o campo data deve conter a data de hoje
        E a tabela deve conter cabeçalho com "Qtd., Descrição, Valor Unitário, Valor Total"
        E o corpo da tabela deve ter linhas com todos os campos vazios
        E o rodapé deve ter uma linha contendo "Total Geral" vazio

    Cenário: Recibo em branco para rápido preenchimento
        Dado um dispositivo 'móvel' de 320px por 568px
        Quando a página do recibo é acessada
        Então o conteúdo não deve ultrapassar a margem de 8px
        Então o conteúdo não deve ultrapassar 680px de largura

    @print
    Cenário: Impressão
        Quando a página do recibo é acessada
        E o botão de impressão é acionado
        Então a página deve invocar a impressão do navegador
