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
let TYPE_ARROW		= 'dragon';
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
	we : new Tile('we', VALUE_WIND_EAST,			TYPE_WIND,		null,				4,		'&#x1F000;', 0, 0, 4, 16	), // EAST WIND
	ws : new Tile('ws', VALUE_WIND_SOUTH,			TYPE_WIND,		null,				4,		'&#x1F001;', 0, 0, 4, 16	), // SOUTH WIND
	ww : new Tile('ww', VALUE_WIND_WEST,			TYPE_WIND,		null,				4,		'&#x1F002;', 0, 0, 4, 16	), // WEST WIND
	wn : new Tile('wn', VALUE_WIND_NORTH,			TYPE_WIND,		null,				4,		'&#x1F003;', 0, 0, 4, 16	), // NORTH WIND
	ac : new Tile('ac', VALUE_ARROW_CENTRAL,		TYPE_ARROW,		null, 				4,		'&#x1F004;', 0, 2, 4, 16	), // CENTRAL
	af : new Tile('af', VALUE_ARROW_FORTUNE,		TYPE_ARROW,		null, 				4,		'&#x1F005;', 0, 2, 4, 16	), // FORTUNE
	ab : new Tile('ab', VALUE_ARROW_BOARD,			TYPE_ARROW,		null, 				4,		'&#x1F006;', 0, 2, 4, 16	), // BOARD
	c1 : new Tile('c1', 1,							TYPE_TERMINAL,	SUIT_CHARACTERS,	4,		'&#x1F007;', 0, 0, 4, 16	), // ONE OF CHARACTERS
	c2 : new Tile('c2', 2,							TYPE_SIMPLE,	SUIT_CHARACTERS,	4,		'&#x1F008;', 0, 0, 2, 8		), // TWO OF CHARACTERS
	c3 : new Tile('c3', 3,							TYPE_SIMPLE,	SUIT_CHARACTERS,	4,		'&#x1F009;', 0, 0, 2, 8		), // THREE OF CHARACTERS
	c4 : new Tile('c4', 4,							TYPE_SIMPLE,	SUIT_CHARACTERS,	4,		'&#x1F00A;', 0, 0, 2, 8		), // FOUR OF CHARACTERS
	c5 : new Tile('c5', 5,							TYPE_SIMPLE,	SUIT_CHARACTERS,	4,		'&#x1F00B;', 0, 0, 2, 8		), // FIVE OF CHARACTERS
	c6 : new Tile('c6', 6,							TYPE_SIMPLE,	SUIT_CHARACTERS,	4,		'&#x1F00C;', 0, 0, 2, 8		), // SIX OF CHARACTERS
	c7 : new Tile('c7', 7,							TYPE_SIMPLE,	SUIT_CHARACTERS,	4,		'&#x1F00D;', 0, 0, 2, 8		), // SEVEN OF CHARACTERS
	c8 : new Tile('c8', 8,							TYPE_SIMPLE,	SUIT_CHARACTERS,	4,		'&#x1F00E;', 0, 0, 2, 8		), // EIGHT OF CHARACTERS
	c9 : new Tile('c9', 9,							TYPE_TERMINAL,	SUIT_CHARACTERS,	4,		'&#x1F00F;', 0, 0, 4, 16	), // NINE OF CHARACTERS
	b1 : new Tile('b1', 1, 							TYPE_TERMINAL,	SUIT_BAMBOO,		4,		'&#x1F010;', 0, 0, 4, 16	), // ONE OF BAMBOOS
	b2 : new Tile('b2', 2, 							TYPE_SIMPLE,	SUIT_BAMBOO,		4,		'&#x1F011;', 0, 0, 2, 8		), // TWO OF BAMBOOS
	b3 : new Tile('b3', 3, 							TYPE_SIMPLE,	SUIT_BAMBOO,		4,		'&#x1F012;', 0, 0, 2, 8		), // THREE OF BAMBOOS
	b4 : new Tile('b4', 4, 							TYPE_SIMPLE,	SUIT_BAMBOO,		4,		'&#x1F013;', 0, 0, 2, 8		), // FOUR OF BAMBOOS
	b5 : new Tile('b5', 5, 							TYPE_SIMPLE,	SUIT_BAMBOO,		4,		'&#x1F014;', 0, 0, 2, 8		), // FIVE OF BAMBOOS
	b6 : new Tile('b6', 6, 							TYPE_SIMPLE,	SUIT_BAMBOO,		4,		'&#x1F015;', 0, 0, 2, 8		), // SIX OF BAMBOOS
	b7 : new Tile('b7', 7, 							TYPE_SIMPLE,	SUIT_BAMBOO,		4,		'&#x1F016;', 0, 0, 2, 8		), // SEVEN OF BAMBOOS
	b8 : new Tile('b8', 8, 							TYPE_SIMPLE,	SUIT_BAMBOO,		4,		'&#x1F017;', 0, 0, 2, 8		), // EIGHT OF BAMBOOS
	b9 : new Tile('b9', 9, 							TYPE_TERMINAL,	SUIT_BAMBOO,		4,		'&#x1F018;', 0, 0, 4, 16	), // NINE OF BAMBOOS
	d1 : new Tile('d1', 1, 							TYPE_TERMINAL,	SUIT_COINS,			4,		'&#x1F019;', 0, 0, 4, 16	), // ONE OF CIRCLES
	d2 : new Tile('d2', 2, 							TYPE_SIMPLE,	SUIT_COINS,			4,		'&#x1F01A;', 0, 0, 2, 8		), // TWO OF CIRCLES
	d3 : new Tile('d3', 3, 							TYPE_SIMPLE,	SUIT_COINS,			4,		'&#x1F01B;', 0, 0, 2, 8		), // THREE OF CIRCLES
	d4 : new Tile('d4', 4, 							TYPE_SIMPLE,	SUIT_COINS,			4,		'&#x1F01C;', 0, 0, 2, 8		), // FOUR OF CIRCLES
	d5 : new Tile('d5', 5, 							TYPE_SIMPLE,	SUIT_COINS,			4,		'&#x1F01D;', 0, 0, 2, 8		), // FIVE OF CIRCLES
	d6 : new Tile('d6', 6, 							TYPE_SIMPLE,	SUIT_COINS,			4,		'&#x1F01E;', 0, 0, 2, 8		), // SIX OF CIRCLES
	d7 : new Tile('d7', 7, 							TYPE_SIMPLE,	SUIT_COINS,			4,		'&#x1F01F;', 0, 0, 2, 8		), // SEVEN OF CIRCLES
	d8 : new Tile('d8', 8, 							TYPE_SIMPLE,	SUIT_COINS,			4,		'&#x1F020;', 0, 0, 2, 8		), // EIGHT OF CIRCLES
	d9 : new Tile('d9', 9, 							TYPE_TERMINAL,	SUIT_COINS,			4,		'&#x1F021;', 0, 0, 4, 16	), // NINE OF CIRCLES
	f1 : new Tile('f1', VALUE_FLOWER_PLUM,			TYPE_SPECIAL,	null,				1,		'&#x1F022;', 4, 0, 0, 0		), // PLUM
	f2 : new Tile('f2', VALUE_FLOWER_ORCHID,		TYPE_SPECIAL,	null,				1,		'&#x1F023;', 4, 0, 0, 0		), // ORCHID
	f3 : new Tile('f3', VALUE_FLOWER_BAMBOO,		TYPE_SPECIAL,	null,				1,		'&#x1F024;', 4, 0, 0, 0		), // BAMBOO
	f4 : new Tile('f4', VALUE_FLOWER_CHRYSANTHAMUM,	TYPE_SPECIAL,	null,				1,		'&#x1F025;', 4, 0, 0, 0		), // CHRYSANTHEMUM
	s1 : new Tile('s1', VALUE_SEASON_SPRING,		TYPE_SPECIAL,	null,				1,		'&#x1F026;', 4, 0, 0, 0		), // SPRING
	s2 : new Tile('s2', VALUE_SEASON_SUMMER,		TYPE_SPECIAL,	null,				1,		'&#x1F027;', 4, 0, 0, 0		), // SUMMER
	s3 : new Tile('s3', VALUE_SEASON_AUTUMN,		TYPE_SPECIAL,	null,				1,		'&#x1F028;', 4, 0, 0, 0		), // AUTUMN
	s4 : new Tile('s4', VALUE_SEASON_WINTER,		TYPE_SPECIAL,	null,				1,		'&#x1F029;', 4, 0, 0, 0		), // WINTER
	tb : new Tile('tb', null, 						null,			null,				null,	'&#x1F02B;', 0, 0, 0, 0		), // BACK
}