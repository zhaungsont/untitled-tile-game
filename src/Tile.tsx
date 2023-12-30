import React from 'react';
import { useDrop } from 'react-dnd';
import './Tile.scss';
import Entity from './Entity';

interface TileProps {
	index: number;
	onDrop: (index: number, item: any) => void;
	entityIndex: number;
}

function Tile(props: TileProps) {
	const { index, onDrop, entityIndex } = props;
	const [{ isOver }, drop] = useDrop(() => ({
		accept: 'ENTITY',
		hover: () => {
			console.log('hover');
		},
		drop: (item: { emoji: string }) => onDrop(index, item),
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
		}),
	}));
	return (
		<div className="tile" ref={drop}>
			{isOver && <div className="tile-hover-overlay" />}
			{index}
			{entityIndex === index && <Entity />}
		</div>
	);
}

export default Tile;
