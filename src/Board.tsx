import React, { useState } from 'react';
import Square from './Square';
import TileType from './enums/tileType';

function Board({ tileType }: { tileType: TileType }) {
	// const [emojiPosition, setEmojiPosition] = useState<number | null>(null);
	const [emoji, setEmoji] = useState({ position: 0, item: '' });
	const [hoverIndex, setHoverIndex] = useState(-1);
	const handleDrop = (index: number, item: { emoji: string }) => {
		// setEmojiPosition(index);
		setEmoji({ position: index, item: item.emoji });
		setHoverIndex(-1);
	};

	function hoverHandler(index: number) {
		if (hoverIndex !== index) {
			setHoverIndex(index);
		}
	}

	console.log('board refresh');

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
				const isTileActive = (
					index: number,
					emojiPos: number,
					type: TileType
				) => {
					// Check if the current tile is active
					if (index === emojiPos) return true;
					switch (type) {
						case '1x2': {
							// Check for horizontal neighbors
							// Exclude edge cases where tiles wrap to the next row
							if (
								index === emojiPos - 1 &&
								index % 3 !== 0 &&
								emojiPos % 3 !== 0
							)
								return true;
							if (index === emojiPos + 1 && index % 3 !== 0) return true;

							return false;
						}

						case '1x3': {
							return Math.floor(index / 3) === Math.floor(emojiPos / 3);
						}

						case '2x2': {
							// Tiles in the same row
							const sameRow =
								Math.floor(index / 3) === Math.floor(emojiPos / 3);

							const adjacentRow =
								emojiPos + 3 < 9
									? Math.floor(index / 3) === Math.floor((emojiPos + 3) / 3)
									: Math.floor(index / 3) === Math.floor((emojiPos - 3) / 3);

							const adjacentColumn =
								index % 3 === 0 && emojiPos % 3 !== 0
									? false
									: index % 3 === 2 && emojiPos % 3 === 0
									? false
									: true;
							// Math.abs(index - emojiPos) !== 2;
							// Tiles in the 2x2 zone

							return (
								(sameRow && adjacentColumn) || (adjacentRow && adjacentColumn)
							);
						}

						default:
							return false;
					}
				};
				let tileStyle;
				if (hoverIndex === -1) {
					console.log('not hovering');

					tileStyle = isTileActive(i, emoji.position, tileType)
						? 'active'
						: 'none';
				} else {
					console.log('hovering!');
					tileStyle = isTileActive(i, hoverIndex, tileType)
						? 'hovering'
						: 'none';

					if (tileStyle === 'none') {
						tileStyle = isTileActive(i, emoji.position, tileType)
							? 'hovering'
							: 'none';
					}
				}
				return (
					<Square
						key={i}
						index={i}
						onDrop={handleDrop}
						emojiPos={emoji.position}
						type={tileType}
						onHover={hoverHandler}
						tileStyle={tileStyle}
					></Square>
				);
			})}
		</div>
	);
}

export default Board;
