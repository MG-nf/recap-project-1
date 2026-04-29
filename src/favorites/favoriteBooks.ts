import { Book } from "../types/book";

const favorites_key = "favorites";

export function isBookFavorite(book: Book): boolean {
    const favorites: string[] = getFavorites();
    const isFavorite: boolean = favorites.includes(book.isbn) ? true : false;

    return isFavorite;
}

export function addFavorite(book: Book): void {
    const favorites = getFavorites();

    if (!favorites.includes(book.isbn)) {
        favorites.push(book.isbn);
        localStorage.setItem(favorites_key, JSON.stringify(favorites));
    }
}

export function deleteFavorite(book: Book): void {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(isbn => isbn !== book.isbn);

    localStorage.setItem(favorites_key, JSON.stringify(updatedFavorites));
}

export function getFavorites(): string[] {
  const data = localStorage.getItem(favorites_key);

  if (!data) return [];

  try {
    const isbns = JSON.parse(data);
    return Array.isArray(isbns) ? isbns : [];
  } catch {
    return [];
  }
}

export function getFavoritesCount(): number {
    const favorites = getFavorites();
    return favorites.length;
}