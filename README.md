# 🚀 React + Vite Starter

Welcome to your React project powered by [Vite](https://vitejs.dev/)!  
This template provides a minimal setup to get React working with Vite, including HMR (Hot Module Replacement) and ESLint integration.

## ✨ Features

- ⚡️ Fast development with Vite
- 🔥 Hot Module Replacement (HMR)
- 🧹 ESLint for code quality
- 🛠️ Easy plugin integration

## 🧩 Plugins

Currently, two official plugins are available:

- [`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) — uses [Babel](https://babeljs.io/) for Fast Refresh
- [`@vitejs/plugin-react-swc`](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) — uses [SWC](https://swc.rs/) for Fast Refresh

## 🏁 Getting Started

1. **Install dependencies**  
   ```bash
   npm install
   ```

2. **Start development server**  
   ```bash
   npm run dev
   ```

3. **Build for production**  
   ```bash
   npm run build
   ```

4. **Preview production build**  
   ```bash
   npm run preview
   ```

## 🧑‍💻 Recommended Setup

For production applications, we recommend using TypeScript with type-aware lint rules enabled.  
Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on integrating TypeScript and [`typescript-eslint`](https://typescript-eslint.io).

## 📂 Project Structure

```
├── public/         # Static assets
├── src/            # Source code
│   ├── App.jsx     # Main React component
│   └── main.jsx    # Entry point
├── package.json    # Project metadata & scripts
├── vite.config.js  # Vite configuration
└── README.md       # Project documentation
```

## 📚 Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [ESLint Documentation](https://eslint.org/)

## 📝 License

This project is licensed under the MIT License.

---

Happy coding!