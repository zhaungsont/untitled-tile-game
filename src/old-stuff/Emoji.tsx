import React from 'react';
import { useDrag } from 'react-dnd';

const Emoji = ({ emoji }: { emoji: string }) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'emoji',
		item: { emoji },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));

	return (
		<div
			ref={drag}
			style={{
				opacity: isDragging ? 0.5 : 1,
				fontSize: '24px',
				cursor: 'move',
			}}
		>
			{emoji}
		</div>
	);
};

export default Emoji;
