'use strict';

// const socket_IP = 'https://drb-examen.azurewebsites.net';
// const backend_IP = 'http://localhost:5000';
// const backend = backend_IP + '/api/v1';

let domAlfabet, domMovies, ClickedKeywords;
const alfabet = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z'
];

//#region ***********  DOM references ***********
//#endregion

//#region ***********  Callback - HTML Generation (After select) ***********
// show________
//#endregion

//#region ***********  Callback - (After update/delete/insert) ***********
// callback______
//#endregion

//#region ***********  Data Access ***********
// get_______

const getAlfabet = function() {
	let htmlcode = '';
	for (let element of alfabet) {
		htmlcode += `<div class="letter">${element}</div>`;
	}
	domAlfabet.innerHTML = htmlcode;
	listenToLetters();
};

const VerwerkKeywords = function(data) {
	console.log(data);
	let htmlcode = `<span>Keywords</span> \n <ol> \n`;
	let htmlcode2 = `</ol> \n </div> \n </div>`;
	let keywords = '';

	for (let element of data) {
		let keyword = element.keyword_name;
		keywords += `<li>${keyword}</li> \n`;
	}
	let html5 = htmlcode + keywords + htmlcode2;
	ClickedKeywords.innerHTML = html5;
};

const getKeyWords = function(id) {
	handleData(
		`http://127.0.0.1:5000/api/v1/movies/${id}/keywords`,
		VerwerkKeywords
	);
};

const handleError = function(error) {
	console.log(error);
};

const VerwerkFilms = function(jsonObject) {
	let htmlcode = '';
	for (let element of jsonObject) {
		let naam = element.original_title;
		let budget = element.budget;
		let pagina = element.homepage;
		let overview = element.overview;
		let populariteit = element.popularity;
		let release = element.release_date;
		let revenue = element.revenue;
		let runtime = element.runtime;
		let status = element.status;
		let tagline = element.tagline;
		let titel = element.title;
		let voteAverage = element.vote_average;
		let voteCount = element.vote_count;

		let id = element.id;

		htmlcode += `<div class="movie">
        <h1><img class="image" src="assets/en.png" />${naam}</h1>
        <!-- <div></div> -->
        <div><span>Budget: </span>${budget}</div>
        <div><span>Homepage: </span><br /><a href="${pagina}">${pagina}</a></div>
        <div><span>Overview: </span>${overview}</div>
        <div><span>Popularity: </span><span class="u-number-font">${populariteit}</span></div>
        <div><span>Realease Date: </span><span class="u-number-font">${release}</span></div>
        <div><span>Revenue: </span><span class="u-number-font">${revenue}</span></div>
        <div><span>Runtime: </span><span class="u-number-font">${runtime}</span></div>
        <div><span>Status: </span>${status}</div>
        <div><span>Tagline: </span>${tagline}</div>
        <div><span>Titel: </span>${titel}</div>
        <div><span>Vote average: </span><span class="u-number-font">${voteAverage}</span></div>
        <div><span>Vote Count: </span><span class="u-number-font">${voteCount}</span></div>
        <div class="keywords" data-movieid="${id}">
        </div>
        </div>
      `;
		// werkt niet  getKeyWords(id);
	}
	domMovies.innerHTML = htmlcode;
};

const getLijstFilms = function(letter) {
	handleData(
		`http://127.0.0.1:5000/api/v1/movies/alfabet/${letter}`,
		VerwerkFilms
	);
};

//#endregion

//#region ***********  Event Listeners ***********
// listenTo________________
const listenToLetters = function() {
	let letters = document.querySelectorAll('.letter');
	for (let element of letters) {
		element.addEventListener('click', function() {
			let letter = element.innerHTML;
			getLijstFilms(letter);
		});
	}
};
//#endregion

//#region ***********  INIT / DOMContentLoaded ***********
//#endregion
const init = function() {
	// Get some DOM, we created empty earlier.
	domAlfabet = document.querySelector('.js-alfabet');
	domMovies = document.querySelector('.js-movies');
	ClickedKeywords = document.querySelector('.keywords');
	getAlfabet();
};

document.addEventListener('DOMContentLoaded', init);
//#endregion
