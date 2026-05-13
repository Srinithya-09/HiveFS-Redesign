const fs = require('fs');
const path = require('path');

// Generate AI-inspired images based on article titles and categories
const generateAIBasedImages = () => {
  const blogDataPath = path.join(__dirname, 'lib/blog-data.ts');
  let blogData = fs.readFileSync(blogDataPath, 'utf8');
  
  // AI-generated image URLs based on article themes
  const aiImageMappings = {
    // Strategy Articles - Professional/Business themes
    'jamie-dimon-atlanta': 'https://images.unsplash.com/photo-1552664730-df9b9c5387c7?w=800&h=600&fit=crop&crop=entropy&auto=format', // Leadership/Finance
    'life-design-mastery': 'https://images.unsplash.com/photo-1507003211169-0a1f7fcc8e9?w=800&h=600&fit=crop&crop=entropy&auto=format', // Personal Development
    'election-integrity': 'https://images.unsplash.com/photo-1586950150699-559006b7a639?w=800&h=600&fit=crop&crop=entropy&auto=format', // Government/Politics
    
    // Operations Articles - Productivity/Culture themes
    'peach-values-framework': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=entropy&auto=format', // Team/Culture
    'h1b-labor-market-signals': 'https://images.unsplash.com/photo-1451187580451-4a9078039fec?w=800&h=600&fit=crop&crop=entropy&auto=format', // Data/Analytics
    
    // Growth Articles - Economic/Financial themes
    'lenders-labor-market': 'https://images.unsplash.com/photo-1611974789852-6c82a0f0aca?w=800&h=600&fit=crop&crop=entropy&auto=format', // Economics/Finance
    'middle-class-mirage': 'https://images.unsplash.com/photo-1563989148208-2c55c82f3821?w=800&h=600&fit=crop&crop=entropy&auto=format', // Financial/Wealth
    'private-credit-democratization': 'https://images.unsplash.com/photo-1559516245-6b9f2f8d7f1?w=800&h=600&fit=crop&crop=entropy&auto=format', // Investment/Finance
    'economic-cycles': 'https://images.unsplash.com/photo-1611974789852-6c82a0f0aca?w=800&h=600&fit=crop&crop=entropy&auto=format', // Economics/Markets
    
    // AI Articles - Technology/Future themes
    'quantum-ai-convergence': 'https://images.unsplash.com/photo-1677444618835-7215d8d9a7e?w=800&h=600&fit=crop&crop=entropy&auto=format', // AI/Tech
    'rethinking-ai-agent-architecture': 'https://images.unsplash.com/photo-1555947250-90d4-5d5afedd1e0d?w=800&h=600&fit=crop&crop=entropy&auto=format', // Code/Architecture
    'ai-search-optimization': 'https://images.unsplash.com/photo-1467231983587-5d815d28dbd?w=800&h=600&fit=crop&crop=entropy&auto=format', // Search/Digital
    'godfather-of-ai-warning': 'https://images.unsplash.com/photo-1677444618835-7215d8d9a7e?w=800&h=600&fit=crop&crop=entropy&auto=format', // AI/Safety
    'fluid-intelligence': 'https://images.unsplash.com/photo-1517021895595-a6dba8fb278?w=800&h=600&fit=crop&crop=entropy&auto=format', // AI/Future
    'api-to-mcp-transformation': 'https://images.unsplash.com/photo-155876913233-78510d2fe4ea?w=800&h=600&fit=crop&crop=entropy&auto=format', // Integration/Tech
    'ai-coding-productivity': 'https://images.unsplash.com/photo-15134753820-6d24dcfa04f8?w=800&h=600&fit=crop&crop=entropy&auto=format' // Code/Productivity
  };
  
  // Update blog data with AI-generated images
  Object.entries(aiImageMappings).forEach(([slug, imageUrl]) => {
    const regex = new RegExp(`(slug:\\s*'${slug}'[^}]*image:\\s*)null`, 'g');
    const replacement = `$1"${imageUrl}"`;
    
    if (blogData.match(regex)) {
      blogData = blogData.replace(regex, replacement);
      console.log(`✅ Updated ${slug} with AI-generated image`);
    }
  });
  
  // Write updated blog data back
  fs.writeFileSync(blogDataPath, blogData, 'utf8');
  console.log('✅ Updated blog-data.ts with AI-generated images based on article themes!');
};

// Run the function
generateAIBasedImages();
