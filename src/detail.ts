import type { Book } from "./types/book";

const apiUrl = "http://localhost:4730/";

const params = new URLSearchParams(window.location.search);
const isbn = params.get("isbn") as string;

const mainContainer = document.getElementsByTagName("main")[0] as HTMLBaseElement;

async function searchBook(isbn: string): Promise<Book> {
    const response = await fetch(apiUrl + "books/" + isbn);
    const book = await response.json() as Book;

    return book as Book;
}

const book: Book = await searchBook(isbn);

if (book) {
    displayBook(book);
} else {
    displayError();
}

function displayBook(book: Book): void {
    mainContainer.innerHTML = "";

    const content = `
        <h1>
           ${book.title}<br />
            <small>${book.subtitle}</small>
        </h1>
        <section class="row">
            <div class="column column-67">
                <h3>Abstract</h3>
                <p>
                    ${book.abstract}
                </p>

                <h4>Details</h4>
                <ul>
                    <li><strong>Author:</strong> ${book.author}</li>
                    <li><strong>Publisher:</strong> ${book.publisher}</li>
                    <li><strong>Pages:</strong> ${book.numPages}</li>
                </ul>

                <button
                    class="button button-outline"
                    onclick="location.href='index.html'"
                    >
                    Back
                </button>
            </div>
            <div class="column column-33">
                <img src="${book.cover}" alt="" />
            </div>
        </section>
    `;

    mainContainer.innerHTML = content;
}

function displayError(): void {
    const errorMessage = document.createElement("h1");
    errorMessage.innerText = "No book with this isbn";
    mainContainer.append(errorMessage);
    //todo: back button
}

