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
- Improve shroom detection
- Do no check image size are the same
- add solidjs router
- add vitest (may need jsdom or something similar) Use the images I have to detect the values for instances- v
- optimise image by precompiling them (or sharp it)
- counter of attempts
- image invert is used for debugging
- add metadata for images (box position maybe, help to build without th need to access timecoins etc..?
- avoid having two pages open as the same time
- shroom number is wrong it display the reamining shrooms and not the used one.
- versioning
- unstorage snapshot import/export
- automatically parse the best record of mkwrs and add it to the list (not possible cors, either ask enter a bypass cors or function to copy paste)
- tab focus or not
