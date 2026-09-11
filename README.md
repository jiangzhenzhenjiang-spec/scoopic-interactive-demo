# Scoop Demo — Your AI Paparazzi

Polished interactive product demo inspired by the Scoopic / “AI Paparazzi” concept.  
**Original assets only** — custom SVG dogs and royalty-free Unsplash photos. Not affiliated with Scoopic.

## Quick start

```bash
npx --yes serve .
```

Then open the URL shown in the terminal (usually http://localhost:3000).

Or open `index.html` directly in a browser.

## Interactions

| Action | Result |
|--------|--------|
| Tap **Scoopy** (yellow puppy) | Bounce + speech bubble |
| Tap the **caption** line | Expands Scoopy’s narration |
| Tap a **circular hotspot** on the photo | Reveals discovered photo + scoop caption |
| Tap **✕** (or Escape) | Returns to main feed photo |
| Tap the **♥ like** button | Heart-rain particles |

## Structure

```
├── index.html
├── styles.css
├── app.js
├── README.md
└── assets/
```

## Notes

- Static HTML + CSS + JS — no backend.
- Desktop chrome: dark full-bleed background, floating colorful dog SVGs, hero copy.
- Phone frame: status bar, “Scoop Demo” nav, feed with core interactions.
