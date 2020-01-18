const {
    Given,
    When,
    Then,
    After,
    Before,
    BeforeAll,
    AfterAll,
} = require('cucumber');
const puppeteer = require('puppeteer');
const assert = require('assert');

const pixel_to_int = s => +s.match(/\d+/g)[0];

let browser;
BeforeAll(async function() {
    browser = await puppeteer.launch({
        headless: true,
    });
});

AfterAll(async function() {
    await browser.close();
});

Before(async function() {
    this.page = await browser.newPage();
});

After(async function() {
    await this.page.close();
});

Given('um dispositivo {string} de {int}px por {int}px', async function(
    dispositivo,
    x,
    y
) {
    const isMobile = {
        comum: false,
        móvel: true,
    };
    this.isMobile = isMobile[dispositivo];
    this.width = x;
    this.height = y;
});

When('a página do recibo é acessada', { timeout: 30000 }, async function() {
    await this.page.setViewport({
        width: this.width || 800,
        height: this.height || 600,
        isMobile: !!this.isMobile,
    });
    await this.page.goto('http://localhost:3000');
});

Then('o conteúdo não deve ultrapassar a margem de {int}px', async function(
    margem
) {
    //Margens efetivas do componente principal: #main
    const { top, left, bottom, right } = await this.page.evaluate(() => {
        const { width, height } = document.body.getBoundingClientRect(); //dimensões da página
        return Array.from(document.querySelector('#main').children) //filhos do componente principal
            .map(el => el.getBoundingClientRect()) //dimensões dos filhos do componente principal
            .reduce((acc, cur) => {
                //redução às menores dimensões
                return {
                    top: Math.min(acc.top, cur.top),
                    left: Math.min(acc.left, cur.left),
                    bottom: Math.min(height - acc.bottom, height - cur.bottom),
                    right: Math.min(width - acc.right, width - cur.right),
                };
            });
    });

    assert.ok(top >= margem, `top(${top}) < margem(${margem})px`);
    assert.ok(left >= margem, `left(${left}) < margem(${margem})px`);
    assert.ok(bottom >= margem, `bottom(${bottom}) < margem(${margem})px`);
    assert.ok(right >= margem, `right(${right}) < margem(${margem})px`);
});

Then('o conteúdo não deve ultrapassar {int}px de largura', async function(
    expected
) {
    const width_px = await this.page.evaluate(
        () => getComputedStyle(document.querySelector('#main')).width
    );
    const width = pixel_to_int(width_px);

    assert.ok(
        width <= expected,
        `width(${width}) > largura_máx(${expected})px`
    );
});

Then('os campos devem possuir texto de pelo menos 16px', async function() {
    const min_fontSize = await this.page.evaluate(() => {
        const szs = Array.from(document.querySelectorAll('[type="text"]')) //elementos
            .map(e => getComputedStyle(e).fontSize) // tamanhos em pixels
            .map(s => +s.match(/\d+/g)[0]); // tamanhos inteiros
        return Math.min(...szs);
    });

    assert.ok(min_fontSize => 16, `min_fontSize(${min_fontSize}) < 16`);
});

Then('deve existir uma imagem no cabeçalho', async function() {
    const imagem = await this.page.$('#img-cabecalho');
    assert.ok(!!imagem);
});

Then('no cabeçalho devem existir campos vazios para: {string}', async function(
    expectd
) {
    const campos = await this.page.$$('input');

    this.campos = {};
    for (const campo of campos) {
        const name = await campo.evaluate(node => node.name);
        this.campos[name] = campo;
    }

    this.fields = expectd.split(',').map(f => f.trim());
    for (const field of this.fields) {
        assert.ok(!!this.campos[field], `Campo ${field} não existe.`);

        assert.ok(
            await campoVazio(this.campos[field]),
            `Campo ${field} deveria estar vazio.`
        );
    }
});

Then('o campo data deve conter a data de hoje', async function() {
    const { data, hoje } = await this.page.evaluate(() => {
        return {
            data: document.querySelector('[name="data"]').value,
            hoje: new Date().toLocaleDateString('pt-BR'),
        };
    });

    assert.equal(data, hoje);
});

Then('a tabela deve conter cabeçalho com {string}', async function(expected) {
    this.tabela = await this.page.$('table');

    const cabeçalhosEsperados = expected.split(',').map(s => s.trim());
    const cabeçalhoTabela = await this.tabela.$('thead');
    const cabeçalhosColunas = await cabeçalhoTabela.$$eval('th', elements => {
        return elements.map(e => e.innerText);
    });

    for (const esperado of cabeçalhosEsperados) {
        assert.ok(
            cabeçalhosColunas.some(coluna => coluna === esperado),
            `${esperado} não identificado`
        );
    }
});

Then(
    'o corpo da tabela deve ter linhas com todos os campos vazios',
    async function() {
        const corpo = await this.tabela.$('tbody');
        this.linhas = await corpo.$$('tr');
        assert.ok(
            this.linhas.length >= 1,
            `O corpo da tabela está com ${this.linhas.length} linhas.`
        );

        for (let i = 0; i < this.linhas.length; i++) {
            const linha = this.linhas[i];
            const campos = await linha.$$('input');

            for (let j = 0; j < campos.length; j++) {
                const campo = campos[j];
                assert(await campoVazio(campo), `campo ${j} da linha ${i}.`);
            }
        }
    }
);

Then(
    'o rodapé deve ter uma linha contendo "Total Geral" vazio',
    async function() {
        this.rodapé = await this.tabela.$('tfoot');
        const linha = await this.rodapé.$('tr');

        assert.ok(!!linha, `linha não existe`);

        const campo = await linha.$('input');
        assert.ok(await campoVazio(campo), `Campo não vazio.`);
    }
);

async function campoVazio(campo) {
    const value = await campo.evaluate(c => c.value);
    return value === undefined || value === '';
}
