const puppeteer = require('puppeteer');
const path = require('path');

async function takeHeaderScreenshot() {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set viewport to match design width
    await page.setViewport({ width: 1440, height: 900 });

    // Load the local HTML file
    const filePath = 'file://' + path.resolve(__dirname, 'index.html');
    await page.goto(filePath, { waitUntil: 'networkidle0' });

    // Wait for fonts to load
    await new Promise(resolve => setTimeout(resolve, 500));

    // Take screenshot of just the header
    const headerElement = await page.$('.site-header');
    if (headerElement) {
        await headerElement.screenshot({
            path: path.resolve(__dirname, 'header-screenshot.png'),
            type: 'png'
        });
        console.log('Header screenshot saved as header-screenshot.png');
    } else {
        console.log('Header element not found');
    }

    await browser.close();
}

takeHeaderScreenshot().catch(console.error);
