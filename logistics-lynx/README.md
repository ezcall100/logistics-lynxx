# Trans Bot AI - Autonomous TMS Platform

## 🚀 Quick Start

This is a React + TypeScript + Vite application with autonomous agent capabilities.

### Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Build for Development (Lovable AI)
```bash
npm run build:dev
```

## 📁 Project Structure

- `src/App.tsx` - Main application component with autonomous agent portal system
- `src/main.tsx` - Application entry point
- `tsconfig.lovable.json` - TypeScript configuration for Lovable AI
- `vite.config.ts` - Vite build configuration

## 🔧 Configuration

### TypeScript Configuration
- **Main**: `tsconfig.json` (read-only)
- **Build**: `tsconfig.build.json`
- **Lovable AI**: `tsconfig.lovable.json` (recommended for Lovable)

### Build Scripts
- `npm run dev` - Start development server
- `npm run build:dev` - Build for development (uses tsconfig.lovable.json)
- `npm run build` - Build for production

## 🌐 Access Points

- **Development Server**: http://localhost:8080 (or next available port)
- **Main Portal**: http://localhost:8080/ (autonomous agent portal system)
- **Canonical Portals**: 20 production portals accessible via navigation

## 🎯 Key Features

- **Autonomous Agent System**: 24/7 no-human operations
- **20 Canonical Portals**: Consolidated portal system
- **Portal Decommission**: Deprecated routes return 410 Gone
- **Real-time Monitoring**: System health and performance tracking

## 📝 Notes for Lovable AI

- Use `tsconfig.lovable.json` for TypeScript compilation
- The main `tsconfig.json` is read-only - do not attempt to modify it
- JSX is configured as `"react-jsx"` in the Lovable config
- All DOM types are properly included in the configuration
