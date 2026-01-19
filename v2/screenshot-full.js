const puppeteer = require('puppeteer');
const path = require('path');

async function takeFullScreenshot() {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    const filePath = 'file://' + path.resolve(__dirname, 'index.html');
    await page.goto(filePath, { waitUntil: 'networkidle0' });

    await new Promise(resolve => setTimeout(resolve, 500));

    await page.screenshot({
        path: path.resolve(__dirname, 'full-page-screenshot.png'),
        fullPage: true,
        type: 'png'
    });
    console.log('Full page screenshot saved');

    await browser.close();
}

takeFullScreenshot().catch(console.error);
