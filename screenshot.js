const puppeteer = require('puppeteer');
const path = require('path');

async function takeScreenshot() {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set viewport to match typical desktop
    await page.setViewport({ width: 1440, height: 900 });
    
    // Load the local HTML file
    const filePath = 'file://' + path.resolve(__dirname, 'index.html');
    await page.goto(filePath, { waitUntil: 'networkidle0' });
    
    // Wait a bit for any animations
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Take screenshot of just the hero section
    const heroElement = await page.$('.hero-section');
    if (heroElement) {
        await heroElement.screenshot({ 
            path: 'hero-current.png',
            type: 'png'
        });
        console.log('Hero section screenshot saved as hero-current.png');
    }
    
    // Take full page screenshot
    await page.screenshot({ 
        path: 'website-current.png',
        fullPage: true,
        type: 'png'
    });
    console.log('Full page screenshot saved as website-current.png');
    
    await browser.close();
}

takeScreenshot().catch(console.error);