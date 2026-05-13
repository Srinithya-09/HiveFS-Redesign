const https = require('https');
const fs = require('fs');
const path = require('path');

// Simple function to fetch og:image without external dependencies
async function fetchOgImageSimple(url) {
  try {
    const response = await https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; og-image-fetcher/1.0)'
      }
    });
    
    let html = '';
    response.on('data', (chunk) => {
      html += chunk;
    });
    
    return new Promise((resolve, reject) => {
      response.on('end', () => {
        // Simple regex to find og:image
        const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
        if (ogImageMatch && ogImageMatch[1]) {
          resolve(ogImageMatch[1]);
        } else {
          resolve(null);
        }
      });
      
      response.on('error', reject);
    });
  } catch (error) {
    console.error(`Error fetching og:image for ${url}:`, error.message);
    return null;
  }
}

async function updateArticlesWithOgImages() {
  const blogDataPath = path.join(__dirname, 'lib/blog-data.ts');
  let blogData = fs.readFileSync(blogDataPath, 'utf8');
  
  // Parse articles using regex
  const articleRegex = /{[\s\S]*?slug:\s*'([^']+)'/g;
  const articles = [];
  let match;
  
  while ((match = articleRegex.exec(blogData)) !== null) {
    const articleStart = match.index;
    const articleEnd = blogData.indexOf('}', articleStart);
    const articleText = blogData.substring(articleStart, articleEnd + 1);
    
    // Extract article data
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
      const ogImage = await fetchOgImageSimple(article.externalUrl);
      
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
    const imageLine = article.image ? `    image: "${article.image}",` : '    image: null,';
    const articleText = `{
    slug: '${article.slug}',
    category: '${article.category}',
    title: ${article.title ? `"${article.title.replace(/"/g, '\\"')}" : null},
    summary: ${article.summary ? `"${article.summary.replace(/"/g, '\\"')}" : null},
    excerpt: ${article.excerpt ? `"${article.excerpt.replace(/"/g, '\\"')}" : null},
    author: ${article.author ? `"${article.author.replace(/"/g, '\\"')}" : null},
    readTime: ${article.readTime ? `"${article.readTime.replace(/"/g, '\\"')}" : null},
    date: ${article.date ? `"${article.date.replace(/"/g, '\\"')}" : null},
${imageLine}
    externalUrl: ${article.externalUrl ? `"${article.externalUrl.replace(/"/g, '\\"')}" : null}
  }`;
    
    // Replace the old article in the blog data
    const oldArticleRegex = new RegExp(`{[\\s\\S]*?slug:\\s*'${article.slug}'[^}]*}`, 'g');
    updatedBlogData = updatedBlogData.replace(oldArticleRegex, articleText);
  });
  
  // Write the updated blog data back
  fs.writeFileSync(blogDataPath, updatedBlogData, 'utf8');
  console.log('✅ Updated blog-data.ts with fetched og:image URLs');
}

// Run the update function
updateArticlesWithOgImages().catch(console.error);
