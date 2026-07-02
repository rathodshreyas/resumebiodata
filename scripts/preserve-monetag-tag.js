const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'build', 'index.html');
const exactTag = `<script>(function(s){s.dataset.zone='11229469',s.src='https://n6wxm.com/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))</script>`;
const builtHtml = fs.readFileSync(indexPath, 'utf8');
const vignetteTag = /<script>[^<]*11229469[^<]*n6wxm\.com\/vignette\.min\.js[^<]*<\/script>/;

if (!vignetteTag.test(builtHtml)) {
  throw new Error('Monetag Vignette tag was not found in build/index.html');
}

fs.writeFileSync(indexPath, builtHtml.replace(vignetteTag, exactTag));
console.log('Preserved the exact Monetag Vignette tag in build/index.html.');