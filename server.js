const express = require('express');
const path = require('path');
const fs = require('fs');
let notes = require('./db/db.json');

// const util = require('util');

// Helper method for generating unique ids
// const uuid = require('./helpers/uuid');

const PORT = 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  notes.push({ ...req.body, id: notes.length + 1 });
  const newNotes = notes
  fs.writeFile('./db/db.json', JSON.stringify(newNotes), (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('success!')
    res.json(notes);
    // app.get('/api/notes', (req, res) => {
    //   res.json(notes);
    // });
  }
  )
})

app.delete('/api/notes/:id', (req, res) => {
  const filteredNotes = notes.filter(function (note) {
    note.id == req.params.id
  });

  notes = filteredNotes;

  fs.writeFile('./db/db.json', JSON.stringify(filteredNotes), (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('success!')
    res.json(notes);
    // app.get('/api/notes', (req, res) => {
    //   res.json(notes);
    // });
  });
})



// app.post('/api/reviews', (req, res) => {
//   // Log that a POST request was received
//   console.info(`${req.method} request received to add a review`);

//   // Destructuring assignment for the items in req.body
//   const { product, review, username } = req.body;

//   // If all the required properties are present
//   if (product && review && username) {
//     // Variable for the object we will save
//     const newReview = {
//       product,
//       review,
//       username,
//       upvotes: Math.floor(Math.random() * 100),
//       // review_id: uuid(),
//     };

//     // Convert the data to a string so we can save it
//     const reviewString = JSON.stringify(newReview);

//     // Write the string to a file
//     fs.writeFile(`./db/${newReview.product}.json`, reviewString, (err) =>
//       err
//         ? console.error(err)
//         : console.log(
//             `Review for ${newReview.product} has been written to JSON file`
//           )
//     );

//     const response = {
//       status: 'success',
//       body: newReview,
//     };

//     console.log(response);
//     res.status(201).json(response);
//   } else {
//     res.status(500).json('Error in posting review');
//   }
// });




app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);