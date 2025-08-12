# Logistics Lynx - Public Website

A modern, SEO-optimized marketing website for the Logistics Lynx TMS platform, built with Next.js 14, TypeScript, and Tailwind CSS.

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

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3001](http://localhost:3001)

## 📁 Project Structure

```
public-website/
├── app/                    # Next.js 14 App Router
│   ├── globals.css        # Global styles and Tailwind
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Home page
├── components/            # Reusable React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── HeroSection.tsx    # Hero section
│   ├── FeaturesSection.tsx # Features showcase
│   ├── SolutionsSection.tsx # Role-based solutions
│   ├── TestimonialsSection.tsx # Customer testimonials
│   ├── CTASection.tsx     # Call-to-action
│   └── theme-provider.tsx # Dark/light mode
├── public/               # Static assets
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── next.config.js        # Next.js configuration
```

## 🎨 Features

### Core Features
- **Modern Design**: Clean, professional design with dark/light mode support
- **Responsive**: Mobile-first design that works on all devices
- **SEO Optimized**: Built-in SEO with metadata, Open Graph, and structured data
- **Performance**: Optimized for speed with Next.js 14 and Tailwind CSS
- **Accessibility**: WCAG compliant with proper semantic HTML and ARIA labels

### Sections
1. **Hero Section**: Compelling headline with stats and CTAs
2. **Features Section**: 12 key platform features with icons and descriptions
3. **Solutions Section**: Role-based solutions for different user types
4. **Testimonials Section**: Customer reviews with interactive carousel
5. **CTA Section**: Final call-to-action with benefits

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Beautiful, customizable icons
- **Framer Motion**: Smooth animations and transitions
- **Next Themes**: Dark/light mode with system preference detection

## 🛠 Development

### Available Scripts

```bash
npm run dev          # Start development server (port 3001)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Adding New Pages

1. Create a new file in `app/` directory (e.g., `app/about/page.tsx`)
2. Export a default React component
3. The page will be available at `/about`

### Adding New Components

1. Create a new file in `components/` directory
2. Use TypeScript interfaces for props
3. Follow the existing naming conventions
4. Add proper JSDoc comments for complex components

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow the design system defined in `tailwind.config.js`
- Use the custom CSS classes defined in `globals.css`
- Maintain consistent spacing and typography

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Self-hosted servers

## 🔧 Configuration

### Environment Variables

Copy `env.example` to `.env.local` and configure:

```bash
# Required
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_HOTJAR_ID=your_hotjar_id
NEXT_PUBLIC_CONTACT_EMAIL=contact@logisticslynx.com
```

### Customization

#### Colors
Edit the color palette in `tailwind.config.js`:
```javascript
colors: {
  primary: {
    50: '#eff6ff',
    // ... other shades
    900: '#1e3a8a',
  }
}
```

#### Typography
The site uses Inter font family. To change:
1. Update the font import in `globals.css`
2. Modify the `fontFamily` in `tailwind.config.js`

#### Content
Update the content in each component file:
- `HeroSection.tsx` - Main headline and stats
- `FeaturesSection.tsx` - Platform features
- `SolutionsSection.tsx` - Role-based solutions
- `TestimonialsSection.tsx` - Customer reviews

## 📊 Analytics

The site is prepared for analytics integration:

- **Google Analytics 4**: Add your GA4 ID to environment variables
- **Hotjar**: Add your Hotjar ID for user behavior tracking
- **Custom Events**: Track button clicks and form submissions

## 🔒 Security

- Environment variables for sensitive data
- No hardcoded API keys or secrets
- HTTPS enforcement in production
- Content Security Policy headers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is part of the Logistics Lynx TMS platform.

## 🆘 Support

For support and questions:
- Email: contact@logisticslynx.com
- Documentation: [Coming Soon]
- Issues: Create an issue in the repository

---

**Built with ❤️ for the logistics industry**
