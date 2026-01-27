const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function takeScreenshots() {
    // Create output directory if it doesn't exist
    const outputDir = path.join(__dirname, '..', 'screenshots');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    const filePath = 'file://' + path.resolve(__dirname, '..', 'compare-plans.html');

    // Desktop (1440px)
    console.log('Taking desktop screenshot (1440px)...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(filePath, { waitUntil: 'networkidle0' });
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.screenshot({
        path: path.join(outputDir, 'compare-plans-desktop.png'),
        fullPage: true,
        type: 'png'
    });
    console.log('  Saved: screenshots/compare-plans-desktop.png');

    // Tablet (768px)
    console.log('Taking tablet screenshot (768px)...');
    await page.setViewport({ width: 768, height: 1024 });
    await page.goto(filePath, { waitUntil: 'networkidle0' });
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.screenshot({
        path: path.join(outputDir, 'compare-plans-tablet.png'),
        fullPage: true,
        type: 'png'
    });
    console.log('  Saved: screenshots/compare-plans-tablet.png');

    // Mobile (375px)
    console.log('Taking mobile screenshot (375px)...');
    await page.setViewport({ width: 375, height: 812 });
    await page.goto(filePath, { waitUntil: 'networkidle0' });
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.screenshot({
        path: path.join(outputDir, 'compare-plans-mobile.png'),
        fullPage: true,
        type: 'png'
    });
    console.log('  Saved: screenshots/compare-plans-mobile.png');

    await browser.close();
    console.log('\nAll screenshots complete!');
}

takeScreenshots().catch(console.error);
