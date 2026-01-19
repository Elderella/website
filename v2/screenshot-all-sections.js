const puppeteer = require('puppeteer');
const path = require('path');

const sections = [
    { selector: '.site-header', name: 'header' },
    { selector: '.promo-banner', name: 'promo-banner' },
    { selector: '.hero', name: 'hero' },
    { selector: '.solo-shift', name: 'solo-shift' },
    { selector: '.stats', name: 'stats' },
    { selector: '.caregiving-partner', name: 'partner' },
    { selector: '.share-responsibility', name: 'responsibility' },
    { selector: '.capture-section', name: 'capture' },
    { selector: '.meds-section', name: 'meds' },
    { selector: '.remember-section', name: 'remember' },
    { selector: '.see-more', name: 'see-more' },
    { selector: '.quotes', name: 'quotes' },
    { selector: '.keep-on-top', name: 'keep-on-top' },
    { selector: '.site-footer', name: 'footer' }
];

async function takeScreenshots() {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    await page.goto('http://localhost:8000/v2/', { waitUntil: 'networkidle0' });
    await new Promise(resolve => setTimeout(resolve, 1000));

    const outputDir = '/tmp/linear-attachments/current';

    for (const section of sections) {
        const element = await page.$(section.selector);
        if (element) {
            await element.screenshot({
                path: `${outputDir}/${section.name}.png`,
                type: 'png'
            });
            console.log(`Captured: ${section.name}`);
        } else {
            console.log(`Not found: ${section.selector}`);
        }
    }

    await browser.close();
    console.log('All screenshots saved to', outputDir);
}

takeScreenshots().catch(console.error);
