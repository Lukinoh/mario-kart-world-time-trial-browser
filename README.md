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
If you make a change in this folder, you have to restart the server.

Moreover, after the tests, the normalised images are deleted. Hence, if you have a `npm run dev` running, you have to restart it manually.

## Ideas

- The application is performant enough, but we could improve image detection with more optimized algorithms.
- We may add metadata for the tracks with the number of laps and the name included instead of inferring them from the image as it is done currently.

## Notes

At the beginning, I wanted to get live data and refresh continuously, however, some elements of the UI are moving.
For instance, when you get a coin, or pass a lap, or the shrooms from time to time.
But in the end, it was not really useful, so I removed this feature, and the application only displays meaningful data.

However, the code sometimes contains some "bump" screenshots, because I still had to handle such cases.

## Credits

Thanks to [@breadbored](https://github.com/breadbored/) and its original concept [Mario Kart World Toolkit](https://bread.codes/posts/mario-kart-world-toolkit/).
