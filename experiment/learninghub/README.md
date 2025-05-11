# Learning Hub

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Environment Variables

This project uses environment variables for API keys and configuration. 

1. Copy the `.env.example` file to a new file called `.env.local` (which will be ignored by git)
2. Add your actual API keys to the `.env.local` file:

```
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

**Note**: In Vite, environment variables must be prefixed with `VITE_` to be exposed to your application.

If you don't set up the environment variable, the app will prompt you to enter your API key manually.
