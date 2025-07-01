# 📖 Bible Reader App

A cross-platform Bible reader built with [Expo Router](https://expo.github.io/router/), supporting custom fonts, dark/light mode, chapter navigation, and note-taking.

---

## ✨ Features

- 📚 Browse and read Bible chapters
- 🌗 Dark and light mode support
- 📝 Create and manage notes per chapter
- 🔤 Custom font support (Cardo, Day Roman)
- 🧭 Tab navigation (Home, Daily, Notes)
- 📱 Mobile-optimized layout

---

## 🛠️ Tech Stack

- [React Native](https://reactnative.dev/)
- [Expo Router](https://expo.github.io/router/)
- [TypeScript](https://www.typescriptlang.org/)
- [Ionicons](https://ionic.io/ionicons)
- Custom `.ttf` font support

---

## 📁 Folder Structure

```

app/
├── (tabs)/             # Main tab layout
│   ├── index.tsx       # Home screen
│   ├── daily.tsx       # Daily reading screen
│   ├── notes.tsx       # Notes per chapter
│   └── \_layout.tsx     # Tab navigation config
├── \[book]/             # Dynamic book route
│   └── chapters/       # Chapter view screens
│       └── \_layout.tsx # Stack layout for chapters
├── +not-found.tsx      # 404 page
└── \_layout.tsx         # Root layout

````

---

## 🧑‍💻 Getting Started

1. **Clone the repo:**

   ```bash
   git clone https://github.com/your-username/bible-reader.git
   cd bible-reader
````

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the app:**

   ```bash
   npx expo start
   ```

---

## 🔤 Custom Fonts

This project uses the following fonts (located in the `fonts/` directory):

* `Cardo-Regular.ttf`
* `Cardo-Bold.ttf`
* `Cardo-Italic.ttf`
* `day-roman.regular.ttf`

Fonts are loaded globally via a shared `styles.css` or within the app’s `_layout.tsx`.

---

## 🌙 Dark/Light Mode

Supports system dark mode using `useColorScheme()` and conditional theming.

---

## 📌 Notes Screen

Users can write and save notes per book/chapter combo. Notes are currently stored locally.

---

## 📦 Coming Soon

* 🔄 Cloud sync support (Supabase/Firebase)
* 🗂 Bookmarks
* 📖 Reading plans
* 🌍 Multiple translations

---

## 🪪 License

MIT License © Richard Larsson Ivarsson

