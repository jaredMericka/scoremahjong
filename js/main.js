
let hand			= [];
let features		= [];
let seatWind		= null;
let prevailingWind	= null;
let score			= 0;

let SCORE_LIMIT		= 500;

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
	let breakdownDiv = document.querySelector('.hand-breakdown');
	let breakdownRows_points = [];
	let breakdownRows_doublers = [];

	// Count scores for each feature
	for (var i = 0; i < features.length; i++) {
		let feature = features[i];
		let featureScore = feature.getScore();
		score += featureScore
		
		if (feature.type)
			breakdownRows_points.push(getBreakdownRow(feature.getString(), featureScore));
	}

	// Test for unconventional limit hands
	if (testThirteenOrphans()) {
		score = Infinity;
		breakdownRows_points.push(getBreakdownRow('Thirteen Orphans', Infinity));
	}
	
	if (testNineGates()){
		score = Infinity;
		breakdownRows_points.push(getBreakdownRow('Nine Gates', Infinity));
	}
	
	// Add mahjong score
	if (isMahjong) {
		
		// Test mahjong-dependent limit hands
		if (testAllConcealedAllScoring()){
			score = Infinity;
			breakdownRows_points.push(getBreakdownRow('All concealed, all scoring', Infinity));
		}

		if (testFourKongs()){
			score = Infinity;
			breakdownRows_points.push(getBreakdownRow('Four kongs', Infinity));
		}
		
		if (testAllTerminals()){
			score = Infinity;
			breakdownRows_points.push(getBreakdownRow('All terminals', Infinity));
		}
		
		if (testAllHonors()){
			score = Infinity;
			breakdownRows_points.push(getBreakdownRow('All honors', Infinity));
		}
		
		if (testBigThreeDragons()){
			score = Infinity;
			breakdownRows_points.push(getBreakdownRow('Three big dragons', Infinity));
		}
		
		if (immediateMahjong){
			score = Infinity;
			breakdownRows_points.push(getBreakdownRow('Declare Mahjong immediately after dealing', Infinity));
		}
		
		if (testBigFourWinds()){
			score = Infinity;
			breakdownRows_points.push(getBreakdownRow('Big four winds', Infinity));
		}
		
		if (testLittleFourWinds()){
			score = Infinity;
			breakdownRows_points.push(getBreakdownRow('Little four winds', Infinity));
		}

		if (score !== Infinity) {
			score += 20;
			breakdownRows_points.push(getBreakdownRow('Declare Mahjong', 20));
			
			if (lastTileFromWall) {
				score += 2;
				breakdownRows_points.push(getBreakdownRow('Last tile drawn from the wall', 2));
			}
			
			if (lastTileOnlyPossible) {
				score += 2;
				breakdownRows_points.push(getBreakdownRow('Last tile is the only possible tile to complete hand', 2));
			}
			
			if (lastTileFromKongBox) {
				score += 10;
				breakdownRows_points.push(getBreakdownRow('Last tile is from the kong box', 10));
			}
			
			if (testNoScoringFeatures()) {
				score += 10;
				breakdownRows_points.push(getBreakdownRow('All chows', 10));
			}
			
			if (testNoChows()) {
				score += 10;
				breakdownRows_points.push(getBreakdownRow('No chows', 10));
			}
			
			// Add doublers
			
			if (lastTileFromRobbedKong) {
				doublers += 1;
				breakdownRows_doublers.push(getBreakdownRow('Last tile from a robbed kong', 1));
			}
			
			if (lastTileFromKongBox) {
				doublers += 1;
				breakdownRows_doublers.push(getBreakdownRow('Last tile from the Kong Box', 1));
			}
			
			if (testPungOrKongOfSeatWind()) {
				doublers += 1;
				breakdownRows_doublers.push(getBreakdownRow('Pung or kong of seat wind', 1));
			}

			if (testPungOrKongOfPrevailingWind()) {
				doublers += 1;
				breakdownRows_doublers.push(getBreakdownRow('Pung or kong of seat wind', 1));
			}
			
			if (testPungOrKongOfArrows()) {
				doublers += 1;
				breakdownRows_doublers.push(getBreakdownRow('Pung or kong of dragons', 1));
			}
			
			if (testHasOwnFlower()) {
				doublers += 1;
				breakdownRows_doublers.push(getBreakdownRow('Seat flower', 1));
			}
			
			if (testHasOwnSeason()) {
				doublers += 1;
				breakdownRows_doublers.push(getBreakdownRow('Seat season', 1));
			}
			
			if (testAllSimples()) {
				doublers += 1;
				breakdownRows_doublers.push(getBreakdownRow('All simples', 1));
			}

			if (testAllFeaturesConcealed()) {
				doublers += 2;
				breakdownRows_doublers.push(getBreakdownRow('All features concealed', 2));
			}else if (allButLastTileConcealed) {
				doublers += 1;
				breakdownRows_doublers.push(getBreakdownRow('All but the last tile concealed', 1));
			}

			if (testAllOneSuit()) {
				doublers += 4;
				breakdownRows_doublers.push(getBreakdownRow('All one suit', 4));
			}
			
			if (testAllOneSuitAndHonors()) {
				doublers += 3;
				breakdownRows_doublers.push(getBreakdownRow('All one suit and honors', 3));
			}
			
			if (testAllTerminalsAndHonors()) {
				doublers += 3;
				breakdownRows_doublers.push(getBreakdownRow('All terminals and honors', 3));
			}
			
			if (testAllHonors()) {
				doublers += 3;
				breakdownRows_doublers.push(getBreakdownRow('All honors', 3));
			}
			
			if (testLittleThreeDragons()) {
				doublers += 3;
				breakdownRows_doublers.push(getBreakdownRow('Little three dragons', 3));
			}
			
			if (testHasAllFlowers()) {
				doublers += 4;
				breakdownRows_doublers.push(getBreakdownRow('All flowers', 4));
			}
			
			if (testHasAllSeasons()) {
				doublers += 4;
				breakdownRows_doublers.push(getBreakdownRow('All seasons', 4));
			}

		}
	}

	let baseScore = score;

	for (var i = 0; i < doublers; i ++) {
		score = score * 2;
	}

	if (score || isMahjong) {
		let displayScore = score;
		let totalLine = '<tr class="total-line"><td colspan="2"><hr></td></tr>';
		if (score > SCORE_LIMIT) {
			displayScore = '500 (' + (score === Infinity ? '&infin;' : score) + ')';
		}

		scoreDiv.innerHTML = "Score: " + displayScore + (isMahjong ? ' Mahjong!' : '');
		let breakdownHtml
			= '<table>'
			+ '<tr><th>Points</th></tr>'
			+ breakdownRows_points.join('')
			+ totalLine
			+ '<tr class="total"><td class="breakdown-total">Total</td><td class="breakdown-points">' + baseScore + '</td></tr>';
			
			if (breakdownRows_doublers.length) {
				breakdownHtml = breakdownHtml
				+ '<tr><th>Doublers</th></tr>'
				+ breakdownRows_doublers.join('')
				+ totalLine
				+ '<tr class="total"><td  class="breakdown-total">Total</td><td class="breakdown-points">' + doublers + '</td></tr>';
		}

		breakdownHtml = breakdownHtml
			+ '</table>'
			+ '<div class="breakdown-calc">' + baseScore + ' &times; 2<sup>' + doublers + '</sup> = ' + score + '</div>';

		breakdownDiv.innerHTML = breakdownHtml;

	} else {
		scoreDiv.innerHTML = '';
		breakdownDiv.innerHTML = '';
		document.getElementsByClassName('hand')[0].classList.remove('show-breakdown');
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

	handString = handString + ' Scrore: ' + score + (testIsMahjong() ? ' Mahjong!' : '');

	return handString;
}

function copyHandString () {
	let copyInput = document.querySelector('.copyInput');
	let copyDiv = document.querySelector('.copyDiv');

	copyDiv.innerHTML = getHandString();
	copyInput.value = copyDiv.innerHTML;
	copyInput.select();
	document.execCommand('copy');
	copyInput.blur();

	showToast('Hand and score copied!');
}

function showToast (message) {
	let toastContainer = document.querySelector('.toast-container');
	document.querySelector('.toast').innerHTML = message;

	toastContainer.classList.add('toast-container__visible');
	setTimeout(() => {
		toastContainer.classList.remove('toast-container__visible');
	}, 2000);
}

function getBreakdownRow(message, score) {
	return '<tr><td class="breakdown-message">' + message + '</td>'
		+ '<td class="breakdown-points">' + score + '</td>'
		+ '</tr>';
}

function toggleBreakdown() {
	document.querySelector('.hand').classList.toggle('show-breakdown');
	document.querySelector('.hand-breakdown').scrollTop = 0;
}

function ucFirst(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}