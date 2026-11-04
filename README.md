# Arcadia

Arcadia is an original Russian-language arcade portal prototype with a liquid-glass interface, fifteen playable mini-games, game-specific currencies, daily quests, player levels, ambient audio, and a cosmetic shop that uses one shared currency.

## Run

Open `index.html` in a modern browser, or serve this folder with any static HTTP server. No build step or dependency install is needed.

## Currency and progress

- Each game has its own wallet. That currency can only be earned and spent inside that game.
- Shared stars (`✦`) are earned from daily quests and the daily gift. The shop accepts shared stars for themes and profile effects.
- Shop purchases can be equipped and change the page theme or profile avatar. The moon token buys an extra spin for the daily wheel.
- Three calm games are included: a ripple pond, a sand garden, and drifting clouds. The sound toggle controls generated sound effects and the gentle ambient tone in calm games.
- Progress is saved in this browser using `localStorage`.

## Wheel source and attribution

The animated Canvas wheel is adapted from [byoules/random-spinning-wheel](https://github.com/byoules/random-spinning-wheel), commit `430208f62dff0730aa6e63870f2812f85ccbd2bd`, by Brad Youles. It is MIT licensed; the required notice is included in `vendor/random-spinning-wheel-LICENSE`.

This is a front-end prototype. Accounts, cross-device sync, server-side balances, multiplayer, and payment support are not implemented; browser storage is not suitable for protecting production currency or purchases.

## Deploy to Vercel

This is a static site with no build step. Create a Vercel project from this GitHub repository, select **Other** as the framework preset, leave the build command and output directory empty, then deploy. `index.html` is at the repository root.

Quests can be rerolled for 10 shared stars. Reaction, number guessing, rock-paper-scissors, coin toss, and 2048 offer optional virtual-star wagers: wins pay back twice the stake, losses forfeit it, and draws return it. Calm-game currencies have daily caps (clouds: 20; rain and garden: 30) to prevent unlimited tap farming.
- The star clicker has its own persistent tap and level progression plus an in-game upgrade shop. Its dedicated pollen balance is stored separately from shared stars and every other game wallet; clicks do not grant global stars, XP, or quest progress.

## Embedded clicker attribution

The clicker is an embedded, adapted copy of [na1os/clicker-game](https://github.com/na1os/clicker-game). Its original source and README are preserved in `games/na1os-clicker/`; the only gameplay-source adjustment namespaces its localStorage keys to avoid collisions with Arcadia data. The upstream README asks users not to claim the work as their own and says it may be forked and modified. It does not include a standard license file; see `games/na1os-clicker/ATTRIBUTION.md`.

- A theme toggle switches between dark and light glass palettes. New games include Neon Snake, Minesweeper, Echo Sequence, and Bubble Garden, with synthesized sound effects controlled by the site sound switch.
