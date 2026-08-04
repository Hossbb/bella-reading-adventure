# Bella's Reading Adventure — Interactive Prototype

## What this contains

- The approved worksheet artwork as a separate optimized WebP asset
- A no-scroll HTML page designed around a 3:4 iPad portrait layout
- Tappable A/B/C/D answer cards
- Interactive Check Answer behavior
- Gentle retry feedback
- Correct-answer celebration
- Home Screen app manifest and icon

## Run locally

Because the project uses relative files, open it through a local web server rather than double-clicking the HTML file.

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## GitHub / Vercel

1. Push this folder to a GitHub repository.
2. Import the repository into Vercel.
3. Use the default static deployment settings.
4. Open the deployed URL in Safari on Bella's iPad.
5. Tap **Share → Add to Home Screen**.

## Current prototype behavior

The correct answer is **B**. This version proves the approved visual design can remain intact while the answer cards and button behave like a real application.

The next version should separate the illustration from the story and question text so new worksheets can load dynamically from JavaScript or a database while preserving this exact art direction.
