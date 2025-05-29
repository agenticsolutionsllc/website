# Agentic Solutions Website

A modern, elegant website for Agentic Solutions - a company specializing in custom AI agents for small and medium businesses.

## Features

### Design
- **Dark Theme**: Professional dark color palette with blue and purple accents
- **Modern UI**: Clean, minimalist design with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Accessibility**: High contrast colors and semantic HTML for better accessibility

### Sections
1. **Hero Section**: Eye-catching introduction with floating animation cards
2. **About AI Agents**: Educational section explaining what AI agents are and their benefits
3. **Services**: Overview of all services including the featured All-Inclusive AI Package
4. **Solutions**: Detailed descriptions of specific AI agent types:
   - Document Processing Agent
   - Customer Service Agent
   - Booking & Scheduling Agent
   - Data Entry Agent
   - Social Media Agent
   - Business Insights Agent
5. **Consultation Form**: Interactive form with budget range selection
6. **Footer**: Contact information and quick links

### Interactive Features
- Smooth scrolling navigation
- Mobile-responsive hamburger menu
- Parallax effects on scroll
- Form validation with visual feedback
- Success/error notifications
- Fade-in animations on scroll
- Hover effects on cards
- Active navigation highlighting

## Setup Instructions

1. **Open the Website**
   - Simply open `index.html` in a web browser
   - No server setup required for basic functionality

2. **For Development**
   ```bash
   # Navigate to the website directory
   cd agentic-solutions-website
   
   # Open in your preferred browser
   open index.html  # macOS
   # or
   start index.html  # Windows
   # or
   xdg-open index.html  # Linux
   ```

3. **For Production**
   - Upload all files to your web hosting service
   - Ensure the directory structure is maintained:
     ```
     /
     ├── index.html
     ├── css/
     │   └── style.css
     ├── js/
     │   └── script.js
     └── README.md
     ```

## Customization

### Colors
Edit the CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #3b82f6;      /* Blue */
    --secondary-color: #8b5cf6;    /* Purple */
    --accent-color: #06b6d4;       /* Cyan */
    --dark-bg: #0f172a;            /* Dark background */
    /* ... more color variables */
}
```

### Content
- Edit text content directly in `index.html`
- Update contact information in the footer
- Modify form fields as needed

### Form Backend
The consultation form currently simulates submission. To make it functional:
1. Replace the form submission code in `js/script.js`
2. Set up a backend endpoint to receive form data
3. Update the email address and phone number

## Technologies Used
- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript
- Font Awesome Icons
- Google Fonts (Inter)

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Future Enhancements
- Add a blog section
- Implement case studies/portfolio
- Add testimonials section
- Integrate with a CMS
- Add multi-language support
- Implement live chat feature

## License
© 2024 Agentic Solutions. All rights reserved. 