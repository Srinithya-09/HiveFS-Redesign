const https = require('https');
const fs = require('fs');
const path = require('path');

// Function to fetch og:image from a URL
function fetchOgImage(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };

    https.get(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        // Look for og:image meta tag
        const ogImageMatch = data.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
        if (ogImageMatch && ogImageMatch[1]) {
          resolve(ogImageMatch[1]);
        } else {
          resolve(null);
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Read current blog data
const blogDataPath = path.join(__dirname, 'lib/blog-data.ts');
let blogData = fs.readFileSync(blogDataPath, 'utf8');

// Articles to fetch images for
const articles = [
  {
    slug: 'the-curators-gambit',
    externalUrl: 'https://www.hiveresearch.com/post/the-curator-s-gambit-how-jeff-sprecher-built-a-billion-dollar-empire-by-buying-what-others-abandone'
  },
  {
    slug: 'clark-dean-georgias-future',
    externalUrl: 'https://www.hiveresearch.com/post/from-biomedical-engineering-to-publicservice-clark-dean-on-building-georgia-sfuture'
  },
  {
    slug: 'jamie-dimon-atlanta',
    externalUrl: 'https://www.hiveresearch.com/post/my-key-takeaways-from-the-atlanta-conversation-with-jamie-dimon'
  },
  {
    slug: 'peach-values-framework',
    externalUrl: 'https://www.hiveresearch.com/post/the-peach-values-framework-a-guide-to-building-high-performance-culture-through-value-driven-leadership'
  },
  {
    slug: 'deep-work-day-framework',
    externalUrl: 'https://www.hiveresearch.com/post/the-deep-work-day-framework'
  },
  {
    slug: 'h1b-labor-market-signals',
    externalUrl: 'https://www.hiveresearch.com/post/what-h-1b-policy-changes-tell-us-about-labor-market-signals'
  },
  {
    slug: 'lenders-labor-market',
    externalUrl: 'https://www.hiveresearch.com/post/what-lenders-can-learn-from-august-s-labor-market-signals'
  },
  {
    slug: 'middle-class-mirage',
    externalUrl: 'https://www.hiveresearch.com/post/the-middle-class-mirage-a-guide-to-understanding-modern-financial-fragility'
  },
  {
    slug: 'china-deflationary-crisis',
    externalUrl: 'https://www.hiveresearch.com/post/the-hidden-depth-of-china-s-deflationary-crisis-an-empirical-analysis'
  },
  {
    slug: 'quantum-ai-convergence',
    externalUrl: 'https://www.hiveresearch.com/post/the-quantum-ai-convergence-my-journey-through-complex-systems'
  },
  {
    slug: 'rethinking-ai-agent-architecture',
    externalUrl: 'https://www.hiveresearch.com/post/rethinking-ai-agent-architecture-a-case-study-in-code-execution-over-protocol-abstraction'
  },
  {
    slug: 'ai-search-optimization',
    externalUrl: 'https://www.hiveresearch.com/post/ai-search-optimization-a-guide-to-visibility-in-the-chatgpt-era'
  },
  {
    slug: 'private-credit-democratization',
    externalUrl: 'https://www.hiveresearch.com/post/private-credit-democratization-a-guide-to-navigating-the-wealth-management-revolution'
  },
  {
    slug: 'godfather-of-ai-warning',
    externalUrl: 'https://www.hiveresearch.com/post/the-godfather-of-ai-s-warning-a-guide-to-strategic-leadership-in-the-age-of-artificial-intelligence'
  },
  {
    slug: 'fluid-intelligence',
    externalUrl: 'https://www.hiveresearch.com/post/fluid-intelligence-a-guide-to-next-generation-ai-capabilities'
  },
  {
    slug: 'life-design-mastery',
    externalUrl: 'https://www.hiveresearch.com/post/life-design-mastery-a-guide-to-strategic-personal-and-professional-development'
  },
  {
    slug: 'api-to-mcp-transformation',
    externalUrl: 'https://www.hiveresearch.com/post/api-to-mcp-transformation-a-leadership-guide-to-ai-integration-strategy'
  },
  {
    slug: 'ai-coding-productivity',
    externalUrl: 'https://www.hiveresearch.com/post/ai-coding-productivity-a-guide-to-strategic-implementation-in-software-engineering'
  },
  {
    slug: 'economic-cycles',
    externalUrl: 'https://www.hiveresearch.com/post/economic-cycles-a-guide-to-strategic-capital-allocation-and-risk-management'
  },
  {
    slug: 'election-integrity',
    externalUrl: 'https://www.hiveresearch.com/post/election-integrity-and-democratic-resilience-a-guide-to-building-public-trust-in-electoral-systems'
  }
];

async function fetchAllImages() {
  console.log('Fetching real cover images from Hive Research articles...');
  
  for (const article of articles) {
    try {
      console.log(`Fetching image for: ${article.slug}`);
      const imageUrl = await fetchOgImage(article.externalUrl);
      
      if (imageUrl) {
        console.log(`✅ Found image: ${imageUrl}`);
        
        // Update the blog data with the real image URL
        const oldImageRegex = new RegExp(`(slug:\\s*'${article.slug}'[^}]*image:\\s*')[^']*(')`, 'g');
        const newImageLine = `$1${imageUrl}$2`;
        
        if (blogData.match(oldImageRegex)) {
          blogData = blogData.replace(oldImageRegex, newImageLine);
          console.log(`✅ Updated ${article.slug} with real image`);
        } else {
          console.log(`⚠️  Could not find image line for ${article.slug}`);
        }
      } else {
        console.log(`❌ No image found for: ${article.slug}`);
        // Set image to null if no og:image found
        const oldImageRegex = new RegExp(`(slug:\\s*'${article.slug}'[^}]*image:\\s*')[^']*(')`, 'g');
        const newImageLine = `$1null$2`;
        
        if (blogData.match(oldImageRegex)) {
          blogData = blogData.replace(oldImageRegex, newImageLine);
          console.log(`✅ Set ${article.slug} image to null`);
        }
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`❌ Error fetching image for ${article.slug}:`, error.message);
    }
  }
  
  // Write the updated blog data back
  fs.writeFileSync(blogDataPath, blogData, 'utf8');
  console.log('✅ Updated blog-data.ts with real article images!');
}

// Run the fetch function
fetchAllImages().catch(console.error);
