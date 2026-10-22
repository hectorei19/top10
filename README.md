# Top 10

Geography quiz: name the ten countries of a ranking ("The 10 most populous countries", "The 10 countries with the longest coastline"...). A country outside the top 10 costs one of 3 lives.

Part of a family of games, each its own website: [Country Grid](https://hectorei19.github.io/country-grid/), [City Grid](https://hectorei19.github.io/city-grid/), [Connections](https://hectorei19.github.io/connections/) and [Top 10](https://hectorei19.github.io/top10/).

- The page opens on today's list, open and playable on the home screen (like Borderline's grid), with Solo and With friends below.
- Today's list: the same for everyone, new at midnight CET (Spain), one try. Lists come in a shuffled order, so none repeats until all have been used.
- Solo: unlimited practice lists; a shared practice link (`?l=pop-hi`) opens the same list.
- With friends: online rooms for 2 to 6 phones (`?room=ABCD` opens a room's join screen). Everyone plays the same random list and takes turns naming one country: in the top 10 scores a point, outside costs one of your 3 lives; optional turn timer (15 or 30 s). Rooms use Borderline's Firebase Realtime Database (`rooms/ABCD`, marked `game: 'top10'`), so no change to its rules is needed.
- Results and stats are kept on the device (localStorage: `t10-daily`, `t10-free`, `t10-hist`; for rooms `t10-pid`, `t10-setup`, `t10-room`).
- Rankings use only figures Borderline already has, with the sources named in its Credits. Independent countries only. A list is used only when the 10th and 11th places are not tied. There is no "smallest by area" list: the data has no area for Vatican City.

Files:
- `index.html` – the game.
- `firebase-config.js` – the Firebase web config, the same as Borderline's.
- `data.js` – copy of Borderline's data: countries, flags, figures, categories and their descriptions.
- `style.css` – Borderline's styles (colours, fonts, dark mode).
- `games.js` – the Games menu (top left). Each of the three projects has a copy: change it in one, copy it to the other two.
- `minigames.js` – helpers shared with Connections (a copy too).

Publishing a new version: change the `?v=` number after the four files in `index.html`, so phones load the new files.

Data sources and licences: see Credits in [Country Grid](https://hectorei19.github.io/country-grid/).
