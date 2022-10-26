import React, { useContext, useRef } from 'react';
// @ts-ignore
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card } from '../Card/Card';
import { AppContext } from '../../AppContext';
import { CardModel } from '../../Interfaces';

import styles from './CardList.module.css';
import { List, Panel, PANEL_DAY, PANEL_LESSON } from '../../pages';
import { apiRequest } from '../../services/request';

export interface CardListProps {
    id: List;
    scheduleId?: number;
    parent: Panel;
    cards: CardModel[];
}

const CardList: React.FC<CardListProps> = ({ id, scheduleId, parent,  cards = [] }) => {
  const appContext = useContext(AppContext);
  const listRef = useRef<any>();

  let endpointPrefix = '';
  if (parent === PANEL_DAY) {
    endpointPrefix = 'day';
  } else if (parent === PANEL_LESSON) {
    endpointPrefix = 'lesson';
  }

  const addCardHandler = () => {
    appContext.updatePanel(parent, { cards: cards.concat({ orderPlace: cards.length, schedule_id: scheduleId }) });
    listRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' });
  };

  // Function to update list on drop
  // @ts-ignore
  const handleDrop = ( droppedItem: any ) => {
    (async (droppedItem: any) => {
    // Ignore drop outside droppable container
      if (!droppedItem.destination) return;
      let updatedList = [...cards];
      // Remove dragged item
      const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
      // Add dropped item
      updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
      // поменять параметр orderPlace в списке
      updatedList = updatedList.map((card, index) => {
        card.orderPlace = index + 1;
        return card;
      });
      // Update State
      appContext.updatePanel(parent, { cards: updatedList });

      // отправить запрос на изменение порядка
      const jsonData = {
        cards: updatedList.filter((card) => card.id && !card.id.startsWith('empty-')).map((card) => {
          return {
            id: parseInt(String(card.id)),  // TODO убрать, когда переделаем айдишники на uuid
            schedule_id: card.schedule_id,
            orderPlace: card.orderPlace,
          };
        })
      };
      const stringJson = JSON.stringify(jsonData);
      await apiRequest.post(`schedules/${endpointPrefix}/${scheduleId}/cards/order`, stringJson);
    })(droppedItem);
  };

  return(
    <div id={id} className={styles.cardList}>
      <DragDropContext onDragEnd={handleDrop}>
        <Droppable droppableId="list-container" direction="horizontal">
          {/* @ts-ignore */}
          {(provided) => (
            <div
              className="list-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {cards.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {/* @ts-ignore */}
                  {(provided) => (
                    <div
                      className={`${styles.cardItem} item-container`}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      <Card
                        parent={parent}
                        index={index}
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
