# language: pt
Funcionalidade: Recibo em Branco
    Paulo deseja ter um recibo sempre limpo para rápido preenchimento e posterior impressão.

    Cenário: Recibo em branco para rápido preenchimento
        Dado um dispositivo 'comum' de 800px por 600px
        Quando a página do recibo é acessada
        Então o conteúdo não deve ultrapassar a margem de 8px
        E os campos devem possuir texto de pelo menos 16px
        E deve existir uma imagem no cabeçalho
        E no cabeçalho devem existir campos vazios para: "nome, endereço, telefone"
        E o campo data deve conter a data de hoje
        E a tabela deve conter cabeçalho com "Qtd., Descrição, Valor Unitário, Valor Total"
        E o corpo da tabela deve ter linhas
        E cada linha deve ter todos os campos vazios
        E o rodapé deve ter uma linha contendo "Total Geral" vazio

    Cenário: Recibo em branco para rápido preenchimento
        Dado um dispositivo 'móvel' de 320px por 568px
        Quando a página de recibo é acessada
        Então o conteúdo não deve ultrapassar a margem de 8px
        Então a tabela deve estar em um componente de no máximo 320px

    Cenário: Impressão
        Quando a página de recibo é acessada
        Então a página possui botão imprimir que invoca impressão do navegador
