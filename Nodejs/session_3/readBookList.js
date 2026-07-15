const fs = require("fs");

fs.readFile("books.txt", "utf8", (error, data) => {
  if (error) {
    console.log("Error while reading books.txt:", error.message);
    return;
  }

  const books = data.split("\n");

  console.log("Book List:");

  books.forEach((book) => {
    if (book.trim() !== "") {
      console.log(book.trim());
    }
  });
});