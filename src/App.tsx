// import { useState } from 'react';
import { useEffect, useState } from 'react';
import Board from './Board';

// import TileType from './enums/tileType';

class EntityClass {
	tileIndices: number[];
	entityId: number;
	static entityCount: number = 0;

	constructor() {
		const newEntityID = EntityClass.entityCount++;
		this.tileIndices = [];
		this.entityId = newEntityID;
	}
}

function App() {
	const [entityList, setEntityList] = useState([] as EntityClass[]);

	function genNewEntity() {
		const newEntity = new EntityClass();
		setEntityList((prevList) => [...prevList, newEntity]);
	}

	useEffect(() => {
		console.log(entityList);
	}, [entityList.length]);
	return (
		<>
			<div>
				<div>
					<button onClick={genNewEntity}>Get new entity</button>
					<div></div>
				</div>
				<Board />
			</div>
		</>
	);
}

export default App;
