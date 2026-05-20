# Arcade & Easter Egg System — Architecture Reference

The portfolio has a layered arcade game and 60+ easter egg codes across three JS modules in `Portfolio/portfolio/`.

## Module Map

```
Portfolio/portfolio/
├── effects.js          # Theatre layer + easter egg codes + ally system + arcade game
├── arcade-plus.js      # Enemies, powerups, achievements, bosses, YouTube music
└── command-palette.jsx # React ⌘K palette listing all codes
```

All three are IIFEs (except command-palette.jsx which is a React component mounted by the HTML). They communicate via `window.__tcaciGame` and custom events.

## effects.js (~1900 lines)

### Sections (in order)
1. **WebGL paper shader** — animated paper grain texture on `<canvas id="paper-shader">`
2. **Ink blots** — CSS-animated ambient decorations (`#ink-blots`)
3. **Custom cursor** — magnetic button interactions
4. **Marquee ticker** — scrolling news ticker with hidden tips
5. **Hot-metal heading reveal** — character-by-character typewriter animation
6. **Toast system** — `toast(text, tone)` notifications with color palette
7. **Ally/Summon system** — friendly entities that hunt enemies
   - `spawnAlly(opts)` — creates ally DOM element, adds to ALLIES array
   - `allyTick()` — rAF loop processing all allies (stationary + mobile)
   - `aoeKillGhosts(cx, cy, radius)` — area kill within radius
8. **Pokemon sprites** — `POKEMON` object with PokeAPI CDN image URLs
   - `summonPokemon(key)` — spawns ally via `spawnAlly()`
9. **Easter egg codes** — `codes` object, 50+ entries
   - Retro: sega, pacman, sonic, mario, hadouken, shoryuken, fatality, capcom, tatsu
   - D&D: d20, nat20, initiative, criticalrole, dnd
   - BG3 companions: bg3, karlach, astarion, shadowheart, laezel, gale, withers, wyll, halsin, jaheira, minsc, tav, darkurge, mindflayer, tadpole
   - Spells: fireball, eldritch, eldritchblast
   - Pokemon: pikachu, charizard, bulbasaur, squirtle, gengar, mewtwo, eevee, snorlax, jigglypuff, gyarados, dragonite, lucario, pokemon (random)
   - Meta: dark, press, boring, audit, lychee, konami, cheat
10. **Konami code listener** — arrow key sequence `↑↑↓↓←→←→BA`
11. **Keyword buffer listener** — `keydown` handler matching typed text against `codes`
12. **Periodic tips** — toast encouragements every 50-90s
13. **CSS keyframes** — all animation definitions
14. **Arcade mini-game** (`initArcadeChaos()`) — ghost chase game

### Arcade Mini-Game (inside effects.js)
- **STATE object** — lives, score, stage, combo, multiplier, shield/slow/mult timers, arcadeOff flag
- **Ghost system** — `spawnGhost(opts)`, `killGhost(g, sx, sy)`, `loseLife()`, `gameOver()`
- **Ghost AI modes**: chase, patrol (linear/slalom/zigzag), wander
- **Flee behavior** — non-boss ghosts flee when player has shield/piercing powerup
- **Section transitions** — IntersectionObserver triggers stage banners + enemy waves
- **API exposed** via `window.__tcaciGame.api`:
  - `spawnGhost(opts)`, `killGhost(g, sx, sy)`, `addCoin(n)`, `gainLife(n)`
  - `shield(ms)`, `slow(ms)`, `multi(ms)`, `cursor()`, `ghosts` (array ref)

## arcade-plus.js (~990 lines)

Waits for `window.__tcaciGame.api` via `whenReady()`, then layers:

1. **Sound effects** — WebAudio chiptune via `beep()` / `arp()` + `SFX` object
2. **Toast** — duplicate toast function for this module
3. **Achievements** — 15 unlockables in `ACHIEVE` object, `award(key)` function
4. **Power-ups/Pickups** — 11 types in `TYPES` object:
   - coin, shield, slow, mult, life, star, magnet, freeze, nuke, piercing
   - `spawnPickup(type, opts)`, `pickupTick()` rAF loop
5. **Enemy variants** — 8 new types via spawn functions:
   - `spawnInkBlob()` — slow, 2HP
   - `spawnTypewriter()` — fast, random glyph
   - `spawnPaperclip()` — medium speed
   - `spawnGoldStar()` — slow, 150pts
   - `spawnRedactor()` — very fast
   - `spawnCoffeeMug()` — slow, 3HP
   - `spawnEraserDust()` — fastest, 1HP
   - `spawnRuler()` — medium, 2HP
6. **Boss system** — 3 bosses via `spawnBoss(type)`:
   - `editor` — spawns on contact section (6HP, 800pts)
   - `deadline` — secret boss (8HP, 1200pts)
   - `printer` — secret boss (10HP, 1500pts)
   - Secret bosses spawn probabilistically after score > 3000
7. **Section waves** — `WAVES` object maps section IDs to enemy spawns
8. **Project click waves** — enemy + coin spawns on project card click
9. **Bonus stages** — periodic coin rain + powerup shower
10. **Event hooks** — kill drops, piercing splash, speed achievements
11. **YouTube music player** — 7 tracks, auto-plays on load
    - `YT_TRACKS` array, `loadYTApi()`, `initYTPlayer()`
    - Pauses on `tcaci:arcade-off`

## command-palette.jsx (~270 lines)

React component `window.CommandPalette`:
- `⌘K` / `Ctrl+K` toggle
- Fuzzy search over `COMMANDS` array
- Category headers (Navigation, Projects, Shell, Easter Eggs) when not filtering
- `fireCode(name)` dispatches keydown events to trigger easter egg codes
- Floating `⌘K` hint positioned above music player

## Custom Events

| Event | Dispatched by | Payload | Consumed by |
|-------|--------------|---------|-------------|
| `tcaci:ready` | effects.js | — | arcade-plus.js |
| `tcaci:section` | effects.js | `{ id, stage, name, tone }` | arcade-plus.js |
| `tcaci:kill` | effects.js | `{ ghost, pts }` | arcade-plus.js |
| `tcaci:hit` | effects.js | — | arcade-plus.js |
| `tcaci:shield-block` | effects.js | — | arcade-plus.js |
| `tcaci:arcade-off` | effects.js | — | arcade-plus.js (pause YT) |
| `tcaci:arcade-on` | effects.js | — | arcade-plus.js |

## Adding New Features

### New easter egg code
1. Add handler to `codes` object in effects.js
2. Add entry to `COMMANDS` array in command-palette.jsx
3. If it summons allies, use `spawnAlly()` from effects.js
4. If it kills enemies, use `aoeKillGhosts()` from effects.js

### New enemy type
1. Create spawn function in arcade-plus.js (use `api.spawnGhost()`)
2. Add to relevant section wave in `WAVES` object
3. Set kind, color, size, speedMul, hp, points, and SVG

### New powerup
1. Add type definition to `TYPES` object in arcade-plus.js
2. Add to relevant spawn pools (section entry, ambient drops, boss drops)

### New Pokemon
1. Add entry to `POKEMON` object in effects.js (use `pokeImg(dexNumber)`)
2. Add summon code to `codes` object: `name: () => summonPokemon('name')`
3. Add to command-palette.jsx COMMANDS array

### New boss
1. Add boss definition to `bosses` object inside `spawnBoss()` in arcade-plus.js
2. Add spawn trigger (section wave, secret boss probability, or code)
