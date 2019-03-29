function Tile (id, value, type, suit, count, char, loneValue, pairValue, pungValue, kongValue) {
	this.id = id;
	this.value = value;
	this.type = type;
	this.suit = suit;
	this.count = count;
	this.char = char;
	this.loneValue = loneValue;
	this.pairValue = pairValue;
	this.pungValue = pungValue;
	this.kongValue = kongValue;
}

let SUIT_COINS		= 'coins';
let SUIT_CHARACTERS	= 'characters';
let SUIT_BAMBOO		= 'bamboo';

let TYPE_SIMPLE		= 'simple';
let TYPE_TERMINAL	= 'terminal';
let TYPE_WIND		= 'wind';
let TYPE_ARROW		= 'arrow';
let TYPE_SPECIAL	= 'special';

let VALUE_WIND_EAST		= 'east';
let VALUE_WIND_SOUTH	= 'south';
let VALUE_WIND_WEST		= 'west';
let VALUE_WIND_NORTH	= 'north';

let VALUE_ARROW_CENTRAL		= 'central';
let VALUE_ARROW_FORTUNE		= 'fortune';
let VALUE_ARROW_BOARD		= 'board';

let VALUE_SEASON_SPRING		= 'spring';
let VALUE_SEASON_SUMMER		= 'summer';
let VALUE_SEASON_AUTUMN		= 'autumn';
let VALUE_SEASON_WINTER		= 'winter';

let VALUE_FLOWER_PLUM			= 'plum';
let VALUE_FLOWER_ORCHID			= 'orchid';
let VALUE_FLOWER_CHRYSANTHAMUM	= 'chrysanthamum';
let VALUE_FLOWER_BAMBOO			= 'bamboo';

