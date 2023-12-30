import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import Emoji from './Emoji';
import './Square.scss';
import TileType from '../enums/tileType';

interface SquareProps {
	index: number;
	onDrop: (index: number, item: { emoji: string }) => void;
	emojiPos: number;
	type: TileType;
	onHover: (index: number) => void;
	tileStyle: string;
}

console.log('square refresh');

function Square({
	index,
	onDrop,
	emojiPos,
	type,
	onHover,
	tileStyle,
}: SquareProps) {
	const [isActive, setIsActive] = useState(false);
	const [{ isOver }, drop] = useDrop(() => ({
		accept: 'emoji',
		hover: () => {
			onHover(index);
		},
		drop: (item: { emoji: string }) => onDrop(index, item),
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
		}),
	}));

	const hasEmoji = index === emojiPos;

	const isTileActive = (index: number, emojiPos: number, type: TileType) => {
		// Check if the current tile is active
		if (index === emojiPos) return true;
		switch (type) {
			case '1x2': {
				// Check for horizontal neighbors
				// Exclude edge cases where tiles wrap to the next row
				if (index === emojiPos - 1 && index % 3 !== 0 && emojiPos % 3 !== 0)
					return true;
				if (index === emojiPos + 1 && index % 3 !== 0) return true;

				return false;
			}

			case '1x3': {
				return Math.floor(index / 3) === Math.floor(emojiPos / 3);
			}

			case '2x2': {
				// Tiles in the same row
				const sameRow = Math.floor(index / 3) === Math.floor(emojiPos / 3);

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

				return (sameRow && adjacentColumn) || (adjacentRow && adjacentColumn);
			}

			default:
				return false;
		}
	};

	useEffect(() => {
		// setIsActive(isTileActive(index, emojiPos, type));
	}, [index, emojiPos, type]);

	return (
		<div ref={drop} className={`square ${tileStyle}`}>
			{isOver && (
				<div
					style={{
						position: 'absolute',
						top: 0,
						right: 0,
						bottom: 0,
						left: 0,
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
					}}
				/>
			)}
			{index}
			{hasEmoji && <Emoji emoji="😭" />}
		</div>
	);
}

export default Square;
