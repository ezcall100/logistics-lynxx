# Logistics Lynx - Public Website

Next.js 14 marketing website for the Logistics Lynx TMS platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   cd public-website
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your actual values
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3001](http://localhost:3001)

## 📁 Project Structure

```
public-website/
├── app/                    # Next.js 14 app directory
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── HeroSection.tsx    # Hero section
│   ├── FeaturesSection.tsx # Features showcase
│   ├── SolutionsSection.tsx # Role-based solutions
│   ├── TestimonialsSection.tsx # Customer testimonials
│   ├── CTASection.tsx     # Call-to-action
│   └── theme-provider.tsx # Dark/light mode provider
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── next.config.js         # Next.js configuration
└── tsconfig.json          # TypeScript configuration
```

## 🎨 Features

- **Next.js 14** with App Router
- **Tailwind CSS** for styling
- **Dark/Light Mode** toggle
- **Responsive Design** mobile-first approach
- **SEO Optimized** with metadata
- **TypeScript** for type safety
- **Lucide React** icons
- **Framer Motion** animations (ready to add)

## 📱 Pages Structure

- **Home** (`/`) - Landing page with hero, features, solutions, testimonials
- **Solutions** (`/solutions/*`) - Role-specific solution pages
- **Features** (`/features`) - Detailed feature showcase
- **Pricing** (`/pricing`) - Pricing plans and comparison
- **Resources** (`/resources`) - Blog, documentation, webinars
- **Contact** (`/contact`) - Contact form and information
- **Auth** (`/login`, `/signup`) - Authentication pages

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Adding New Pages

1. Create a new directory in `app/` for your route
2. Add a `page.tsx` file for the main page
3. Add `layout.tsx` if you need a custom layout
4. Update navigation in `components/Header.tsx`

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow the established color scheme (primary-600, gray-900, etc.)
- Maintain dark mode compatibility
- Use responsive design patterns
- Keep components modular and reusable

## 🌐 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Use `npm run build` and deploy `out/` directory
- **AWS Amplify**: Configure build settings for Next.js
- **Docker**: Use the provided Dockerfile

## 🔗 Integration

### Supabase Integration
The website is configured to integrate with Supabase for:
- Authentication (login/signup)
- Contact form submissions
- Analytics tracking
- CMS content management

### Analytics
- Google Analytics 4 ready
- Hotjar for user behavior tracking
- Custom event tracking setup

## 📄 License

This project is part of the Logistics Lynx TMS platform.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

**Task #001 Complete** ✅ - Next.js Public Website Scaffold
