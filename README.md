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

## Information

What you start the development server, the images stored in `./src/assets/recognitions/raw/` are normalised.
A normalised image is an image where the valuable information was extracted and a filter (i.e. black and white, invert, etc.) was applied.
If you do a change in this folder, you have to restart the server.

## TODO

- Live update has some issues, for instance, when you get a new coin, there is animation that move the number up.
  To reduce these issues, we can add screenshots with these exceptions.
- Do no check image size are the same
- image invert is used for debugging
- add metadata for images (box position maybe, help to build without th need to access timecoins etc..?
- avoid having two pages open as the same time
- versioning
- tab focus or not
- Database cleanup feature (keep only meaningful time)
- add counters of attemps that is not affected by the database cleanup
- Page 1 Start/Stop + video + table of différence
- Page 2 History with export/import and cleanup
- Page 3 Worlds records and Friends times
- Page 4 FAQ
- Add better logging for debugging
- Fix bug see comment in use-attempt-manager
- Add internal validation maybe (for instance to give a Time type to the time)
- normalize arrow function
- We could implement a comparison method specifically for the time digits using key pixels to recognize the number.
  It should be more performant than relying on some image similarity algorithm.
