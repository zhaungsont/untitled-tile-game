import { useState } from 'react';
import Board from './Board';

import TileType from './enums/tileType';

function App() {
	const [tileType, setTileType] = useState('1x1' as TileType);
	return (
		<>
			<div>
				<div>
					<button onClick={() => setTileType('1x1')}>1x1</button>
					<button onClick={() => setTileType('1x2')}>1x2</button>
					<button onClick={() => setTileType('1x3')}>1x3</button>
					<button onClick={() => setTileType('2x2')}>2x2</button>
				</div>
				<Board tileType={tileType} />
			</div>
		</>
	);
}

export default App;
