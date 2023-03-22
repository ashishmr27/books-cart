import { Book } from "./book.model";

export interface Author {
    author: string;
    birthday: string;
    birthPlace: string;
    books : Book[];
}