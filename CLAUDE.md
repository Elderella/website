# Elderella Website Design Standards

## Typography

### Fonts
All pages must use the following Google Fonts:
- **Headings**: `'Merriweather', serif` (weight: 400)
- **Body text**: `'Source Sans Pro', sans-serif` (weights: 400, 500, 600)

### Font Import
Add these lines to the `<head>` of every HTML page:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400&family=Source+Sans+Pro:wght@400;500;600&display=swap" rel="stylesheet">
```

### Font Sizes
- Body text: 18px (mobile: 16px)
- H1: 3rem (Merriweather)
- H2: 2rem (Merriweather)
- H3: 1.4rem (Merriweather)

### Line Height
- Standard line height: 1.5 (matching home page)
- Do not use 1.8 or 1.9 line heights

## Color Palette

### Primary Colors
- **#FFFFFF** - Main background (pure white)
- **#F5F5F5** - Secondary background sections
- **#5A4FCF** - Main purple background (hero, testimonials, footer)
- **#CCCCFF** - Light periwinkle for backgrounds and accents
- **#342A99** - Dark purple for headings and accents

### Supporting Colors
- **#FFBC57** - Yellow/orange for CTAs (submit buttons, logo)
- **#595959** - Dark gray for body text (65% opacity: #000000 at 65%)
- **#000000** - Pure black (used sparingly for Elderella logo)

### Usage Guidelines
- **Backgrounds**: Use #FFFFFF for main background, #F5F5F5 for alternating sections
- **Headers/Footers**: Use #5A4FCF for purple sections
- **Text**: Use #595959 for body text, #342A99 for headings
- **Links**: Use #342A99 for links
- **Buttons**: Use #FFBC57 for primary action buttons

## Layout Standards

### Container
- Max width: 1440px
- Padding: 0 180px (tablet: 0 30px, mobile: 0 20px)

### Sections
- Standard padding: 60px 0
- Background alternation: #FFFFFF and #F5F5F5

## Component Standards

### Buttons
- Background: #FFBC57
- Text color: #595959
- Border-radius: 8px
- Font-weight: 500

### Forms
- Input background: #FFFFFF
- Input border: none (focus: 1px solid #8b7dd8)
- Border-radius: 8px

### Cards
- Background: #FFFFFF or #F5F5F5
- Border-radius: 12px
- Box-shadow: 0 6px 20px rgba(0,0,0,0.1)

## Important Notes

1. **Consistency**: All pages must follow these standards for a cohesive user experience
2. **Font Loading**: Always include Google Fonts links before any styles
3. **Color Accuracy**: Use exact hex codes - do not approximate or use similar colors
4. **Line Spacing**: Maintain 1.5 line-height for readability consistency
5. **Responsive Design**: Test all changes on mobile, tablet, and desktop viewports