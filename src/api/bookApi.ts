import type {Book} from "../types/book";

const apiUrl = "http://localhost:4730/";

export async function fetchBooks(): Promise<Book[]> {
    const response = await fetch(apiUrl + "books");
    const books = await response.json() as Book[];

    return books as Book[];
}

export async function findBook(searchTerm: string): Promise<Book[]> {
    const response = await fetch(apiUrl + "books/?q=" + searchTerm);
    const books = await response.json() as Book[];

    const resultBooks: Book[] = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return resultBooks as Book[];
}