let tiles = {
	we : new Tile('we', VALUE_WIND_EAST,			TYPE_WIND,		null,				4,		'🀀', 0, 0, 4, 16	), // MAHJONG TILE EAST WIND
	ws : new Tile('ws', VALUE_WIND_SOUTH,			TYPE_WIND,		null,				4,		'🀁', 0, 0, 4, 16	), // MAHJONG TILE SOUTH WIND
	ww : new Tile('ww', VALUE_WIND_WEST,			TYPE_WIND,		null,				4,		'🀂', 0, 0, 4, 16	), // MAHJONG TILE WEST WIND
	wn : new Tile('wn', VALUE_WIND_NORTH,			TYPE_WIND,		null,				4,		'🀃', 0, 0, 4, 16	), // MAHJONG TILE NORTH WIND
	ac : new Tile('ac', VALUE_ARROW_CENTRAL,		TYPE_ARROW,		null, 				4,		'🀄', 0, 2, 4, 16	), // MAHJONG TILE CENTRAL
	af : new Tile('af', VALUE_ARROW_FORTUNE,		TYPE_ARROW,		null, 				4,		'🀅', 0, 2, 4, 16	), // MAHJONG TILE FORTUNE
	ab : new Tile('ab', VALUE_ARROW_BOARD,			TYPE_ARROW,		null, 				4,		'🀆', 0, 2, 4, 16	), // MAHJONG TILE BOARD
	c1 : new Tile('c1', 1,							TYPE_TERMINAL,	SUIT_CHARACTERS,	4,		'🀇', 0, 0, 4, 16	), // MAHJONG TILE ONE OF CHARACTERS
	c2 : new Tile('c2', 2,							TYPE_SIMPLE,	SUIT_CHARACTERS,	4,		'🀈', 0, 0, 2, 8	), // MAHJONG TILE TWO OF CHARACTERS
	c3 : new Tile('c3', 3,							TYPE_SIMPLE,	SUIT_CHARACTERS,	4,		'🀉', 0, 0, 2, 8	), // MAHJONG TILE THREE OF CHARACTERS
	c4 : new Tile('c4', 4,							TYPE_SIMPLE,	SUIT_CHARACTERS,	4,		'🀊', 0, 0, 2, 8	), // MAHJONG TILE FOUR OF CHARACTERS
	c5 : new Tile('c5', 5,							TYPE_SIMPLE,	SUIT_CHARACTERS,	4,		'🀋', 0, 0, 2, 8	), // MAHJONG TILE FIVE OF CHARACTERS
	c6 : new Tile('c6', 6,							TYPE_SIMPLE,	SUIT_CHARACTERS,	4,		'🀌', 0, 0, 2, 8	), // MAHJONG TILE SIX OF CHARACTERS
	c7 : new Tile('c7', 7,							TYPE_SIMPLE,	SUIT_CHARACTERS,	4,		'🀍', 0, 0, 2, 8	), // MAHJONG TILE SEVEN OF CHARACTERS
	c8 : new Tile('c8', 8,							TYPE_SIMPLE,	SUIT_CHARACTERS,	4,		'🀎', 0, 0, 2, 8	), // MAHJONG TILE EIGHT OF CHARACTERS
	c9 : new Tile('c9', 9,							TYPE_TERMINAL,	SUIT_CHARACTERS,	4,		'🀏', 0, 0, 4, 16	), // MAHJONG TILE NINE OF CHARACTERS
	b1 : new Tile('b1', 1, 							TYPE_TERMINAL,	SUIT_BAMBOO,		4,		'🀐', 0, 0, 4, 16	), // MAHJONG TILE ONE OF BAMBOOS
	b2 : new Tile('b2', 2, 							TYPE_SIMPLE,	SUIT_BAMBOO,		4,		'🀑', 0, 0, 2, 8	), // MAHJONG TILE TWO OF BAMBOOS
	b3 : new Tile('b3', 3, 							TYPE_SIMPLE,	SUIT_BAMBOO,		4,		'🀒', 0, 0, 2, 8	), // MAHJONG TILE THREE OF BAMBOOS
	b4 : new Tile('b4', 4, 							TYPE_SIMPLE,	SUIT_BAMBOO,		4,		'🀓', 0, 0, 2, 8	), // MAHJONG TILE FOUR OF BAMBOOS
	b5 : new Tile('b5', 5, 							TYPE_SIMPLE,	SUIT_BAMBOO,		4,		'🀔', 0, 0, 2, 8	), // MAHJONG TILE FIVE OF BAMBOOS
	b6 : new Tile('b6', 6, 							TYPE_SIMPLE,	SUIT_BAMBOO,		4,		'🀕', 0, 0, 2, 8	), // MAHJONG TILE SIX OF BAMBOOS
	b7 : new Tile('b7', 7, 							TYPE_SIMPLE,	SUIT_BAMBOO,		4,		'🀖', 0, 0, 2, 8	), // MAHJONG TILE SEVEN OF BAMBOOS
	b8 : new Tile('b8', 8, 							TYPE_SIMPLE,	SUIT_BAMBOO,		4,		'🀗', 0, 0, 2, 8	), // MAHJONG TILE EIGHT OF BAMBOOS
	b9 : new Tile('b9', 9, 							TYPE_TERMINAL,	SUIT_BAMBOO,		4,		'🀘', 0, 0, 4, 16	), // MAHJONG TILE NINE OF BAMBOOS
	d1 : new Tile('d1', 1, 							TYPE_TERMINAL,	SUIT_COINS,			4,		'🀙', 0, 0, 4, 16	), // MAHJONG TILE ONE OF CIRCLES
	d2 : new Tile('d2', 2, 							TYPE_SIMPLE,	SUIT_COINS,			4,		'🀚', 0, 0, 2, 8	), // MAHJONG TILE TWO OF CIRCLES
	d3 : new Tile('d3', 3, 							TYPE_SIMPLE,	SUIT_COINS,			4,		'🀛', 0, 0, 2, 8	), // MAHJONG TILE THREE OF CIRCLES
	d4 : new Tile('d4', 4, 							TYPE_SIMPLE,	SUIT_COINS,			4,		'🀜', 0, 0, 2, 8	), // MAHJONG TILE FOUR OF CIRCLES
	d5 : new Tile('d5', 5, 							TYPE_SIMPLE,	SUIT_COINS,			4,		'🀝', 0, 0, 2, 8	), // MAHJONG TILE FIVE OF CIRCLES
	d6 : new Tile('d6', 6, 							TYPE_SIMPLE,	SUIT_COINS,			4,		'🀞', 0, 0, 2, 8	), // MAHJONG TILE SIX OF CIRCLES
	d7 : new Tile('d7', 7, 							TYPE_SIMPLE,	SUIT_COINS,			4,		'🀟', 0, 0, 2, 8	), // MAHJONG TILE SEVEN OF CIRCLES
	d8 : new Tile('d8', 8, 							TYPE_SIMPLE,	SUIT_COINS,			4,		'🀠', 0, 0, 2, 8	), // MAHJONG TILE EIGHT OF CIRCLES
	d9 : new Tile('d9', 9, 							TYPE_TERMINAL,	SUIT_COINS,			4,		'🀡', 0, 0, 4, 16	), // MAHJONG TILE NINE OF CIRCLES
	f1 : new Tile('f1', VALUE_FLOWER_PLUM,			TYPE_SPECIAL,	null,				1,		'🀢', 4, 0, 0, 0	), // MAHJONG TILE PLUM
	f2 : new Tile('f2', VALUE_FLOWER_ORCHID,		TYPE_SPECIAL,	null,				1,		'🀣', 4, 0, 0, 0	), // MAHJONG TILE ORCHID
	f3 : new Tile('f3', VALUE_FLOWER_BAMBOO,		TYPE_SPECIAL,	null,				1,		'🀤', 4, 0, 0, 0	), // MAHJONG TILE BAMBOO
	f4 : new Tile('f4', VALUE_FLOWER_CHRYSANTHAMUM,	TYPE_SPECIAL,	null,				1,		'🀥', 4, 0, 0, 0	), // MAHJONG TILE CHRYSANTHEMUM
	s1 : new Tile('s1', VALUE_SEASON_SPRING,		TYPE_SPECIAL,	null,				1,		'🀦', 4, 0, 0, 0	), // MAHJONG TILE SPRING
	s2 : new Tile('s2', VALUE_SEASON_SUMMER,		TYPE_SPECIAL,	null,				1,		'🀧', 4, 0, 0, 0	), // MAHJONG TILE SUMMER
	s3 : new Tile('s3', VALUE_SEASON_AUTUMN,		TYPE_SPECIAL,	null,				1,		'🀨', 4, 0, 0, 0	), // MAHJONG TILE AUTUMN
	s4 : new Tile('s4', VALUE_SEASON_WINTER,		TYPE_SPECIAL,	null,				1,		'🀩', 4, 0, 0, 0	), // MAHJONG TILE WINTER
	tb : new Tile('tb', null, 						null,			null,				null,	'🀫', 0, 0, 0, 0	), // MAHJONG TILE BACK
}