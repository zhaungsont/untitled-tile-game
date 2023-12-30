import React from 'react';
import { useDrag } from 'react-dnd';
import './Entity.scss';
function Entity() {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'ENTITY',
		item: 'DEFAULT',
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));
	return (
		<div className="entity" ref={drag}>
			Entity
		</div>
	);
}

export default Entity;
