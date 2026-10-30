const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'images', 'projects');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

function makeWebSvg(title, subtitle, accent = '#2F5BFF') {
  return `<svg width="800" height="500" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="500" rx="16" fill="#F7F5F0"/>
  <rect x="2" y="2" width="796" height="496" rx="14" stroke="#E4E0D7" stroke-width="2"/>
  <!-- Browser Chrome -->
  <rect x="2" y="2" width="796" height="44" rx="14" fill="#FFFFFF"/>
  <circle cx="28" cy="24" r="6" fill="#EF4444"/>
  <circle cx="48" cy="24" r="6" fill="#F59E0B"/>
  <circle cx="68" cy="24" r="6" fill="#10B981"/>
  <rect x="110" y="12" width="400" height="24" rx="6" fill="#F7F5F0"/>
  <text x="130" y="28" font-family="system-ui, sans-serif" font-size="11" fill="#717D91">https://${title.toLowerCase().replace(/[^a-z0-9]/g, '')}.com</text>
  
  <!-- Website Header -->
  <rect x="40" y="70" width="120" height="20" rx="4" fill="#151B25"/>
  <rect x="520" y="74" width="60" height="12" rx="3" fill="#A9B6C6"/>
  <rect x="600" y="74" width="60" height="12" rx="3" fill="#A9B6C6"/>
  <rect x="680" y="68" width="80" height="26" rx="6" fill="${accent}"/>
  
  <!-- Hero Section -->
  <rect x="40" y="120" width="440" height="34" rx="6" fill="#151B25"/>
  <rect x="40" y="165" width="360" height="20" rx="4" fill="#55647A"/>
  <rect x="40" y="195" width="280" height="14" rx="3" fill="#A9B6C6"/>
  
  <rect x="40" y="235" width="130" height="38" rx="8" fill="${accent}"/>
  <rect x="185" y="235" width="120" height="38" rx="8" fill="#FFFFFF" stroke="#E4E0D7" stroke-width="1.5"/>

  <!-- Visual Feature Card -->
  <rect x="40" y="300" width="720" height="160" rx="12" fill="#FFFFFF" stroke="#E4E0D7" stroke-width="1.5"/>
  <rect x="65" y="325" width="200" height="18" rx="4" fill="#151B25"/>
  <rect x="65" y="355" width="300" height="12" rx="3" fill="#717D91"/>
  <rect x="65" y="375" width="240" height="12" rx="3" fill="#A9B6C6"/>

  <rect x="420" y="325" width="140" height="110" rx="8" fill="#EEF3FF" stroke="#BDCFFF"/>
  <rect x="580" y="325" width="140" height="110" rx="8" fill="#F7F5F0" stroke="#E4E0D7"/>
  
  <!-- Title Badge -->
  <rect x="40" y="470" width="220" height="20" rx="4" fill="#151B25"/>
  <text x="50" y="484" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#FFFFFF">${title} Preview</text>
</svg>`;
}

