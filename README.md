# Mario Kart World Time Trial Browser

A way to see times and splits of your time trials.
And all you need is a browser.

## Prerequisites

- Use [Node.js](https://nodejs.org/en/) version 24 or higher.
- The port 4400 and 4173 are used.

## Development

```bash
corepack enable
git clone git@github.com:Lukinoh/mario-kart-world-time-trial-browser.git
cd mario-kart-world-time-trial-browser
pnpm install
pnpm run serve
# Open http://localhost:4400
```

Commits must follow the [Git Convential Commits](https://github.com/qoomon/git-conventional-commits).

## Build

```bash
pnpm run build
pnpm run preview
# Open http://localhost:4173
# Or execute the index.html
```

## Test

```bash
pnpm run test
```

## Information

What you start the development server, the images stored in `./src/assets/recognitions/raw/` are normalised in the folder `./src/assets/recognitions/normalised/`.
A normalised image is an image where the valuable information was extracted and a filter (i.e. black and white, invert, etc.) was applied.
If you make a change in the `raw` folder, you have to restart the server.

Moreover, after running the tests, the normalised images are deleted. Hence, if you have a `pnpm run dev` running, you have to restart it manually.

## Testing features

When running the application in development mode, there is a hidden feature.
If you set the name of the player to `DEBUG`, it loads a demo video.

Since the repository size would explode if too many videos were added, there is a trick to add more videos locally.
You can add videos in the folder `./src/assets/demo` with the following prefix `[0-9][0-9]_`.
Then, you can load them by naming the player `DEBUG_[0-9][0-9]`.

For instance, if you add a video named `01_my-video.mp4`, you can load it by naming your player `DEBUG_01`.
Each prefix must be unique.
If two files share the same prefix, only the first video found is loaded.

## Ideas

- We may add metadata for the tracks with the number of laps and the name included instead of inferring them from the image as it is done currently.

## Notes

At the beginning, I wanted to get live data and refresh continuously, however, some elements of the UI are moving.
For instance, when you get a coin, or pass a lap, or the shrooms from time to time.
But in the end, it was not really useful, so I removed this feature, and the application only displays meaningful data.

However, the code sometimes contains some "bump" screenshots, because I still had to handle such cases.

The project also served as a way for me to experiment with different approaches, which is why the composition functions may look convoluted.

## Credits

Thanks to [@breadbored](https://github.com/breadbored/) and its original concept [Mario Kart World Toolkit](https://bread.codes/posts/mario-kart-world-toolkit/).
