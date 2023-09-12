const express = require("express");

const server = express();

server.get("/", (request, response) => {
  response.send(`
        <!doctype html>
        <html>
        <h1>Hello Express</h1>
        </html>
      `);
});

server.get("/colour", (request, response) => {
  const hex = request.query.hex || "ffffff";
  const html = `
    <style>
      body {
        background-color: #${hex};
      }
    </style>
    <form>
      <label for="hex">Enter hex</label>
      <input name="hex" value="${hex}">
    </form>
  `;
  response.send(html);
});

const cheeses = [];

server.get("/cheese", (request, response) => {
  const cheeseList = cheeses.map((cheese) => `<li>${cheese}</li>`).join("");

  const html = `
    <form action="/cheese" method="post">

    <p>
    <label for="name">Cheese name: </label>
    <input name="name">
  </p>
  <p>
    <label for="rating">Cheese rating: </label>
    <input name="rating" type="range" min="0" max="5" step="0.5">
  </p>
  <button>Rate cheese</button>

    </form>

    <ul>${cheeseList}</ul>
  `;
  response.send(html);
});

const bodyParser = express.urlencoded();

server.post("/cheese", bodyParser, (request, response) => {
  const cheeseName = request.body.name;
  const cheeseRating = request.body.rating;
  const cheese = cheeseName + " | " + cheeseRating;
  cheeses.push(cheese);

  response.redirect(`/cheese`);
});

module.exports = server;