function makeSocialSvg(title, platform = 'Instagram & TikTok', accent = '#2F5BFF') {
  return `<svg width="800" height="500" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="500" rx="16" fill="#151B25"/>
  
  <!-- Left Phone Mockup (9:16) -->
  <g transform="translate(60, 30)">
    <rect width="210" height="440" rx="28" fill="#0F141C" stroke="#222B3A" stroke-width="4"/>
    <rect x="65" y="10" width="80" height="16" rx="8" fill="#151B25"/>
    <!-- Content inside phone -->
    <rect x="15" y="35" width="180" height="240" rx="14" fill="#222B3A"/>
    <rect x="25" y="45" width="60" height="18" rx="4" fill="${accent}"/>
    <rect x="25" y="75" width="160" height="14" rx="3" fill="#FFFFFF"/>
    <rect x="25" y="95" width="130" height="12" rx="3" fill="#BDCFFF"/>
    <!-- Feed UI -->
    <circle cx="35" cy="295" r="14" fill="${accent}"/>
    <rect x="58" y="288" width="70" height="10" rx="2" fill="#FFFFFF"/>
    <rect x="58" y="303" width="50" height="8" rx="2" fill="#7A8A9E"/>
    <rect x="20" y="325" width="170" height="10" rx="2" fill="#A9B6C6"/>
    <rect x="20" y="342" width="140" height="10" rx="2" fill="#7A8A9E"/>
  </g>

  <!-- Right Carousel Mockup -->
  <g transform="translate(320, 60)">
    <!-- Slide 1 -->
    <rect x="0" y="0" width="200" height="250" rx="16" fill="#F7F5F0" stroke="#E4E0D7"/>
    <rect x="20" y="20" width="80" height="20" rx="6" fill="${accent}"/>
    <rect x="20" y="60" width="160" height="24" rx="4" fill="#151B25"/>
    <rect x="20" y="95" width="140" height="12" rx="3" fill="#55647A"/>
    <rect x="20" y="115" width="150" height="12" rx="3" fill="#55647A"/>
    <rect x="20" y="200" width="50" height="10" rx="2" fill="#A9B6C6"/>
    <text x="150" y="210" font-family="system-ui" font-size="10" fill="#7A8A9E">1 / 5 →</text>

    <!-- Slide 2 (Overlapping) -->
    <rect x="220" y="0" width="200" height="250" rx="16" fill="#FFFFFF" stroke="#E4E0D7"/>
    <rect x="240" y="20" width="160" height="100" rx="10" fill="#EEF3FF"/>
    <rect x="240" y="135" width="160" height="18" rx="4" fill="#151B25"/>
    <rect x="240" y="165" width="130" height="12" rx="3" fill="#55647A"/>
    <text x="370" y="210" font-family="system-ui" font-size="10" fill="#7A8A9E">2 / 5 →</text>

    <!-- Platform tags & caption review -->
    <rect x="0" y="280" width="420" height="120" rx="12" fill="#222B3A"/>
    <text x="20" y="310" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#FFFFFF">${title} — Content Schedule</text>
    <rect x="20" y="325" width="90" height="22" rx="4" fill="${accent}"/>
    <text x="28" y="340" font-family="system-ui" font-size="10" font-weight="600" fill="#FFFFFF">${platform}</text>
    <rect x="120" y="325" width="110" height="22" rx="4" fill="#364357"/>
    <text x="128" y="340" font-family="system-ui" font-size="10" fill="#D3DBE4">Scheduled & Approved</text>
    <rect x="20" y="362" width="370" height="8" rx="2" fill="#55647A"/>
    <rect x="20" y="377" width="280" height="8" rx="2" fill="#55647A"/>
  </g>
</svg>`;
}

