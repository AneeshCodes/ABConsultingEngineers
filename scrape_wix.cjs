const fs = require('fs');
const html = fs.readFileSync('oldsite.html', 'utf-8');

// Regex to find wixstatic URLs
const wixRegex = /https:\/\/static\.wixstatic\.com\/media\/[a-zA-Z0-9_~\-]+\.(jpg|jpeg|png|webp)/g;
const matches = [...new Set(html.match(wixRegex) || [])];

console.log("Found Media URLs:");
matches.forEach(m => console.log(m));

// Look for text blocks mentioning Avinash or Harikrishnan
const textBlocks = html.match(/[^"{\}>]+(Avinash|Harikrishnan)[^"{\}<]+/g);
if (textBlocks) {
    console.log("\nText Blocks with Names:");
    [...new Set(textBlocks)].forEach(t => console.log(t.trim()));
}

// Find project details (Search for known text like Argyle or Northgate)
const projectBlocks = html.match(/[^"{\}>]+(Argyle|Northgate|Waikato|Retrofit|Pipe Supports)[^"{\}<]+/gi);
if (projectBlocks) {
    console.log("\nProject Text Blocks:");
    [...new Set(projectBlocks)].forEach(t => console.log(t.trim()));
}
