import puppeteer from 'puppeteer';

async function searchForAnimes(searchQuery) {
  // Launch Puppeteer
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
   });
  const page = await browser.newPage();
  
  // Navigate to the search page using the search query
  const searchUrl = `https://witanime.quest/?search_param=animes&s=${searchQuery.split(" ").join("+")}`;
  await page.goto(searchUrl, { waitUntil: 'networkidle2' }); // Wait for the page to fully load

  // Scrape the data from the anime card containers
  const animeDetails = await page.evaluate(() => {
    const animeCards = document.querySelectorAll('.anime-card-container');
    const detailsArray = [];

    animeCards.forEach(card => {
      const title = card.querySelector('.anime-card-title a')?.innerText.trim();
      const status = card.querySelector('.anime-card-status a')?.innerText.trim();
      const posterImg = card.querySelector('.anime-card-poster img')?.getAttribute('src');
      const animeDetailsPageLink = card.querySelector('.anime-card-poster a')?.getAttribute('href');
      
      detailsArray.push({ title, status, posterImg, animeDetailsPageLink });
    });

    return detailsArray;
  });

  // Log the results
  

  // Close the browser
  await browser.close();

  return animeDetails;
}








export default searchForAnimes;