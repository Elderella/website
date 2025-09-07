const puppeteer = require('puppeteer');
const path = require('path');

const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 375, height: 667 },
    { name: 'small-mobile', width: 320, height: 568 }
];

async function testResponsive() {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    for (const viewport of viewports) {
        const page = await browser.newPage();
        await page.setViewport(viewport);
        
        const filePath = 'file://' + path.resolve(__dirname, 'index.html');
        await page.goto(filePath, { waitUntil: 'networkidle0' });
        await new Promise(resolve => setTimeout(resolve, 500));
        
        await page.screenshot({ 
            path: `responsive-${viewport.name}.png`,
            fullPage: true
        });
        
        console.log(`Screenshot saved: responsive-${viewport.name}.png (${viewport.width}x${viewport.height})`);
        await page.close();
    }
    
    await browser.close();
    console.log('\nAll responsive screenshots captured!');
}

testResponsive().catch(console.error);