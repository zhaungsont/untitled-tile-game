import React, { useState } from 'react';
import Tile from './Tile';
function Board() {
	// const [emojiPosition, setEmojiPosition] = useState<number | null>(null);
	const [entityIndex, setEntityIndex] = useState(0);
	console.log('board refresh');

	function handleEntityDrop(index: number, item: any) {
		console.log('handle drop', index, item);
		setEntityIndex(index);
	}

	return (
		<div
			style={{
				width: '500px',
				height: '500px',
				display: 'flex',
				flexWrap: 'wrap',
			}}
		>
			{Array.from({ length: 9 }).map((_, i) => {
				return (
					<Tile
						key={i}
						index={i}
						onDrop={handleEntityDrop}
						entityIndex={entityIndex}
					/>
				);
			})}
		</div>
	);
}

export default Board;
