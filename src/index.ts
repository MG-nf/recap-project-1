import type {Book} from "./types/book";

const apiUrl = "http://localhost:4730/";
const bookList = document.getElementsByTagName("tbody")[0] as HTMLTableSectionElement;
const heading = document.getElementsByTagName("h2")[0] as HTMLHeadingElement;
const htmlForms = document.getElementsByTagName("form") as HTMLCollectionOf<HTMLFormElement>;
const searchForm = htmlForms[0] as HTMLFormElement;
const searchBar = document.getElementById("search") as HTMLInputElement;
const filterSelect = document.getElementById("by-publisher") as HTMLSelectElement;
// const favorites_key = "favorites";

async function fetchBooks(): Promise<Book[]> {
    const response = await fetch(apiUrl + "books");
    const books = await response.json() as Book[];

    return books as Book[];
}

function createBookRow(book: Book): HTMLTableRowElement {
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

function createFavBtn(book: Book): HTMLButtonElement {
    const favBtn = document.createElement("button");
    
    favBtn.className = "button button-clear fav-btn";
    const svgNS = "http://www.w3.org/2000/svg";
    const svg: SVGSVGElement = document.createElementNS(svgNS, "svg");
    
    svg.setAttribute("class", "fav");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke-width", "1.5");
    svg.setAttribute("stroke", "currentColor");

    const svgPath: SVGPathElement = document.createElementNS(svgNS, "path");
    svgPath.setAttribute("stroke-linecap", "round");
    svgPath.setAttribute("stroke-linejoin", "round")
    svgPath.setAttribute("d", "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z");

    svg.append(svgPath);
    favBtn.append(svg);

    favBtn.addEventListener("click", () => {
        console.log(book);
        saveFavorite(book); // todo: implement
    });

    return favBtn;
}

function saveFavorite(book: Book): void {



    console.log(book);
}

function getFavoritesCount(): number {



    return 5;
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

async function findBook(searchTerm: string): Promise<Book[]> {
    const response = await fetch(apiUrl + "books/?q=" + searchTerm);
    const books = await response.json() as Book[];

    const resultBooks: Book[] = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return resultBooks as Book[];
}

const bookListData: Book[] = await fetchBooks();

bookList.innerHTML = "";

heading.innerText = `${bookListData.length} Books displayed`;

bookListData
    .map((book) => createBookRow(book))
    .forEach((bookRow) => bookList.append(bookRow));

console.log(getFavoritesCount());