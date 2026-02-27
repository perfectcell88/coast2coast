# Coast to Coast Trucking Boats Thailand

A professional, modern website for **Coast to Coast Trucking Boats Thailand**, specialists in oversized boat transport between Thailand's east and west coasts.

## 🚢 About the Business

Coast to Coast Trucking Boats Thailand is a specialist marine logistics company providing safe, reliable vessel transport services. We operate major routes including Pattaya, Chumphon, Ranong, and Phuket, with typical transport times of 4–5 days from Pattaya to Phuket.

**Key Services:**
- Oversized boat trucking across Thailand
- East Coast to West Coast vessel relocation
- Professional loadmaster services
- Ticketed captains & marine engineers
- Secure hauling & transport logistics
- End-to-end coordination

## 🌐 Website Features

### Pages
- **Home**: Hero section with key value propositions and CTA
- **About**: Company mission, vision, and core values
- **Services**: Detailed service offerings and transport process
- **Service Areas**: Coverage map and route information (Pattaya, Chumphon, Ranong, Phuket)
- **Why Choose Us**: Competitive advantages and testimonials
- **Contact**: Contact form, direct communication channels, and business hours

### Design Philosophy
**Modern Maritime Minimalism** featuring:
- Deep navy (#0F3A5C) primary color representing ocean depth and trust
- Teal (#1B7A8C) accents for energy and modernity
- Cream (#F8F6F1) backgrounds for warmth and readability
- Playfair Display serif font for premium headlines
- Poppins sans-serif for clean, modern body text
- Asymmetric layouts with generous whitespace
- Subtle wave SVG dividers between sections

### SEO Optimization
The website is optimized for keywords including:
- Thailand boat transport
- Oversized boat trucking Thailand
- Pattaya to Phuket boat transport
- Yacht transport Thailand
- Marine logistics Thailand

## 🛠️ Tech Stack

- **Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4
- **Routing**: Wouter (lightweight client-side router)
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: pnpm

## 📁 Project Structure

```
client/
  public/          # Static assets (favicon, robots.txt, manifest.json)
  src/
    pages/         # Page components (Home, About, Services, etc.)
    components/    # Reusable UI components (Navigation, Footer)
    contexts/      # React contexts (ThemeContext)
    lib/           # Utility helpers
    App.tsx        # Main app with routing
    main.tsx       # React entry point
    index.css      # Global styles and design tokens
  index.html       # HTML template with Google Fonts
package.json       # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 22+
- pnpm (or npm/yarn)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd coast-to-coast-trucking-boats-thailand

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
# Build the project
pnpm build

# Preview production build
pnpm preview
```

## 📝 Customization

### Update Contact Information
Edit `/client/src/components/Footer.tsx` and `/client/src/pages/Contact.tsx` to add:
- Phone number
- Email address
- WhatsApp link
- Business hours

### Modify Colors
Update the color palette in `/client/src/index.css`:
- `--color-navy`: Primary brand color
- `--color-teal`: Accent color
- `--color-cream`: Background color
- `--color-slate`: Text color

### Update Images
Replace image URLs in page components with your own hosted images:
- Hero image in `Home.tsx`
- Team image in `About.tsx`
- Loadmaster image in `Services.tsx`
- Port facilities images in `ServiceAreas.tsx`

## 🔗 Social Media Integration

The website includes a Facebook link button in the footer and contact page:
- Facebook: https://www.facebook.com/profile.php?id=61588477663667&sk=about

Update this link in:
- `/client/src/components/Footer.tsx`
- `/client/src/pages/Contact.tsx`

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Mobile devices (320px and up)
- Tablets (768px and up)
- Desktop (1024px and up)
- Large screens (1280px and up)

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance
- Focus indicators on interactive elements

## 🔍 SEO Features

- Meta tags for title and description
- Open Graph tags for social sharing
- Semantic HTML structure
- Mobile-friendly design
- Fast loading times
- Structured data ready

## 📦 Deployment

### GitHub Pages

This project includes GitHub Actions workflow for automatic deployment to GitHub Pages.

1. Push to the `main` branch
2. GitHub Actions will automatically build and deploy
3. Site will be available at `https://<username>.github.io/coast-to-coast-trucking-boats-thailand`

### Other Hosting Options

The built files in `dist/public` can be deployed to:
- Netlify
- Vercel
- AWS S3
- Any static hosting service

## 📄 License

This project is proprietary to Coast to Coast Trucking Boats Thailand.

## 📞 Contact

For inquiries about the website or business services:
- Email: info@coasttocoast.co.th
- Phone: +66 (0) XXX-XXXX
- WhatsApp: [Link in website]
- Facebook: https://www.facebook.com/profile.php?id=61588477663667&sk=about

---

**Built with ❤️ for Coast to Coast Trucking Boats Thailand**
