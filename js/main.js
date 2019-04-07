
let hand			= [];
let features		= [];
let seatWind		= null;
let prevailingWind	= null;
let score			= 0;

// These need to be var so that we can access them via "window".
var lastTileFromWall		= false;
var lastTileFromKongBox		= false;
var lastTileFromRobbedKong	= false;
var lastTileOnlyPossible	= false;
var allButLastTileConcealed	= false;
var immediateMahjong		= false;

function updateScore () {
	score = 0;
	let doublers = 0;
	let isMahjong = testIsMahjong();
	let scoreDiv = document.querySelector('.hand-score');

	// Count scores for each feature
	for (var i = 0; i < features.length; i++) {
		let feature = features[i];
		score += feature.getScore();
	}

	// Add mahjong score
	if (isMahjong) {
		score += 20;
		if (lastTileFromWall)			score += 2;
		if (lastTileOnlyPossible)		score += 2;
		if (lastTileFromKongBox)		score += 10;
		if (testNoScoringFeatures())	score += 10;
		if (testNoChows())				score += 10;
		
		if (lastTileFromRobbedKong)			doublers += 1;
		if (lastTileFromKongBox)			doublers += 1;
		if (testAllFeaturesConcealed())		doublers += 2;
		else if (allButLastTileConcealed)	doublers += 1;
		if (immediateMahjong)				doublers += 3;
		if (testAllOneSuit())				doublers += 3;
		if (testAllOneSuitAndHonors())		doublers += 3;
		if (testAllTerminalsAndHonors())	doublers += 3;
		if (testAllHonors())				doublers += 3;
	}

	// Add doublers
	if (testPungOrKongOfSpecialWind())	doublers += 1;
	if (testPungOrKongOfArrows())		doublers += 1;
	if (testHasOwnFlower())				doublers += 1;
	if (testHasOwnSeason())				doublers += 1;
	if (testHasAllFlowers())			doublers += 3;
	if (testHasAllSeasons())			doublers += 3;

	for (var i = 0; i < doublers; i ++) {
		score = score * 2;
	}

	if (score || isMahjong) {
		scoreDiv.innerHTML = "Score: " + score + (isMahjong ? ' Mahjong!' : '');
	} else {
		scoreDiv.innerHTML = '';
	}
}

function addToHand(tile) {
	hand.push(tile);
	updateHandDisplay();
	let handDiv = document.getElementsByClassName('hand')[0];
	handDiv.scrollLeft = handDiv.scrollWidth;
}

function removeFromHand(index) {
	hand.splice(index, 1);
	updateHandDisplay();
}

function clearHand () {
	hand = [];
	updateHandDisplay();

	let checkboxes = document.querySelectorAll('input[type="checkbox"]');

	for (var i = 0; i < checkboxes.length; i++) {
		checkboxes[i].checked = false;
		checkboxes[i].onchange();
	}
}

function setPrevWind(wind) {
	switch (wind) {
		case 'east':	prevailingWind = VALUE_WIND_EAST;	break;
		case 'south':	prevailingWind = VALUE_WIND_SOUTH;	break;
		case 'west':	prevailingWind = VALUE_WIND_WEST;	break;
		case 'north':	prevailingWind = VALUE_WIND_NORTH;	break;
	}
	updateScore();
}

function setSeatWind(wind) {
	switch (wind) {
		case 'east':	seatWind = VALUE_WIND_EAST;		break;
		case 'south':	seatWind = VALUE_WIND_SOUTH;	break;
		case 'west':	seatWind = VALUE_WIND_WEST;		break;
		case 'north':	seatWind = VALUE_WIND_NORTH;	break;
	}
	updateScore();
}

function checkboxOnChange(checkbox) {
	window[checkbox.id] = checkbox.checked;
	updateScore();
}

function updateHandDisplay() {
	let handDiv = document.getElementsByClassName('hand-tiles')[0];
	features = [];
	// Clear hand display
	while (handDiv.firstChild) {
		handDiv.removeChild(handDiv.firstChild);
	}

	// Sort hand into features
	let workingFeature = new Feature();
	for (var i = 0; i < hand.length; i ++) {
		let handTile = hand[i];

		if (!workingFeature.add(handTile)) {
			features.push(workingFeature);
			workingFeature = new Feature();
			workingFeature.add(handTile);
		}
	}
	features.push(workingFeature);



	// Cycle over features
	let handIndex = 0;
	for (var i = 0; i < features.length; i++) {
		let feature = features[i];
		let featureDiv = document.createElement('div');
		featureDiv.className = 'feature';

		// Cycle over tiles in the feature and add to the feature div
		for (var j = 0; j < feature.tiles.length; j++) {
			let handTile = feature.tiles[j];
			let displayTile = document.createElement('div');
			displayTile.className = 'tile tile-hand';
			displayTile.dataset.tile = handTile.id;
			let index = handIndex++;
			displayTile.onclick = function () {
				removeFromHand(index);
			} 

			featureDiv.appendChild(displayTile);
		}

		// Add the feature div to the hand
		handDiv.appendChild(featureDiv);
	}

	updateScore();
}

function showInfo() {
	document.querySelector('.info-veil').style.display = 'flex';
}

function hideInfo() {
	document.querySelector('.info-veil').style.display = 'none';
}

function getHandString () {
	let handString = '';

	for (var i = 0; i < features.length; i++) {
		let feature = features[i];

		for (var j = 0; j < feature.tiles.length; j++) {
			handString = handString + feature.tiles[j].char;
		}

		if (i < features.length - 1) handString = handString + ' ';
	}

	handString = handString + '\nScrore: ' + score + (testIsMahjong() ? ' Mahjong!' : '');

	return handString;
}

function copyHandString () {
	let copyInput = document.querySelector('.copyInput');
	let copyDiv = document.querySelector('.copyDiv');

	copyDiv.innerHTML = getHandString();
	copyInput.value = copyDiv.innerHTML;
	copyInput.select();
	document.execCommand('copy');
}