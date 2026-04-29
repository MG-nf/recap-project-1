import type {Book} from "../types/book";
import { findBook, bookListData } from "../api/bookApi.js";
import { isBookFavorite, deleteFavorite, addFavorite, getFavoritesCount } from "../favorites/favoriteBooks.js";

export const bookList = document.getElementsByTagName("tbody")[0] as HTMLTableSectionElement;
const htmlForms = document.getElementsByTagName("form") as HTMLCollectionOf<HTMLFormElement>;
const searchForm = htmlForms[0] as HTMLFormElement;
const searchBar = document.getElementById("search") as HTMLInputElement;
const filterSelect = document.getElementById("by-publisher") as HTMLSelectElement;
export const heading = document.getElementsByTagName("h2")[0] as HTMLHeadingElement;
export const favoritesCount = document.getElementsByClassName("mainnav-number")[0] as HTMLElement;

const isFavoriteBtn = `<svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="fav"
                    >
                      <path
                        d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
                      />
                    </svg>`;

const isNotFavoriteBtn = `<svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="fav"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>`

export function createBookRow(book: Book): HTMLTableRowElement {
    const row = document.createElement("tr");

    const favCol = document.createElement("td");
    const favBtn = createFavBtn(book);
    favCol.append(favBtn);

    const titleCol = document.createElement("td");
    titleCol.innerText = book.title;

    const isbnCol = document.createElement("td");
    isbnCol.innerText = book.isbn;

    const authorCol = document.createElement("td");
    authorCol.innerText = book.author;

    const publisherCol = document.createElement("td");
    publisherCol.innerText = book.publisher;

    const detailButtonCol = document.createElement("td"); // todo: detail button
    const detailBtn = createDetailBtn(book);
    detailButtonCol.append(detailBtn);

    
    row.append(favCol)
    row.append(titleCol);
    row.append(isbnCol);
    row.append(authorCol);
    row.append(publisherCol);
    row.append(detailButtonCol);

    return row;
}

export function createFavBtn(book: Book): HTMLButtonElement {
    const isFavorite = isBookFavorite(book);
    const favBtn = document.createElement("button");
    
    favBtn.className = "button button-clear fav-btn";
    if (isFavorite) {
        favBtn.innerHTML = isFavoriteBtn;
    } else {
        favBtn.innerHTML = isNotFavoriteBtn;
    }

    favBtn.addEventListener("click", () => {
        if (isFavorite) {
            deleteFavorite(book);
            favBtn.innerHTML = isNotFavoriteBtn;
        } else {
            addFavorite(book);
            favBtn.innerHTML = isFavoriteBtn;
        }
        favoritesCount.innerText = getFavoritesCount().toString();

    });

    return favBtn;
}

function createDetailBtn(book: Book): HTMLAnchorElement {
    const detailAnchor = document.createElement("a") as HTMLAnchorElement;
    detailAnchor.href = "/src/detail.html?isbn=" + book.isbn;

    const detailBtn = document.createElement("button");
    detailBtn.innerText = "Detail"; 
    detailBtn.className = "button";

    detailAnchor.append(detailBtn);

    return detailAnchor;
}

searchForm.addEventListener("submit", async(event: SubmitEvent) => {
    event.preventDefault();

    const searchTerm = searchBar.value.toString();
    const searchResults = await findBook(searchTerm)

    bookList.innerHTML = "";
    heading.innerText = `${searchResults.length} Books displayed`;

    searchResults
        .map((book) => createBookRow(book))
        .forEach((bookRow) => bookList.append(bookRow));
});

filterSelect.addEventListener("change", () => {
    bookList.innerHTML = "";
    let resultBooks: Book[] = [];
    const selectedPublisher = filterSelect.options[filterSelect.selectedIndex].value;
    if (selectedPublisher != '-') {
        resultBooks = bookListData.filter(book =>
            book.publisher.toLowerCase().includes(selectedPublisher.toLowerCase())
        );
    } else {
        resultBooks = bookListData;
    }

    heading.innerText = `${resultBooks.length} Books displayed`;
    resultBooks
        .map((book) => createBookRow(book))
        .forEach((bookRow) => bookList.append(bookRow));
});

searchForm.addEventListener("submit", async(event: SubmitEvent) => {
    event.preventDefault();

    const searchTerm = searchBar.value.toString();
    const searchResults = await findBook(searchTerm)

    bookList.innerHTML = "";
    heading.innerText = `${searchResults.length} Books displayed`;

    searchResults
        .map((book) => createBookRow(book))
        .forEach((bookRow) => bookList.append(bookRow));
});

filterSelect.addEventListener("change", () => {
    bookList.innerHTML = "";
    let resultBooks: Book[] = [];
    const selectedPublisher = filterSelect.options[filterSelect.selectedIndex].value;
    if (selectedPublisher != '-') {
        resultBooks = bookListData.filter(book =>
            book.publisher.toLowerCase().includes(selectedPublisher.toLowerCase())
        );
    } else {
        resultBooks = bookListData;
    }

    heading.innerText = `${resultBooks.length} Books displayed`;
    resultBooks
        .map((book) => createBookRow(book))
        .forEach((bookRow) => bookList.append(bookRow));
});
