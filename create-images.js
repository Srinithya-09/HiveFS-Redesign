# Simple script to create placeholder cover images
# You can run this with: node create-images.js

const fs = require('fs');
const path = require('path');

// Article cover image data
const articles = [
  {
    slug: 'clark-dean-georgias-future',
    title: "From Biomedical Engineering to Public Service: Clark Dean on Building Georgia's Future",
    color: '#2563eb', // Blue for professional/business theme
    gradient: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)'
  },
  {
    slug: 'jamie-dimon-atlanta',
    title: 'My Key Takeaways from Atlanta Conversation with Jamie Dimon',
    color: '#dc2626', // Gold for leadership/finance theme
    gradient: 'linear-gradient(135deg, #dc2626 0%, #b8860a 100%)'
  },
  {
    slug: 'peach-values-framework',
    title: 'THE PEACH VALUES FRAMEWORK: A Guide to Building High-Performance Culture',
    color: '#8b7d3a', // Gold for culture/values theme
    gradient: 'linear-gradient(135deg, #8b7d3a 0%, #6b5f2e 100%)'
  },
  {
    slug: 'deep-work-day-framework',
    title: 'The Deep Work Day Framework',
    color: '#4a5568', // Purple for productivity/deep work theme
    gradient: 'linear-gradient(135deg, #4a5568 0%, #2d1b69 100%)'
  },
  {
    slug: 'h1b-labor-market-signals',
    title: 'What H-1B Policy Changes Tell Us About Labor Market Signals',
    color: '#059669', // Dark green for economics/data theme
    gradient: 'linear-gradient(135deg, #059669 0%, #1a5f3f 100%)'
  },
  {
    slug: 'middle-class-mirage',
    title: 'THE MIDDLE CLASS MIRAGE: A Guide to Understanding Modern Financial Fragility',
    color: '#64748b', // Brown for financial/economic theme
    gradient: 'linear-gradient(135deg, #64748b 0%, #2d1b69 100%)'
  },
  {
    slug: 'china-deflationary-crisis',
    title: "The Hidden Depth of China's Deflationary Crisis: An Empirical Analysis",
    color: '#dc4446', // Red for global economics theme
    gradient: 'linear-gradient(135deg, #dc4446 0%, #8b0000 100%)'
  }
];

const createCanvas = (width, height, color, gradient) => {
  const canvas = require('canvas').createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Create gradient background
  const grad = ctx.createLinearGradient(135, color, 0, gradient, 1, color, 1);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);
  
  return canvas;
};

const createImage = (article) => {
  const canvas = createCanvas(800, 600, article.color, article.gradient);
  const ctx = canvas.getContext('2d');
  
  // Add title text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Wrap text to fit canvas width
  const maxWidth = 700;
  const words = article.title.split(' ');
  let line = '';
  let y = 300;
  
  for (let i = 0; i < words.length; i++) {
    const testLine = line + ' ' + words[i];
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > maxWidth) {
      if (i > 0) {
        ctx.fillText(line, 400, y);
        line = words[i];
        y += 60;
      } else {
        ctx.fillText(testLine, 400, y);
      }
    }
  }
  
  // Add category badge
  ctx.fillStyle = '#f7f4ee';
  ctx.font = 'bold 16px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(article.category.toUpperCase(), 400, 100);
  
  const buffer = canvas.toBuffer('image/png');
  return buffer;
};

// Create images
articles.forEach((article, index) => {
  const buffer = createImage(article);
  const filename = `images/${article.slug}.jpg`;
  
  fs.writeFileSync(filename, buffer);
  console.log(`Created ${filename}`);
});

console.log('Cover images created successfully!');
console.log('Run: node create-images.js');
