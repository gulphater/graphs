const airports = 'PHX BKK OKC JFK LAX MEX EZE HEL LOS LAP LIM'.split(' ')

const routes = [
	['PHX', 'LAX'],
	['PHX', 'JFK'],
	['JFK', 'OKC'],
	['JFK', 'HEL'],
	['JFK', 'LOS'],
	['MEX', 'LAX'],
	['MEX', 'BKK'], 
	['MEX', 'LIM'],
	['MEX', 'EZE'],
	['LIM', 'BKK']
];

// STEP I: Create an adjacency list 
// 	[key]: [value] 
// 	airport -> nodes (connections with other airports)
//

let adjacencyList = new Map(); 

// basically, we are assigning an empty array to each airport
// so that in future, we can push adjacent nodes(airports) to it
function addNode(airport) { 
	adjacencyList.set(airport, [])
}

// We use get, not set, since set overwrites existing key
// Instead, we will add new items to it
function addEdge(origin, destination) { 
	adjacencyList.get(origin).push(destination);
	adjacencyList.get(destination).push(origin);
}

airports.forEach(airport => addNode(airport));
// "..." operator helps us get route to the form 
// "ORG DEST", then we just assign adjacencies
routes.forEach(route => addEdge(...route));
console.log(adjacencyList);

/**
* In BFS, we choose the node we want to start from
	* @param start -> start node
*/

function bfs(start,target) { 
	const visited = new Set();
	// In JS, queue is the array, 
	// Where first in = first out
	const queue = [start]
	
	while(queue.length > 0) {
		let airport = queue.shift();
		let destinations = adjacencyList.get(airport);
		// console.log(destinations);
		for(let destination of destinations) { 
			
			if(destination == target) {
				console.log("FOUND IT!");
			}
			
			if(!visited.has(destination)) { 
				visited.add(destination);
				queue.push(destination);
				console.log(destination);
			}
		}
	}
}


function dfs(start, target) { 
	let visited = new Set();
	visited.add(start);
	const destinations = adjacencyList.get(start);

	for(let destination of destinations) { 
		if(destination === target) { 
			console.log("FOUND IT!");
			return; 
		}

		if(!visited.has(destination)) { 
			dfs(destination, visited);
		}
	}

}
dfs("PHX", "BKK")
/**
 * What is the Time Complexity of each algorithm in Big-O Notation?
 * For @function bfs - it is O(V+E) (verticies + edges) - linear scale
 * For @function dfs - it is O(V) (verticies) - linear scale
 */




// bfs("PHX", "BKK")