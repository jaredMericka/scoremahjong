
let FEATURE_TYPE_LONE	= 'lone';
let FEATURE_TYPE_PAIR	= 'pair';
let FEATURE_TYPE_CHOW	= 'chow';
let FEATURE_TYPE_PUNG	= 'pung';
let FEATURE_TYPE_KONG	= 'kong';

let FEATURE_STATUS_CONCEALED	= 'concealed';
let FEATURE_STATUS_EXPOSED		= 'exposed';

function Feature() {
	this.tiles = [];
	this.type = null;
	this.status = FEATURE_STATUS_EXPOSED;
	this.value = 0;

	this.add = function (tile) {

		// Always add the first tile
		if (this.tiles.length === 0){
			if (tile.type === TYPE_SPECIAL) this.type = FEATURE_TYPE_LONE;
			this.tiles.push(tile);
			return true;
		}

		// Make sure we're not adding to a completed feature
		if (this.type === FEATURE_TYPE_LONE) return false;
		if (this.type === FEATURE_TYPE_CHOW && this.tiles.length >= 3) return false;
		if (this.type === FEATURE_TYPE_KONG) return false;

		// Always allow ONE face-down tile
		if (tile.id === 'tb') {
			if (this.tiles.indexOf(tiles.tb) === -1) {
				switch (this.tiles.length) {
					case 1:
						this.type = FEATURE_TYPE_PAIR;
						this.status = FEATURE_STATUS_CONCEALED;
						break;
					case 2:
						if (this.type === FEATURE_TYPE_PAIR) {
							this.type = FEATURE_TYPE_PUNG;
							this.status = FEATURE_STATUS_CONCEALED;
						}
						break;
					case 3:
						if (this.type === FEATURE_TYPE_PUNG) {
							this.type = FEATURE_TYPE_KONG;
							this.status = FEATURE_STATUS_CONCEALED;
						}
						break;
				}
				this.tiles.push(tile);
				return true;
			} else return false;
		}

		// If the tile is face down, get the first one (and assume pung or kong).
		let previousTile = this.tiles[this.tiles.length - 1];
		if (previousTile.id === 'tb') previousTile = this.tiles[0];
		if (previousTile.id === 'tb') {
			this.tiles.push(tile);
			this.type = FEATURE_TYPE_PAIR;
			this.status = FEATURE_STATUS_CONCEALED;
			return true;
		}

		// If it's not even the same suit, it doesn't belong in this feature.
		if (previousTile.suit !== tile.suit) return false;

		if (previousTile.suit
			&& (!this.type || this.type === FEATURE_TYPE_CHOW
				// A concealed pair could also be the start of a concealed chow
				|| (this.type === FEATURE_TYPE_PAIR && this.status === FEATURE_STATUS_CONCEALED)
			)
		) {
			let previousTileIndex = this.tiles.indexOf(previousTile);
			let expectedChowValue = this.tiles.length - previousTileIndex + previousTile.value;

			if (tile.value === expectedChowValue) {
				this.tiles.push(tile);
				this.type = FEATURE_TYPE_CHOW;
				return true;
			}
		}

		// Pairs, pungs and kongs are taken care of here
		if (previousTile.suit === tile.suit && tile.value === previousTile.value) {
			switch (this.tiles.length) {
				case 1:
					this.type = FEATURE_TYPE_PAIR;
					this.tiles.push(tile);
					return true;
				case 2:
					if (this.type === FEATURE_TYPE_PAIR) {
						this.type = FEATURE_TYPE_PUNG;
						this.tiles.push(tile);
						return true;
					} else return false;
				case 3:
					if (this.type === FEATURE_TYPE_PUNG) {
						this.type = FEATURE_TYPE_KONG;
						this.tiles.push(tile);
						return true;
					} else return false;
			}
		}
	}

	this.getScore = function () {
		let firstTile = this.tiles[0];
		if (!firstTile) return 0;
		if (firstTile.id === 'tb') firstTile = this.tiles[1];

		switch (this.type) {
			case FEATURE_TYPE_LONE: // Seasons and flowers only
				return firstTile.loneValue;
			case FEATURE_TYPE_PAIR:
				if (firstTile.value === seatWind || firstTile.value === prevailingWind) return 2;
				return firstTile.pairValue;
			case FEATURE_TYPE_CHOW:
				return 0;
			case FEATURE_TYPE_PUNG:
				return firstTile.pungValue * (this.status === FEATURE_STATUS_CONCEALED ? 2 : 1);
			case FEATURE_TYPE_KONG:
				return firstTile.kongValue * (this.status === FEATURE_STATUS_CONCEALED ? 2 : 1);
		}

		return 0;
	}

	this.getFirstTile = function () {
		if (!this.tiles[0]) return false;
		let firstTile = this.tiles[0];
		if (firstTile.id === 'tb') {
			if (this.tiles[1]) return this.tiles[1];
			return false;
		}
		return firstTile;
	}
}