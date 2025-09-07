const puppeteer = require('puppeteer');
const path = require('path');

// Get the output filename from command line argument, or use default
const outputFile = process.argv[2] || 'website-screenshot.png';
const fullPage = process.argv[3] === 'full' ? true : false;

async function takeScreenshot() {
    console.log(`Taking screenshot${fullPage ? ' (full page)' : ''}...`);
    
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    
    const filePath = 'file://' + path.resolve(__dirname, 'index.html');
    await page.goto(filePath, { waitUntil: 'networkidle0' });
    
    // Wait for any animations to complete
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Take screenshot
    if (fullPage) {
        await page.screenshot({ 
            path: outputFile,
            fullPage: true
        });
    } else {
        await page.screenshot({ 
            path: outputFile,
            fullPage: false,
            clip: { x: 0, y: 0, width: 1440, height: 900 }
        });
    }
    
    console.log(`Screenshot saved as ${outputFile}`);
    
    await browser.close();
}

takeScreenshot().catch(console.error);