// implementation of binary heap 
// reference: http://en.wikipedia.org/wiki/Binary_heap
// 根节点在数组中的位置是1，第n个位置的子节点分别在2n和 2n+1
function BinaryHeap(scoreFunction) {
	this.content = [];
	this.scoreFunction = scoreFunction;
}

BinaryHeap.prototype = {
	push: function(element) {
		// add new element to the end of the array
		// a little modification: let user pass a flag indicating maximun or minimun heap
		// this.content.push(element);
		if (this.options.max) {
			this.content.push(-element);
		} else {
			this.content.push(element);
		}
		// allow it to bubble up
		this.bubbleUp(this.content.length - 1);
	},

	pop: function() {
		// store the first element so we can return it 
		var result = this.content[0];
		// get the end element
		var end = this.content.pop();
		// if still have elements then put the end element at the start and let it sink down
		if (this.content.length > 0) {
			this.content[0] = end;
			this.sinkDown(0);
		}
		return result;
	},

	remove: function(node) {
		var length = this.content.length;
		// find the element to remove
		for (var i = 0; i < length; i++) {
			if (this.content[i] != node)
				continue;
			// when find it, fill up the hole
			var end = this.content.pop();
			// if the element popped is the element need to remove, we've dont
			if (i === length-1)
				break;
			// otherwise, replace the removed element with the popped one, and let it to float up or sink down 
			this.content[i] = end;
			this.bubbleUp(i);
			this.sinkDown(i);
			break;
		}
	},

	size: function() {
		return this.content.length;
	},

	bubbleUp: function(n) {
		// fetch the element that has to be moved
		var element = this.content[n], score = this.scoreFunction(element);
		// an element can not go up at 0
		while (n > 0) {
			// compute the parent element's index and fetch it
			var parentN = Math.floor((n+1) / 2) - 1;
			parent = this.content[parentN];
			// if parent has less score then we've done
			if (score >= this.scoreFunction(parent))
				break;

			// otherwise swap the parent with the current element
			this.content[parentN] = element;
			this.content[n] = parent;
			n = parentN;
		}
	},

	sinkDown: function(n) {
		// look up the target element and its score
		var length = this.content.length,
		element = this.content[n],
		elemScore = this.scoreFunction(element);

		while(true) {
			// compute the indices of the children
			var child2N = (n+1) * 2, child1N = child2N - 1;
			// this is used to store the new position of the element
			var swap = null;
			// if first child exists
			if (child1N < length) {
				// compute its score
				var child1 = this.content[child1N],
				child1Score = this.scoreFunction(child1);
				// if the score is less that our element's then we need to swap
				if (child1Score < elemScore)
					swap = child1N;
			}
			// do same checks for other child
			if (child2N < length) {
				var child2 = this.content[child2N],
				child2Score = this.scoreFunction(child2);
				if (child2Score < (swap == null ? elemScore : child1Score))
					swap = child2N;
			}

			// done
			if (swap == null)
				break;

			// otherwise continue
			this.content[n] = this.content[swap];
			this.content[swap] = element;
			n = swap;
		}
	},

	// new function added 
	peek: function() {
		if (this.options.max)
			return -this.content[0];
		else
			return this.content[0];
	}
};


// test drive
var heap = new BinaryHeap(function(x) { return x; });
forEach([10, 3, 4, 8, 2, 9, 7, 1, 2, 6, 5],
	method(heap, "push"));

heap.remove(2);
while(heap.size() > 0)
	console.log(heap.pop());
