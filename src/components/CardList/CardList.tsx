import React, { useContext, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card } from '../Card/Card';
import { AppContext } from '../../AppContext';
import { CardModel } from '../../Interfaces';

import styles from './CardList.module.css';
import { List, Panel } from '../../pages';

export interface CardListProps {
    id: List;
    scheduleId?: number;
    parent: Panel;
    cards: CardModel[];
}

const CardList: React.FC<CardListProps> = ({ id, scheduleId, parent,  cards = [] }) => {
  const appContext = useContext(AppContext);
  const listRef = useRef<any>();

  const addCardHandler = () => {
    appContext.updatePanel(parent, { cards: cards.concat({ orderPlace: cards.length, schedule_id: scheduleId }) });
    listRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' });
  };

  // Function to update list on drop
  const handleDrop = ( droppedItem ) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    const updatedList = [...cards];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State
    appContext.updatePanel(parent, { cards: updatedList });
  };

  return(
    <div id={id} className={styles.cardList}>
      <DragDropContext onDragEnd={handleDrop}>
        <Droppable droppableId="list-container" direction="horizontal">
          {(provided) => (
            <div
              className="list-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {cards.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      className={`${styles.cardItem} item-container`}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      <Card
                        parent={parent}
                        cardId={item.id}
                        cardName={item.name}
                        startTime={item.startTime}
                        endTime={item.endTime}
                        done={item.done}
                        imgUrl={item.imgUrl}
                        scheduleId={item.schedule_id}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className={`${styles.cardItem} ${styles.newCardButton}`} onClick={addCardHandler}>+</div>
    </div>
  );
};

export { CardList };
