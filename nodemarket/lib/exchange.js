'use strict'

var $ = require('jquery'),
BinaryHeap = require('./BinaryHeap');

// constants
var BUY = "buys", SELL = "sells";
// create binary heap
function createBinaryHeap(orderType) {
	return new BinaryHeap(function(x) {
		return x;
	}, orderType);
}

function createExchange(exchangeDate) {
	var cloned = $.extend(true, {}, exchangeData);
	cloned.trades = [];
	init(cloned, BUY);
	init(cloned, SELL);
	return cloned;

	function init(exchange, orderType) {
		if (!exchange[orderType]) {
			exchange[orderType] = {};
			exchange[orderType].volumes = {};
			var options = {};
			if (BUY == orderType) 
				options.max = true;
			exchange[orderType].prices = createBinaryHeap(options);
		}
	}
} module.exports = {
	BUY: BUY,
	SELL: SELL,
	buy: function(price, volume, exchangeData) {
		return order(BUY, price, volume, exchangeData);
	},
	sell: function(price, volume, exchangeData) {
		return order(SELL, price, volume, exchangeData);
	},
	order: order 
}

function order(orderType, price, volume, exchangeData) {
	var cloned = createExchange(exchangeData);
	var orderBook = cloned[orderType];
	var oldVolume = orderBook.volumes[price];

	function getOpposite() {
		return (BUY == orderType) ? SELL : BUY;
	}

	function isTrade() {
		var opp = cloned[getOpposite()].prices.peek();
		return (BUY == orderType) ? price >= opp : price <= opp;
	}

	var trade = isTrade();
	var remainingVolume = volume;
	var storePrice = true;

	if (trade) {
		var oppBook = cloned[BUY];

		if(orderType == BUY)
			oppBook = cloned[SELL];
	}