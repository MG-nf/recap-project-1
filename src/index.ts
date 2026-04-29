import { bookListData } from "./api/bookApi.js";
import { favoritesCount, bookList, heading, createBookRow } from "./ui/renderUI.js"
import { getFavoritesCount } from "./favorites/favoriteBooks.js";

favoritesCount.innerText = getFavoritesCount().toString();

bookList.innerHTML = "";

heading.innerText = `${bookListData.length} Books displayed`;

bookListData
    .map((book) => createBookRow(book))
    .forEach((bookRow) => bookList.append(bookRow));
