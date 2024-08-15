const express = require('express');
const Timetable = require('comcigan-parser');
const path = require('path');

const app = express();
const timetable = new Timetable();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/search', async (req, res) => {
  const schoolName = req.query.name;

  if (!schoolName) {
    return res.status(400).send('School name is required');
  }

  await timetable.init();

  try {
    const schoolList = await timetable.search(schoolName);
    res.json(schoolList);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while searching for schools');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
