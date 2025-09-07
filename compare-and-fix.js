const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function captureAndAnalyze() {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    
    const filePath = 'file://' + path.resolve(__dirname, 'index.html');
    await page.goto(filePath, { waitUntil: 'networkidle0' });
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get computed styles of key elements
    const styles = await page.evaluate(() => {
        const heroSection = document.querySelector('.hero-section');
        const statCards = document.querySelectorAll('.stat-card');
        const formCard = document.querySelector('.interview-card');
        const title = document.querySelector('.hero-title');
        
        return {
            heroBackground: window.getComputedStyle(heroSection).background,
            statCardBg: statCards.length > 0 ? window.getComputedStyle(statCards[0]).backgroundColor : null,
            formBg: formCard ? window.getComputedStyle(formCard).backgroundColor : null,
            titleSize: title ? window.getComputedStyle(title).fontSize : null,
            titleWeight: title ? window.getComputedStyle(title).fontWeight : null
        };
    });
    
    console.log('Current styles:', JSON.stringify(styles, null, 2));
    
    // Take screenshot
    await page.screenshot({ 
        path: 'website-latest.png',
        fullPage: false,
        clip: { x: 0, y: 0, width: 1440, height: 900 }
    });
    console.log('Screenshot saved as website-latest.png');
    
    await browser.close();
    
    // Analysis results
    console.log('\n--- Design Comparison ---');
    console.log('Goal mockup has:');
    console.log('- Purple gradient: More saturated, jewel-toned (#7c5ce6 range)');
    console.log('- Form background: Pure white');
    console.log('- Stat cards: Pure white with subtle shadows');
    console.log('- Title: Thinner font weight (200-300)');
    console.log('- Compact spacing throughout');
    
    return styles;
}

captureAndAnalyze().catch(console.error);