# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}


my-react-app/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── robots.txt
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── fonts/
│   │   └── icons/
│   │
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Navbar.tsx
│   │   └── Modal.tsx
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   └── LoginForm.tsx
│   │   └── dashboard/
│   │       └── Chart.tsx
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── useFetch.ts
│   │
│   ├── layouts/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   └── Profile.tsx
│   │
│   ├── services/
│   │   ├── apiClient.ts
│   │   └── authService.ts
│   │
│   ├── store/
│   │   ├── authSlice.ts
│   │   └── store.ts
│   │
│   ├── styles/
│   │   ├── global.css
│   │   └── theme.scss
│   │
│   ├── types/
│   │   ├── User.ts
│   │   └── ApiResponse.ts
│   │
│   ├── utils/
│   │   ├── dateFormatter.ts
│   │   └── validators.ts
│   │
│   ├── config/
│   │   ├── env.ts
│   │   └── router.tsx
│   │
│   └── main.tsx
│
├── package.json
├── vite.config.js
├── tsconfig.json
└── .eslintrc.json

```



See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
