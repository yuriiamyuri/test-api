import express from "express";
import usersRouter from "./usersRouter.js";
import searchForAnimes from "./cheerio.js";
const app = express();

const PORT = process.env.PORT || 3000;

app.use("/users", usersRouter);

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
app.get('/dashboard', (req, res, next) => {
    const isAdmin = req.query.admin === 'true';
    
    if (!isAdmin) {
      next('route');  // Skip this handler if the user is not an admin
    } else {
      res.send('Welcome Admin to the dashboard');
    }
  });
  
  // Regular user route handler
  app.get('/dashboard', (req, res) => {
    res.send('Welcome User to the dashboard');
  });
  
  



app.use((err, req, res, next) => {
    console.error(err.message, "in last middleware");
    res.status(500).send(err);
  });

app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
