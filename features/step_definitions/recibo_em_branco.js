const { Given, Then, Before, BeforeAll, After, AfterAll } = require('cucumber');
const puppeteer = require('puppeteer');
const assert = require('assert');

let browser;

BeforeAll({ timeout: 10000 }, async function() {
    browser = await puppeteer.launch({ headless: true });
});

AfterAll(async function() {
    await browser.close();
});

Before({ timeout: 10000 }, async function() {
    this.page = await browser.newPage();
});

After(async function() {
    await this.page.close();
});

Given('a página de recibo acessada', async function() {
    await this.page.goto('http://localhost:3000');
});

Then('deve existir uma imagem no cabeçalho', async function() {
    const imagem = await this.page.$('img');
    assert.ok(!!imagem);
});

Then('no cabeçalho devem existir campos para: {string}', async function(
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
    }
});

Then('os campos devem estar vazios', async function() {
    for (const field of this.fields) {
        assert.ok(
            await campoVazio(this.campos[field]),
            `Campo ${field} deveria estar vazio.`
        );
    }
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

Then('o corpo da tabela deve ter sete linhas', async function() {
    const corpo = await this.tabela.$('tbody');
    this.linhas = await corpo.$$('tr');
    assert.equal(
        this.linhas.length,
        7,
        `O corpo da tabela está com ${this.linhas.length} linhas.`
    );
});

Then('cada linha deve ter quatro campos vazios', async function() {
    for (let i = 0; i < this.linhas.length; i++) {
        const linha = this.linhas[i];
        const campos = await linha.$$('input');

        assert.equal(
            campos.length,
            4,
            `A linha ${i} possui ${campos.length} campos.`
        );

        for (let j = 0; j < campos.length; j++) {
            const campo = campos[j];
            assert(await campoVazio(campo), `campo ${j} da linha ${i}.`);
        }
    }
});

Then('o rodapé deve ter uma linha contendo {string}', async function(expected) {
    this.rodapé = await this.tabela.$('tfoot');
    const texto = await this.rodapé.$eval('tr', el => el.innerText.trim());
    assert.equal(texto, expected, `${texto} != ${expected}`);
});

Then('um campo de total geral vazio', async function() {
    const campo = await this.rodapé.$('input');
    assert.ok(await campoVazio(campo), `Campo não vazio.`);
});

async function campoVazio(campo) {
    const value = await campo.evaluate(c => c.value);
    return value === undefined || value === '';
}
