# A Little World For My Wifey — V3 Ultimate Edition

A mobile-first, pastel pink and lavender digital scrapbook made with HTML, CSS, and vanilla JavaScript.

## Included
- 15 chapters with editable starter text and personal-memory fields.
- Animated cover and envelope-style letters.
- Chapter navigation and reading progress; final gift unlocks after all 15 chapters are explored.
- Six "Open When..." letters and three letters from Hubby.
- Flip cards, editable timeline, editable memories, and saved checklist items.
- Photo uploader with multiple selection, captions, full-screen viewing, remove controls, and IndexedDB storage.
- Scratch-to-reveal message, flower message, virtual hug, and a small memory quiz.
- Background music player with play/pause.
- Responsive Android-first layout, reduced-motion support, and optional PWA/offline shell.

## Open on Android
1. Extract the ZIP.
2. Open the extracted folder in Acode, Spck Editor, TrebEdit, or another HTML editor.
3. Open `index.html` using its Preview / Run option. A local server preview is recommended.
4. For install/offline support, serve the folder over localhost or HTTPS, then use your browser's Add to Home Screen option.

## Add music
Place an MP3 you have permission to use at:
`assets/music/background.mp3`
Then open the scrapbook and tap **Music off**. Browsers require a user tap before audio can start.

## Add photos
The Gallery chapter has an **Add our photos** button. Choose multiple photos from your phone. The scrapbook stores resized copies in IndexedDB in that browser on that device, and you can edit captions or remove photos.
Important: browser storage is local to that browser/device. It does not automatically sync to another phone. Keep your original photos backed up.

## Personalize
- Main chapter wording: `index.html`
- Letter content: `js/content.js`
- Colors and typography: `css/main.css`
- Paper textures and cards: `css/scrapbook.css`
- Animations: `css/animations.css`
- Mobile layout: `css/mobile.css`

Tap the editable sample text in chapters to personalize it; those edits are saved locally in the browser. Add real dates to the timeline. No dates or personal events have been invented.

## Notes
- The music file is not included; add your own MP3.
- No personal photos are included; upload your own through the Gallery chapter.
- The scrapbook does not require an account or password.
- Local storage can be cleared by the browser, so keep a copy of your important original photos and wording.
