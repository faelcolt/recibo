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

Given('todos os campos identificados', async function() {
    const campos = await this.page.$$('input');
    //console.log(campos.length, await campos[0].getProperties());

    this.campos = {};
    for (const campo of campos) {
        const name = await campo.evaluate(node => node.name);
        this.campos[name] = campo;
    }
});

Then('devem existir os campos: {string}', async function(campos) {
    this.fields = campos.split(',').map(f => f.trim());
    for (const field of this.fields) {
        assert.ok(!!this.campos[field], `Campo ${field} não existe.`);
    }
});

Then('os campos devem estar vazios', async function() {
    for (const field of this.fields) {
        const value = await this.campos[field].evaluate(c => c.value);
        assert.ok(
            value === undefined || value === '',
            `Campo ${field} deveria estar vazio, mas está com ${value}`
        );
    }
});
