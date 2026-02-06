# Elderella Website Design Standards

## Typography

### Fonts
All pages must use the following Google Fonts:
- **Headings**: `'Merriweather Sans', sans-serif` (weights: 400, 700)
- **Body text**: `'Source Sans Pro', sans-serif` (weights: 400, 500, 600)

### Font Import
Add these lines to the `<head>` of every HTML page:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Merriweather+Sans:wght@400;700&family=Source+Sans+Pro:wght@400;500;600&display=swap" rel="stylesheet">
```

**Important:** Do not import Merriweather (serif). The site uses Merriweather Sans (sans-serif) only.

### Font Sizes
- Body text: 18px (mobile: 16px)
- H1: 60px (tablet: 52px, mobile: 48px)
- H2: 48px (tablet: 44px, mobile: 40px)
- H3: 40px (tablet: 36px, mobile: 32px)
- H4: 32px (tablet: 32px, mobile: 28px)
- H5: 24px
- H6: 20px

### Hero Subtitle
All hero subtitles across the site must be consistent:
- Font: Source Sans Pro
- Font-size: 28px at all breakpoints (desktop, tablet, mobile)
- Font-weight: 600
- Line-height: 1.4
- Color: var(--color-text)
- Margin-bottom: 24px
- Max-width: 800px

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

### Responsive Breakpoints
- **Tablet**: `@media (max-width: 1024px)`
- **Mobile**: `@media (max-width: 768px)`

## Component Standards

### Buttons
- Background: #FFBC57
- Text color: #595959
- Border-radius: 8px
- Font-weight: 500
- **Hover exclusion rule**: When creating a new button class used on `<a>` elements, it must be added to the global `a:hover:not(...)` exclusion list in `css/styles.css` (near line 227). This prevents the global hover color from overriding the button's text color.

### Forms
- Input background: #FFFFFF
- Input border: none (focus: 1px solid #8b7dd8)
- Border-radius: 8px

### Cards
- Background: #FFFFFF or #F5F5F5
- Border-radius: 12px
- Box-shadow: 0 6px 20px rgba(0,0,0,0.1)

## Accessibility

- Decorative icons and images must use `alt=""` with `aria-hidden="true"`
- Decorative SVGs (e.g., toggle chevrons) must include `aria-hidden="true"`
- Interactive elements must have appropriate ARIA attributes (e.g., `aria-expanded`, `aria-controls`)

## Important Notes

1. **Consistency**: All pages must follow these standards for a cohesive user experience
2. **Font Loading**: Always include Google Fonts links before any styles
3. **Color Accuracy**: Use exact hex codes - do not approximate or use similar colors
4. **Line Spacing**: Maintain 1.5 line-height for readability consistency
5. **Responsive Design**: Test all changes on mobile, tablet, and desktop viewports

## LLM-Readable Content (llms.txt)

### Mandatory: Markdown Companion Files

Every public-facing HTML page MUST have a corresponding `.html.md` companion file containing an LLM-optimized markdown version of the page content.

#### Rules

1. **When creating a new HTML page**, also create `[filename].html.md` in the same directory
2. **When making significant content changes** to an HTML page, update the `.html.md` file to match
3. **Add the new page** to `llms.txt` in the appropriate section
4. **Update `llms-full.txt`** if the page contains core product information

#### .html.md File Format

- H1: page title
- Blockquote: meta description or hero subtitle
- Clean markdown content (no HTML, no nav, no decorative elements)
- Footer with page URL

#### Exceptions

No .md files needed for: component partials (header.html, footer.html), noindex/internal pages, redirect pages.
