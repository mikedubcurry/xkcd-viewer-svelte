import { writable, derived, Readable } from 'svelte/store';

let temp;
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

// export const comic = derived(
// 	current,
// 	($current, set) => {
// 		fetch(`https://xkcd.now.sh/?comic=${$current > 0 ? $current : 'latest'}`)
// 			.then((res) => {
// 				return res.json();
// 			})
// 			.then((data) => {
// 				console.log(data);
// 				current.set(data.num);
// 				set(data);
// 			});
// 	},
// 	temp
// );

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
