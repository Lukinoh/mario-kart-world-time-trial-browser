# Mario Kart World Time Trial Browser

A way to see times and splits of your time trials.
And all you need is a browser.

## Development

```bash
git clone git@github.com:Lukinoh/mario-kart-world-time-trial-browser.git
cd mario-kart-world-time-trial-browser
pnpm install
pnpm run serve
# Open http://localhost:4400
```

- Commit must start with a lowercase case infinitive verb.

## Build

```bash
npm run build
npm run preview
```

## TODO

- Live update has some issues, for instance, when you get a new coin, there is animation that move the number up.
  To reduce these issues, we can add screenshots with these exceptions.
- // CanvasImageData & CanvasDrawImage
- Try to use webworker to improve performance
- Add support to determine that there is not more shrooms
- Improve shroom detection
- Do no check image size are the same
- add solidjs router
- add vitest (may need jsdom or something similar)
