# Mario Kart World Time Trial Browser

A way to see times and splits of your time trials.
And all you need is a browser.

## Development

```bash
git clone git@github.com:Lukinoh/mario-kart-world-time-trial-browser.git
cd mario-kart-world-time-trial-browser
pnpm install
npm run serve
# Open http://localhost:4400
```

- Commit must start with a lowercase case infinitive verb.

## Build

```bash
npm run build
npm run preview
```

## Information

What you start the development server, the images stored in `./src/assets/recognitions/raw/` are normalised.
A normalised image is an image where the valuable information was extracted and a filter (i.e. black and white, invert, etc.) was applied.
If you do a change in this folder, you have to restart the server.

Moreover, after the tests, the normalised images are deleted. Hence, if you have a `npm run dev` running, you have to restart it manually.

## TODO

- Live update has some issues, for instance, when you get a new coin, there is animation that move the number up.
  To reduce these issues, we can add screenshots with these exceptions.
- add metadata for images (box position maybe, help to build without th need to access timecoins etc..?
- We could implement a comparison method specifically for the time digits using key pixels to recognize the number.
  It should be more performant than relying on some image similarity algorithm.
