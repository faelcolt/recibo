const { When, Before, BeforeAll, After, AfterAll } = require('cucumber');
const puppeteer = require('puppeteer');

let browser;

BeforeAll({ timeout: 10000 }, async function() {
    browser = await puppeteer.launch({ headless: true });
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

When('acessar página do recibo', async function() {
    await this.page.goto('http://localhost:3000');
});
