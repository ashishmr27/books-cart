import { Subscription } from "rxjs";
import { Book } from "../models/book.model";
import { v4 as uuid } from 'uuid';

export function unsubscribe(subsList: Subscription[]) {
    subsList.forEach((subs) => {
        if (subs) {
            subs.unsubscribe();
        }
    })
}


export function sortBookBy(value: string) {
    return (a: Book, b: Book) => {
        let returnValue = 0;
        switch (value) {
            case 'title':
                returnValue = sortBy(a.title, b.title);
                break;
            case 'publishDate':
                const date1 = +a.PublishDate;
                const date2 = +b.PublishDate;
                returnValue = sortBy(date1, date2);
                break;
            default:
                break;
        }
        return returnValue;
    };
}

function sortBy(value1: any, value2: any): number {
    if (value1 < value2) {
        return -1;
    }
    if (value1 > value2) {
        return 1;
    }
    return 0;
}

export function generateUniqueId(){
    return uuid();
}