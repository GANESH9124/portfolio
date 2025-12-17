# Quick Setup Guide

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to [http://localhost:8010](http://localhost:8010)

## 📁 Adding Images

Place your images in `public/images/` folder:

- **Profile Picture**: `public/images/profile/your-photo.jpg`
- **Project Screenshots**: `public/images/projects/project-name.jpg`
- **Blog Images**: `public/images/blog/blog-post.jpg`
- **Background Images**: `public/images/background/bg-image.jpg`

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to customize the color palette:
- Lakers Purple: `#552583`
- Lakers Gold: `#FDB927`
- Sports Red: `#DC143C`

### Content
- **Home Page**: Edit `components/Hero.tsx`, `components/Skills.tsx`, `components/Education.tsx`
- **About Page**: Edit `app/about/page.tsx`
- **Projects**: Edit `app/projects/page.tsx`
- **Blog**: Edit `app/blog/page.tsx`
- **Contact**: Edit `app/contact/page.tsx`

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 📝 Next Steps

1. Add your profile image to `public/images/profile/`
2. Fill in the About page content
3. Add your projects to the Projects page
4. Add blog posts to the Blog page
5. Customize colors and styling as needed

