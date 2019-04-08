
function testIsMahjong() {
	let pairFound = false;
	let tilesFound = 0;

	for (var i = 0; i < features.length; i++) {
		let feature = features[i];

		switch (feature.type) {
			case FEATURE_TYPE_LONE:
				// Do nothing
				break;
			case FEATURE_TYPE_PAIR:
				if (pairFound) return false;
				pairFound = true;
				tilesFound += 2;
				break;
			case FEATURE_TYPE_CHOW:
			case FEATURE_TYPE_PUNG:
			case FEATURE_TYPE_KONG:
				tilesFound += 3;
				break;
			default:
				return false;
		}
	}

	return tilesFound === 14;
}

function testAllHonors() {
	for (var i = 0; i < hand.length; i++) {
		if (hand[i].suit) return false;
	}
	return true;
}

function testAllOneSuit() {
	let suit = null;
	for (var i = 0; i < hand.length; i++) {
		let handTile = hand[i];
		if (handTile.type === TYPE_SPECIAL) continue;
		if (!handTile.suit) return false;
		if (!suit) {
			suit = handTile.suit;
		} else if (handTile.suit !== suit) {
			return false;
		}
	}
	return true;
}

function testAllOneSuitAndHonors() {
	let suit = null;
	for (var i = 0; i < hand.length; i++) {
		let handTile = hand[i];
		if (handTile.type === TYPE_SPECIAL) continue;
		if (handTile.suit) {
			if (!suit) {
				suit = handTile.suit;
			} else if (handTile.suit !== suit) {
				return false;
			}
		}
	}
	return true;
}

function testAllTerminalsAndHonors () {
	for (var i = 0; i < hand.length; i++) {
		switch (hand[i].type) {
			case TYPE_SPECIAL:
			case TYPE_TERMINAL:
			case TYPE_WIND:
			case TYPE_ARROW:
				continue;
		}
		return false;
	}
	return true;
}

function testNoScoringFeatures() {
	for (var i = 0; i < features.length; i++) {
		let feature = features[i];
		let firstTile = feature.getFirstTile();
		switch(feature.type) {
			case FEATURE_TYPE_PAIR:
				if (firstTile.pairValue) return false;
			case FEATURE_TYPE_PUNG:
			case FEATURE_TYPE_KONG:
				return false;
		}
	}
	return true;
}

function testNoChows () {
	for (var i = 0; i < features.length; i++) {
		if (features[i].type === FEATURE_TYPE_CHOW) return false;
	}
	return true;
}

function testPungOrKongOfSpecialWind () {
	for (var i = 0; i < features.length; i++) {
		switch (features[i].type) {
			case FEATURE_TYPE_PUNG:
			case FEATURE_TYPE_KONG:
				let firstTile = features[i].getFirstTile();
				if (firstTile.value === prevailingWind || firstTile.value === seatWind) return true;
		}
	}
	return false;
}

function testPungOrKongOfArrows () {
	for (var i = 0; i < features.length; i++) {
		switch (features[i].type) {
			case FEATURE_TYPE_PUNG:
			case FEATURE_TYPE_KONG:
				let firstTile = features[i].getFirstTile();
				if (firstTile.type === TYPE_ARROW) return true;
		}
	}
	return false;
}

function testAllFeaturesConcealed () {
	for (var i = 0; i < features.length; i++) {
		let feature = features[i];
		if (!feature.type) return false;
		if (feature.type === FEATURE_TYPE_LONE) continue;
		if (feature.status === FEATURE_STATUS_EXPOSED) return false;
	}
	return true;
}

function testHasOwnSeason() {
	switch (seatWind) {
		case VALUE_WIND_EAST:	return hand.indexOf(tiles['s1']) !== -1;
		case VALUE_WIND_SOUTH:	return hand.indexOf(tiles['s2']) !== -1;
		case VALUE_WIND_WEST:	return hand.indexOf(tiles['s3']) !== -1;
		case VALUE_WIND_NORTH:	return hand.indexOf(tiles['s4']) !== -1;
	}
	return false;
}

function testHasOwnFlower() {
	switch (seatWind) {
		case VALUE_WIND_EAST:	return hand.indexOf(tiles['f1']) !== -1;
		case VALUE_WIND_SOUTH:	return hand.indexOf(tiles['f2']) !== -1;
		case VALUE_WIND_WEST:	return hand.indexOf(tiles['f3']) !== -1;
		case VALUE_WIND_NORTH:	return hand.indexOf(tiles['f4']) !== -1;
	}
	return false;
}

function testHasAllSeasons () {
	if (hand.indexOf(tiles['s1']) === -1) return false;
	if (hand.indexOf(tiles['s2']) === -1) return false;
	if (hand.indexOf(tiles['s3']) === -1) return false;
	if (hand.indexOf(tiles['s4']) === -1) return false;
	return true;
}

function testHasAllFlowers () {
	if (hand.indexOf(tiles['f1']) === -1) return false;
	if (hand.indexOf(tiles['f2']) === -1) return false;
	if (hand.indexOf(tiles['f3']) === -1) return false;
	if (hand.indexOf(tiles['f4']) === -1) return false;
	return true;
}

// Not yet in use
function testFourKongs () {
	let kongs = 0;
	for (var i = 0; i < features.length; i++)
		if (features[i].type === FEATURE_TYPE_KONG) kongs++;
	return kongs === 4;
}

function testAllConcealedAllScoreing () {
	return testNoChows() && testAllFeaturesConcealed();
}