function makeCoverSvg(title, category, isConcept = true) {
  return `<svg width="800" height="500" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="500" rx="16" fill="#151B25"/>
  <circle cx="700" cy="80" r="140" fill="#2F5BFF" fill-opacity="0.12"/>
  <circle cx="100" cy="420" r="160" fill="#2F5BFF" fill-opacity="0.08"/>
  
  <!-- Left Side Project Info -->
  <g transform="translate(60, 60)">
    <rect x="0" y="0" width="140" height="28" rx="6" fill="#2F5BFF"/>
    <text x="14" y="19" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF" letter-spacing="0.05em">${category.toUpperCase()}</text>
    
    ${isConcept ? `
    <rect x="150" y="0" width="150" height="28" rx="6" fill="#222B3A" stroke="#364357"/>
    <text x="162" y="19" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#BDCFFF">CONCEPT DEMO</text>
    ` : ''}

    <text x="0" y="80" font-family="system-ui, sans-serif" font-size="28" font-weight="800" fill="#F7F5F0">${title}</text>
    
    <!-- Mini website frame -->
    <rect x="0" y="120" width="360" height="240" rx="10" fill="#F7F5F0" stroke="#364357"/>
    <rect x="0" y="120" width="360" height="24" rx="10" fill="#E4E0D7"/>
    <circle cx="15" cy="132" r="4" fill="#EF4444"/>
    <circle cx="28" cy="132" r="4" fill="#F59E0B"/>
    <circle cx="41" cy="132" r="4" fill="#10B981"/>
    
    <rect x="20" y="160" width="180" height="18" rx="4" fill="#151B25"/>
    <rect x="20" y="186" width="220" height="10" rx="2" fill="#717D91"/>
    <rect x="20" y="202" width="160" height="10" rx="2" fill="#A9B6C6"/>
    <rect x="20" y="230" width="80" height="26" rx="6" fill="#2F5BFF"/>
    
    <rect x="20" y="280" width="320" height="60" rx="6" fill="#FFFFFF"/>
  </g>

  <!-- Right Side Social Preview -->
  <g transform="translate(480, 80)">
    <rect width="260" height="340" rx="20" fill="#0F141C" stroke="#222B3A" stroke-width="3"/>
    <rect x="20" y="20" width="220" height="160" rx="10" fill="#2F5BFF"/>
    <text x="35" y="60" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF">Coordinated</text>
    <text x="35" y="85" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF">Social Campaign</text>
    <rect x="35" y="105" width="90" height="20" rx="4" fill="#FFFFFF"/>
    <text x="43" y="119" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#2F5BFF">SWIPE LEFT →</text>
    
    <!-- Profile & Caption lines -->
    <circle cx="35" cy="210" r="14" fill="#BDCFFF"/>
    <rect x="58" y="204" width="90" height="10" rx="2" fill="#FFFFFF"/>
    <rect x="20" y="236" width="220" height="8" rx="2" fill="#55647A"/>
    <rect x="20" y="252" width="180" height="8" rx="2" fill="#55647A"/>
    <rect x="20" y="268" width="120" height="8" rx="2" fill="#364357"/>
    
    <rect x="20" y="295" width="100" height="24" rx="6" fill="#222B3A"/>
    <text x="30" y="311" font-family="system-ui, sans-serif" font-size="10" fill="#BDCFFF">#WebPlusSocial</text>
  </g>
</svg>`;
}

const svgs = [
  { name: 'aura-cover.svg', content: makeCoverSvg('Aura Fintech', 'Combined Projects', true) },
  { name: 'aura-web.svg', content: makeWebSvg('Aura Capital', 'Fintech Investment Portal') },
  { name: 'aura-social.svg', content: makeSocialSvg('Aura Capital', 'LinkedIn & Instagram') },
  
  { name: 'kura-cover.svg', content: makeCoverSvg('Kura Artisan Goods', 'Combined Projects', true) },
  { name: 'kura-web.svg', content: makeWebSvg('Kura Studio', 'Artisan Pottery Store') },
  { name: 'kura-reels.svg', content: makeSocialSvg('Kura Ceramics', 'TikTok & Instagram Reels') },

  { name: 'verve-cover.svg', content: makeCoverSvg('Verve Health', 'Websites', true) },
  { name: 'verve-web.svg', content: makeWebSvg('Verve Clinical', 'Telehealth Directory') },

  { name: 'solaris-cover.svg', content: makeCoverSvg('Solaris Clean Energy', 'Social Content', true) },
  { name: 'solaris-social.svg', content: makeSocialSvg('Solaris Energy', 'LinkedIn Carousel Campaign') },

  { name: 'hero-web.svg', content: makeWebSvg('Kinetic Business', 'Startup Website Launch') },
  { name: 'hero-social.svg', content: makeSocialSvg('Kinetic Social', 'Instagram & TikTok') },
];

svgs.forEach(s => {
  fs.writeFileSync(path.join(dir, s.name), s.content, 'utf8');
  console.log('Created ' + s.name);
});
