const https = require('https');
const { JSDOM } = require('jsdom');

async function fetchOgImage(url) {
  try {
    const response = await https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const html = response.data;
    const dom = new JSDOM(html);
    const metaTags = dom.window.document.querySelectorAll('meta[property^="og:image"]');
    
    if (metaTags.length > 0) {
      return metaTags[0].getAttribute('content');
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching og:image for ${url}:`, error.message);
    return null;
  }
}

async function updateArticlesWithOgImages() {
  const fs = require('fs');
  const path = require('path');
  
  // Read the current blog data
  const blogDataPath = path.join(__dirname, 'lib/blog-data.ts');
  let blogData = fs.readFileSync(blogDataPath, 'utf8');
  
  // Find all articles in the array
  const articleRegex = /{\s*slug:\s*'([^']+)'/g;
  const articles = [];
  let match;
  
  while ((match = articleRegex.exec(blogData)) !== null) {
    const articleStart = match.index;
    const articleEnd = blogData.indexOf('}', articleStart);
    const articleText = blogData.substring(articleStart, articleEnd + 1);
    
    // Parse article data
    const slugMatch = /slug:\s*'([^']+)'/g.exec(articleText);
    const titleMatch = /title:\s*"([^"]+)"/g.exec(articleText);
    const categoryMatch = /category:\s*"([^"]+)"/g.exec(articleText);
    const summaryMatch = /summary:\s*"([^"]+)"/g.exec(articleText);
    const excerptMatch = /excerpt:\s*"([^"]+)"/g.exec(articleText);
    const authorMatch = /author:\s*"([^"]+)"/g.exec(articleText);
    const readTimeMatch = /readTime:\s*"([^"]+)"/g.exec(articleText);
    const dateMatch = /date:\s*"([^"]+)"/g.exec(articleText);
    const externalUrlMatch = /externalUrl:\s*"([^"]+)"/g.exec(articleText);
    
    if (slugMatch && titleMatch && categoryMatch && summaryMatch && excerptMatch && authorMatch && readTimeMatch && dateMatch && externalUrlMatch) {
      const article = {
        slug: slugMatch[1],
        title: titleMatch[1],
        category: categoryMatch[1],
        summary: summaryMatch[1],
        excerpt: excerptMatch[1],
        author: authorMatch[1],
        readTime: readTimeMatch[1],
        date: dateMatch[1],
        externalUrl: externalUrlMatch[1],
        image: null // Will be set after fetching
      };
      
      articles.push(article);
    }
  }
  
  console.log(`Found ${articles.length} articles to process...`);
  
  // Fetch og:image for each article
  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    
    if (article.externalUrl) {
      console.log(`Fetching og:image for: ${article.title}`);
      const ogImage = await fetchOgImage(article.externalUrl);
      
      if (ogImage) {
        article.image = ogImage;
        console.log(`✅ Found og:image for ${article.title}: ${ogImage}`);
      } else {
        console.log(`❌ No og:image found for ${article.title}`);
        article.image = null;
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } else {
      console.log(`No external URL for: ${article.title}`);
      article.image = null;
    }
  }
  
  // Rebuild the blog data with updated images
  let updatedBlogData = blogData;
  
  articles.forEach(article => {
    const articleText = `{
    slug: '${article.slug}',
    category: '${article.category}',
    title: ${article.title ? `"${article.title.replace(/"/g, '\\"')}" : null},
    summary: ${article.summary ? `"${article.summary.replace(/"/g, '\\"')}" : null},
    excerpt: ${article.excerpt ? `"${article.excerpt.replace(/"/g, '\\"')}" : null},
    author: ${article.author ? `"${article.author.replace(/"/g, '\\"')}" : null},
    readTime: ${article.readTime ? `"${article.readTime.replace(/"/g, '\\"')}" : null},
    date: ${article.date ? `"${article.date.replace(/"/g, '\\"')}" : null},
    image: ${article.image ? `"${article.image}" : null},
    externalUrl: ${article.externalUrl ? `"${article.externalUrl.replace(/"/g, '\\"')}" : null}
  }`;
    
    // Replace the old article in the blog data
    const oldArticleRegex = new RegExp(`{\\s*slug:\\s*'${article.slug}'[^}]*}`, 'g');
    updatedBlogData = updatedBlogData.replace(oldArticleRegex, articleText);
  });
  
  // Write the updated blog data back
  fs.writeFileSync(blogDataPath, updatedBlogData, 'utf8');
  console.log('✅ Updated blog-data.ts with fetched og:image URLs');
}

// Install required dependencies if needed
try {
  require('https');
  require('jsdom');
} catch (e) {
  console.log('Installing required dependencies...');
  const { execSync } = require('child_process');
  execSync('npm install https jsdom', { stdio: 'inherit' });
}

// Run the update function
updateArticlesWithOgImages().catch(console.error);
