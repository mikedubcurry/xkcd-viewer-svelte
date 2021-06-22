import { writable, derived, Readable } from 'svelte/store';

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
	fetch(`https://xkcd.vercel.app/?comic=${num ? num : 'latest'}`)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			comic.set(data);
		});
}

export const max = writable(null);

export const favorites = writable<FavoriteComics>([], (set) => {
	let favs: string | FavoriteComics = localStorage.getItem('xkcd-Favorites');
	try {
		favs = JSON.parse(favs);
	} catch (e) {
		console.log('error loading favorites...', e);
		favs = [];
	}
	if (favs && typeof favs !== 'string') {
		set(favs);
	} else {
		set([]);
	}
});

export const storedFavorites = derived(favorites, ($favorites) => {
	localStorage.setItem('xkcd-Favorites', JSON.stringify($favorites));
});

export const theme = writable<Theme>('dark', (set) => {
	let th: string = localStorage.getItem('xkcd-theme');
	try {
		th = JSON.parse(th);
	} catch (e) {
		console.log('error loading theme', e);
		th = 'light';
	}
	if (th === 'light' || th === 'dark') {
		set(th);
	}
});

export const storedTheme = derived(theme, ($theme) => {
	localStorage.setItem('xkcd-theme', JSON.stringify($theme));
});

type Theme = 'light' | 'dark';
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
