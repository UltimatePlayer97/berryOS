# 🍓 berryOS

<img width="1299" height="682" alt="image" src="https://github.com/user-attachments/assets/77634316-ef53-4521-914e-b4ba06cdecbd" />


🚀 **[Try berryOS Live Here](https://ultimateplayer97.github.io/berryOS/)**
---

## 💭 What is it?
a web-based desktop environment, inspired by macOS, built for speed and simplicity.

First starting as a simple HTML, CSS, and JavaScript project, it evolved into a full SvelteKit app, boasting a robust decentralised app component system. alongside a theming system, all built from the ground up. Components were used from Shadcn, as I did not want to waste hours of my life making subpar components like switches and sliders just for someone to do it much better than I can. I wish to build on this project continuously, adding onto it as I go, who knows, maybe I will make it into a full-blown Linux desktop environment one day :)

## 🛠️ Built With

* **Framework:** [Svelte 5](https://svelte.dev/)
* **Styling:** [Tailwind](https://tailwindcss.com/)
* **Icons:** [Iconify](https://iconify.design/)
* **Components:** [Shadcn Svelte](https://www.shadcn-svelte.com/)
---

## 🗺️ Roadmap
- [ ] **IndexedDB File System**: Utilize `Dexie.js` to enable virtual hard disks and databases for the notes app.
- [ ] **Persistent Storage**: Cache theme variables and active wallpaper assets into local memory so settings persisteven after the window refreshes.
- [ ] **App Expansion**: Roll out a terminal emulator and a media streaming application player dashboard, alongside a possible browser implementation

---

## 📦 Getting Started

Wanna contribute or just check it out locally? No worries, here are the steps.

### Prerequisites
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
Open `http://localhost:5173` in your browser to inspect your development server.

### Build for production
```
bun run build
```

Static files are generated inside the `build/` directory. To preview the production environment run:
```
bun run preview
```
