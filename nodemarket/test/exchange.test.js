'use strict';

var assert = require('assert'),
	should = require('should');

var exchangeData = {};

suite('exchange', function() {
	// buy case
	test('buy should add a BUY nockmarket order', function(done) {
		// submit an order: 40 dollars for 100 units
		exchangeData = exchange.buy(40, 100, exchangeData);
		// check if we have corresponding items in the buy side
		exchangeData.buys.volumes[40].should.eql(100);
		done();
	});

	// sell case
	test('sell should add a SELL nockmarket order', function(done) {
		exchangeData = exchange.sell(41, 200, exchangeData);
		exchangeData.sells.volumes['41'].should.eql(200);
		done();
	});

	// trade case
	test('sell should produce trades', function(done) {
		exchangeData = exchange.sell(40, 75, exchangeData);
		// a trade at price of 40 and quantity of 75
		exchangeData.trades[0].price.should.eql(40);
		exchangeData.trades[0].volume.should.eql(75);
		// after trade, on the buy side we still have 25 units at 40$
		exchangeData.buys.volumes[40].should.eql(25);
		// after trade, on the sell side we still have 200 units at 41$
		exchangeData.sells.volumes[41].should.eql(200);
		done();
	});
});

