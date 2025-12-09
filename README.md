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
- Do no check image size are the same
- add solidjs router
- add vitest (may need jsdom or something similar) Use the images I have to detect the values for instances- v
- optimise image by precompiling them (or sharp it)
- counter of attempts
- image invert is used for debugging
- add metadata for images (box position maybe, help to build without th need to access timecoins etc..?
- avoid having two pages open as the same time
- versioning
- tab focus or not
- Add username support
- Database cleanup feature (keep only meaningful time)
- check I do not use anymore the name "map", but only "track" (file name too)
- add counters of attemps that is not affected by the database cleanup
- Page 1 Start/Stop + video + table of différence
- Page 2 History with export/import and cleanup
- Page 3 Worlds records and Friends times
- Page 4 FAQ
- Add name feature
- USe a monoscaped font "Maple mono?"
- The code contains experimental useless stuff to try to type inferred function without having to defined their interface explicitely
- Add better logging for debugging
- Fix bug see comment in use-attempt-manager
- Transform attemptHandler in createAttemptHandler
- Add internal validation maybe (for instance to give a Time type to the time)
