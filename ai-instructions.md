# 🚀 AI Instructions & Best Practices for Next.js 13.2.1 Application

## 🗂️ Project Structure Example

```
/project-root
├── components/           # 🧩 Reusable UI components
├── pages/                # 📄 Next.js pages (routes)
├── public/               # 🖼️ Static assets (images, static flies etc.)
├── styles/               # 🎨 Global and modular styles with tailwindcss
├── types/                # 🏷️ Shared TypeScript types and interfaces
├── utils/                # 🛠️ Utility functions and helpers
├── redux/                # 🔄 Redux store and slices (if using Redux)
├── node_modules/         # 📦 Node.js dependencies
├── .next/                # ⚡ Next.js build output (auto-generated)
├── .gitignore            # 🚫 Git ignore rules
├── package.json          # 📦 Project metadata and dependencies
├── tsconfig.json         # 📝 TypeScript configuration
├── tailwind.config.js    # 🌈 Tailwind CSS configuration
├── postcss.config.js     # 🧬 PostCSS configuration
├── next.config.js        # ⚙️ Next.js configuration
├── README.md             # 📘 Project overview and instructions
└── ai-instructions.md    # 🤖 AI and best practices documentation
```

This structure helps keep codebase organized and maintainable. Adjust as needed for project's requirements.

# 🚀 AI Instructions & Best Practices for Next.js 13.2.1 Application

This document outlines best practices for developing and maintaining this Next.js 13.2.1 project. Follow these guidelines to ensure code quality, maintainability, and performance.

## 1️⃣ Project Structure
- 🗂️ **Organize by Feature:** Group related components, hooks, and utilities by feature/domain.
- 🏷️ **Types:** Place shared TypeScript types and interfaces in the `types/` directory for reusability.
- 🧩 **Components:** Use the `components/` directory for reusable UI components. Prefer functional components.
- 📄 **Pages:** Use the `pages/` directory for route-based components. Keep page files focused on layout and data fetching.

## 2️⃣ TypeScript Usage
- 🛡️ **Type Safety:** Always use TypeScript for type safety. Define explicit types for props, state, and function signatures.
- 🏷️ **Centralize Types:** Export shared types/interfaces from `types/` and import them where needed.
- 🚫 **Avoid `any`:** Use specific types instead of `any` whenever possible.

## 3️⃣ Component Best Practices
- ⚛️ **Functional Components:** Use React functional components and hooks (`useState`, `useEffect`, etc.).
- 🏷️ **Props Typing:** Type all component props using TypeScript interfaces or types.
- 🧠 **Separation of Concerns:** Keep components focused. Extract logic into hooks or utility functions when possible.
- 🧮 **Memoization:** Use `useMemo` and `useCallback` to optimize performance for expensive calculations or functions passed as props.

## 4️⃣ State Management
- 🏠 **Local State:** Use React's built-in state management (`useState`, `useReducer`) for local state.
- 🌐 **Global State:** Use Redux, Zustand, or Context API for global state. Keep global state minimal.
- 🪝 **Avoid Prop Drilling:** Use context or state management libraries to avoid deeply nested prop passing.

## 5️⃣ Styling
- 🎨 **Tailwind CSS:** Use Tailwind CSS utility classes for styling. Keep custom CSS minimal and scoped.
- 🖌️ **Consistent Design:** Follow a consistent design system. Use shared style configurations and variables.
- 📱 **Responsive Design:** Ensure components are responsive and accessible.

## 6️⃣ Data Fetching
- 🖥️ **Server Components:** Use Next.js server components and data fetching methods (`getServerSideProps`, `getStaticProps`) where appropriate.
- 🔄 **Client Fetching:** Used Axios (we can also Use SWR or React Query) for client-side data fetching and caching.
- ⚠️ **Error Handling:** Always handle loading and error states in UI.

## 7️⃣ Performance
- ✂️ **Code Splitting:** Leverage Next.js dynamic imports for code splitting and lazy loading.
- 🖼️ **Image Optimization:** Use Next.js `<Image />` for optimized images.
- 🚀 **Avoid Unnecessary Renders:** Use React.memo and memoization hooks to prevent unnecessary re-renders.

## 8️⃣ Version Control
- 📝 **Commits:** Write clear, descriptive commit messages.
- 🌿 **Branching:** Use feature branches for new features and bug fixes. Merge via pull requests.
- 👀 **Reviews:** Require code reviews for all merges to main branches.

## 9️⃣ Documentation
- 📘 **README:** Keep the `README.md` up to date with setup, usage, and deployment instructions.
- 📝 **Inline Docs:** Use JSDoc/TSDoc comments for complex logic and exported functions.
- 🗒️ **Changelogs:** Maintain a changelog for major updates.

---

_Adhering to these best practices will help ensure a robust, maintainable, and scalable Next.js application._ 