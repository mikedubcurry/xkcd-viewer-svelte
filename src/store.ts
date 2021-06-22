import { writable, derived, Readable } from "svelte/store";

export const current = writable<CurrentNumber>(undefined, (set) => {
    fetch(`https://xkcd.now.sh/?comic=latest`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            set(data.num);
            max.set(data.num);
            comic.set(data);
        });
});

export const comic = writable<ComicResponse>(undefined);

export function fetchComic(num: number) {
    fetch(`https://xkcd.vercel.app/?comic=${num ? num : "latest"}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            comic.set(data);
        });
}

export const max = writable(null);

export const favorites = writable<FavoriteComics>([], (set) => {
    let favs: string | FavoriteComics = localStorage.getItem("xkcdFavorites");
    try {
        favs = JSON.parse(favs);
    } catch (e) {
        console.log("error loading favorites...", e);
        favs = [];
    }
    if (favs && typeof favs !== "string") {
        set(favs);
    } else {
        set([]);
    }
});

export const storedFavorites = derived(favorites, ($favorites, set) => {
    localStorage.setItem("xkcdFavorites", JSON.stringify($favorites));
});

type FavoriteComics = number[];
type CurrentNumber = number;
type ComicResponse = {
    month: string;
    num: number;
    link: string;
    year: string;
    news: string;
    safe_title: string;
    transcript: string;
    alt: string;
    img: string;
    title: string;
    day: string;
};
