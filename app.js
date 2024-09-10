import express from "express";

import searchForAnimes from "./cheerio.js";
const app = express();

const PORT = process.env.PORT || 3000;



app.get("/", (req, res) => {
  res.json("Hello world");
});


app.get('/anime/:anime', (req, res) => {
  const { anime } = req.params;

  // Decode the URL-encoded anime string if needed
  const searchQuery = decodeURIComponent(anime);

  searchForAnimes(searchQuery).then(result => {
    res.json(result);
  }).catch(error => {
    res.status(500).json({ error: 'Failed to fetch anime details' });
  });
});




// Admin route handler

  



app.use((err, req, res, next) => {
    console.error(err.message, "in last middleware");
    res.status(500).send(err);
  });

app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
