const fs = require('fs');
const html = fs.readFileSync('oldsite.html', 'utf-8');

// Find Harikrishnan's image
const hariIndex = html.indexOf('Harikrishnan');
if (hariIndex !== -1) {
    const context = html.substring(Math.max(0, hariIndex - 500), hariIndex + 500);
    const urls = context.match(/https:\/\/static\.wixstatic\.com\/media\/[a-zA-Z0-9_~\-]+\.(jpg|jpeg|png|webp)/g);
    console.log("Harikrishnan Image URLs:", urls);
}

// Find Waikato DHB text full
const waikatoIndex = html.indexOf('Waikato District Health Board since');
if (waikatoIndex !== -1) {
    console.log("\nWaikato full text:");
    console.log(html.substring(waikatoIndex, waikatoIndex + 800).replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' '));
}

// Find Argyle full text
const argyleIndex = html.indexOf('Detailed Seismic Assessment (DSA) of the buildings at Argyle');
if (argyleIndex !== -1) {
    console.log("\nArgyle full text:");
    console.log(html.substring(argyleIndex - 50, argyleIndex + 800).replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' '));
}

// Find Northgate full text
const northgateIndex = html.indexOf('Northgate Community Church at 97C');
if (northgateIndex !== -1) {
    console.log("\nNorthgate full text:");
    console.log(html.substring(northgateIndex - 50, northgateIndex + 800).replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' '));
}
