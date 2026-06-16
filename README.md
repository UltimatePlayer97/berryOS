# 🍓 berryOS

A sleek, highly responsive web-based desktop environment and OS simulation inspired by the aesthetics of macOS, built entirely with modern frontend technologies.

🚀 **[Try berryOS Live Here](https://ultimateplayer97.github.io/berryOS/)**
---

## 🛠️ Built With

* **Framework:** [Svelte 5](https://svelte.dev/)
* **Styling:** [Tailwind](https://tailwindcss.com/)
* **Icons:** [Iconify](https://iconify.design/)
* **Components:** [Shadcn Svelte](https://www.shadcn-svelte.com/)
---

## 🗺️ Roadmap
- [ ] **IndexedDB File System**: Establish virtual hard-drive tracking hooks `Dexie.js` so users can permanently save local notes files across application boot states.
- [ ] **Persistent Storage**: Cache theme variables and active wallpaper assets into local memory blocks so settings persist after browser refreshes.
- [ ] **App Expansion**: Roll out a custom terminal simulator and a media streaming application player dashboard, alongside a possible browser implementation

---

## 📦 Getting Started

If you want to pull down the workspace to inspect or expand the application engine locally:

### Prerequesteries
- [NodeJS](https://nodejs.org/en/download)
- [Bun](https://bun.sh/)

### Clone the repository
```bash
git clone [https://github.com/ultimateplayer97/berryOS.git](https://github.com/ultimateplayer97/berryOS.git)
cd berryOS
```

### Install dependencies
```
bun install
```
### Run development server
```
bun run dev
```
Open `http://localhost:5173` in your browser to inspect your live workspace!

### Build for production
```
bun run build
```

Static files are generated inside the `build/` directory. To preview the production environment run
```
bun run preview
```
