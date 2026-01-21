const puppeteer = require('puppeteer');
const path = require('path');

async function takeScreenshot() {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    const filePath = 'file://' + path.resolve(__dirname, 'index.html');
    await page.goto(filePath, { waitUntil: 'networkidle0' });
    await new Promise(resolve => setTimeout(resolve, 500));

    const sectionElement = await page.$('.stats');
    if (sectionElement) {
        await sectionElement.screenshot({
            path: path.resolve(__dirname, 'section-screenshot.png'),
            type: 'png'
        });
        console.log('Section screenshot saved');
    }

    await browser.close();
}

takeScreenshot().catch(console.error);
