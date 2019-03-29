
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

function testIsAllHonors() {
	for (var i = 0; i < hand.length; i++) {
		if (hand[i].suit) return false;
	}
	return true;
}

function testIsAllOneSuit() {
	let suit = null;
	for (var i = 0; i < hand.length; i++) {
		let handTile = hand[i];
		if (!handTile.suit) return false;
		if (!suit) {
			suit = handTile.suit;
		} else if (handTile.suit !== suit) {
			return false;
		}
	}
	return true;
}

function testIsAllOneSuitAndHonors() {
	let suit = null;
	for (var i = 0; i < hand.length; i++) {
		let handTile = hand[i];
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
	if (hand.indexOf(tiles['s1'] === -1)) return false;
	if (hand.indexOf(tiles['s2'] === -1)) return false;
	if (hand.indexOf(tiles['s3'] === -1)) return false;
	if (hand.indexOf(tiles['s4'] === -1)) return false;
	return true;
}

function testHasAllFlowers () {
	if (hand.indexOf(tiles['f1'] === -1)) return false;
	if (hand.indexOf(tiles['f2'] === -1)) return false;
	if (hand.indexOf(tiles['f3'] === -1)) return false;
	if (hand.indexOf(tiles['f4'] === -1)) return false;
	return true;
}