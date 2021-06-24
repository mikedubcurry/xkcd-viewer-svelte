import { writable, derived, Readable } from 'svelte/store';

export const current = writable<CurrentNumber>(0, (set) => {
	let [_, path] = window.location.pathname.split('/');
	let num = parseInt(path);

	fetch(`https://xkcd.now.sh/?comic=latest`)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			max.set(data.num);
			if (num && num <= data.num) {
				set(num);
				fetchComic(num);
			} else {
				set(data.num);
				comic.set(data);
			}
		});
});

export const comic = writable<ComicResponse>(undefined);

export function fetchComic(num: CurrentNumber) {
	fetch(`https://xkcd.vercel.app/?comic=${num ? num : 'latest'}`)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			comic.set(data);
		});
}

export const max = writable(null);

export const pathname = derived([current, max], ([$current, $max], set) => {
	window.history.replaceState(null, 'xkcd-' + $current, '/' + $current);
});

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

export const theme = writable<Theme>(
	window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
	(set) => {
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
	}
);

export const storedTheme = derived(theme, ($theme) => {
	localStorage.setItem('xkcd-theme', JSON.stringify($theme));
});

type Theme = 'light' | 'dark';
type FavoriteComics = CurrentNumber[];
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