function testAllTerminals () {
	for (var i = 0; i < hand.length; i++) {
		switch (hand[i].type) {
			case TYPE_SPECIAL:
			case TYPE_TERMINAL:
				continue;
		}
		return false;
	}
	return true;
}

function testAllSimples () {
	for (var i = 0; i < hand.length; i++) {
		switch (hand[i].type) {
			case TYPE_SPECIAL:
			case TYPE_SIMPLE:
				continue;
		}
		return false;
	}
	return true;
}

// Limit hands /////////////////////////////////////////////////////////////////

function testThirteenOrphans () {
	if (hand.indexOf(tiles['b1']) === -1) return false;
	if (hand.indexOf(tiles['b9']) === -1) return false;
	if (hand.indexOf(tiles['c1']) === -1) return false;
	if (hand.indexOf(tiles['c9']) === -1) return false;
	if (hand.indexOf(tiles['d1']) === -1) return false;
	if (hand.indexOf(tiles['d9']) === -1) return false;
	if (hand.indexOf(tiles['ac']) === -1) return false;
	if (hand.indexOf(tiles['ab']) === -1) return false;
	if (hand.indexOf(tiles['af']) === -1) return false;
	if (hand.indexOf(tiles['we']) === -1) return false;
	if (hand.indexOf(tiles['ws']) === -1) return false;
	if (hand.indexOf(tiles['ww']) === -1) return false;
	if (hand.indexOf(tiles['wn']) === -1) return false;

	let orphans = [
		tiles['b1'],
		tiles['b9'],
		tiles['c1'],
		tiles['c9'],
		tiles['d1'],
		tiles['d9'],
		tiles['ac'],
		tiles['ab'],
		tiles['af'],
		tiles['we'],
		tiles['ws'],
		tiles['ww'],
		tiles['wn']
	];

	let foundOrphans = 0;

	for (var i = 0; i < hand.length; i++) {
		if (hand[i].type === TYPE_SPECIAL) continue;
		if (orphans.indexOf(hand[i]) === -1) return false;
		foundOrphans++;
	}

	if (foundOrphans !== 14) return false;

	return true;
}

function testBigThreeDragons () {

	let acFound = false;
	let afFound = false;
	let abFound = false;

	for (var i = 0; i < features.length; i++) {
		if (features[i].type === FEATURE_TYPE_PUNG || features[i].type === FEATURE_TYPE_KONG) {
			let firstTile = features[i].getFirstTile();
			if (firstTile.type !== TYPE_ARROW) continue;
			switch (firstTile.value) {
				case VALUE_ARROW_BOARD:		abFound = true; break;
				case VALUE_ARROW_FORTUNE:	afFound = true; break;
				case VALUE_ARROW_CENTRAL:	acFound = true; break;
			}
		}
	}

	return acFound && abFound && afFound;
}

function testLittleThreeDragons () {

	let acFound = false;
	let afFound = false;
	let abFound = false;
	let pairFound = false;

	for (var i = 0; i < features.length; i++) {
		if (features[i].type === FEATURE_TYPE_PUNG || features[i].type === FEATURE_TYPE_KONG || features[i].type === FEATURE_TYPE_PAIR) {
			let firstTile = features[i].getFirstTile();
			if (firstTile.type !== TYPE_ARROW) continue;
			switch (firstTile.value) {
				case VALUE_ARROW_BOARD:		abFound = true; break;
				case VALUE_ARROW_FORTUNE:	afFound = true; break;
				case VALUE_ARROW_CENTRAL:	acFound = true; break;
			}

			if (features[i].type === FEATURE_TYPE_PAIR) pairFound = true;
		}
	}

	return acFound && abFound && afFound && pairFound;
}

function testBigFourWinds () {

	let ewFound = false;
	let swFound = false;
	let wwFound = false;
	let nwFound = false;

	for (var i = 0; i < features.length; i++) {
		if (features[i].type === FEATURE_TYPE_PUNG || features[i].type === FEATURE_TYPE_KONG) {
			let firstTile = features[i].getFirstTile();
			if (firstTile.type !== TYPE_WIND) continue;
			switch (firstTile.value) {
				case VALUE_WIND_EAST:	ewFound = true; break;
				case VALUE_WIND_SOUTH:	swFound = true; break;
				case VALUE_WIND_WEST:	wwFound = true; break;
				case VALUE_WIND_NORTH:	nwFound = true; break;
			}
		}
	}

	return ewFound && swFound && wwFound && nwFound;
}

function testLittleFourWinds () {

	let ewFound = false;
	let swFound = false;
	let wwFound = false;
	let nwFound = false;
	let pairFound = false;

	for (var i = 0; i < features.length; i++) {
		if (features[i].type === FEATURE_TYPE_PUNG || features[i].type === FEATURE_TYPE_KONG || features[i].type === FEATURE_TYPE_PAIR) {
			let firstTile = features[i].getFirstTile();
			if (firstTile.type !== TYPE_WIND) continue;
			switch (firstTile.value) {
				case VALUE_WIND_EAST:	ewFound = true; break;
				case VALUE_WIND_SOUTH:	swFound = true; break;
				case VALUE_WIND_WEST:	wwFound = true; break;
				case VALUE_WIND_NORTH:	nwFound = true; break;
			}

			if (features[i].type === FEATURE_TYPE_PAIR) pairFound = true;
		}
	}

	return ewFound && swFound && wwFound && nwFound && pairFound;
}

// Do big and small winds here

function testNineGates () {

}