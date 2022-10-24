import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiRequest } from '../../services/request';
import { ContentType, defaultBackendRootURL } from '../../services/requestUtils';
import { AppContext } from '../../AppContext';
import { Panel, PANEL_DAY, PANEL_LESSON } from '../../pages';
import { CardModel } from '../../Interfaces';

import styles from './EditCard.module.css';

export interface EditCardProps {
  parent: Panel;
}

const EditCard: React.FC<EditCardProps> = ({ parent }) => {
  const appContext = useContext(AppContext);
  const { scheduleId, cardId } = useParams();
  const navigate = useNavigate();

  const [warning, setWarning] = useState<string>('');
  const [loadedImg, setLoadedImg] = useState<string>('');

  let endpointPrefix = '';
  if (parent === PANEL_DAY) {
    endpointPrefix = 'day';
  } else if (parent === PANEL_LESSON) {
    endpointPrefix = 'lesson';
  }

  let currentName = '';
  let currentImgUrl = '';
  if (cardId) {
    const { cards } = appContext.getPanelData(parent);
    const currentCard = cards.find((card: CardModel) => String(card.id) === cardId);
    if (currentCard) {
      currentName = currentCard.name;
      currentImgUrl = currentCard.imgUrl;
    }
  }

  const [newName, setName] = useState<string|undefined>(currentName);
  const [newFile, setFile] = useState<File|null>(null);
  const [deleteConfirmation, setDeleteConfirmationState] = useState<boolean>(false);

  const submitEditFormHandler = async (event: any) => {
    event.preventDefault();
    if (!newFile && newName == currentName) {
      setWarning('Нужно новое фото или имя!');
    } else if (!newFile && newName || newFile) {
      setWarning('');
      const formdata = new FormData();
      if (newFile) {
        formdata.append('image', newFile);
      }
      if (newName) {
        formdata.append('card', JSON.stringify({ 'name': newName }));
      }
      if (cardId) {
        const { cards } = appContext.getPanelData(parent);
        const currentCard = cards.find((card: CardModel) => String(card.id) === cardId);
        if (currentCard) {
          if (newFile) {
            currentCard.imgUrl = loadedImg;
          }
          if (newName) {
            currentCard.name = newName;
          }
        }
        await apiRequest.post(`schedules/${endpointPrefix}/${scheduleId}/cards/${cardId}`, formdata, ContentType.FORM);
      } else {
        const newCard = await apiRequest.post(`schedules/${endpointPrefix}/${scheduleId}/cards`, formdata, ContentType.FORM);
        const { cards } = appContext.getPanelData(parent);
        const index = cards.findIndex((card: CardModel) => !card.id);
        cards[index] = newCard;
        appContext.updatePanel(parent, { cards: cards });
      }
      navigate(-1);
    }
  };

  const closeWindowHandler = () => {
    navigate(-1);
  };

  const uploadNameHandler = (event: any) => {
    setName(event.target.value);
  };

  const setDeleteConfirmation = () => {
    setWarning('Нажмите еще раз для удаления!');
    setDeleteConfirmationState(true);
  };

  const resetDeleteConfirmation = (event: any) => {
    if (event.target.className !== styles.editCardDelete) {
      setWarning('');
      setDeleteConfirmationState(false);
    }
  };

  const deleteCard = async () => {
    await apiRequest.post(`schedules/${endpointPrefix}/${scheduleId}/cards/${cardId}/goodbye`);
    const { cards } = appContext.getPanelData(parent);
    // не уменьшаем количество карточкек на главном экране меньше 3-х
    if (cards.length <= 3) {
      const index = cards.findIndex((card: CardModel) => String(card.id) === cardId);
      cards[index] = { orderPlace: index, schedule_id: parseInt(String(scheduleId)) };
    } else {
      cards.splice(cards.findIndex((card: CardModel) => String(card.id) === cardId), 1);
    }
    appContext.updatePanel(parent, { cards: cards });
    navigate(-1);
  };

  const uploadFileHandler = async (event: any) => {
    event.preventDefault();

    const file = event.target.files[0];
    setFile(file);

    const formdata = new FormData();
    formdata.append('image', file);

    const ext = file.name
      .substring(file.name.lastIndexOf('.') + 1)
      .toLowerCase();

    if (['gif', 'png', 'jpeg', 'jpg', 'webp'].includes(ext)) {
      const reader = new FileReader();
      reader.addEventListener('load', (e) => {
        e.preventDefault();
        if (typeof e?.target?.result === 'string') {
          setLoadedImg(e.target.result);
        }
      });
      reader.readAsDataURL(file);
    }
  };

  return(
    <div className={styles.editCard} onClick={resetDeleteConfirmation}>
      <form className={styles.editCardForm} action='#' noValidate>
        <div className={styles.editCardContent}>
          <div className={styles.editCardIcons}>
            <img alt="Закрыть окно" className={styles.editCardClose} onClick={closeWindowHandler} src={`${defaultBackendRootURL}/images/delete.svg`}/>
            {cardId && !deleteConfirmation && <img alt="Удалить карточку" onClick={setDeleteConfirmation} className={styles.editCardDelete} src={`${defaultBackendRootURL}/images/trash.svg`}/>}
            {cardId && deleteConfirmation && <img alt="Удалить карточку" onClick={deleteCard} className={styles.editCardDelete} src={`${defaultBackendRootURL}/images/trash.svg`}/>}
          </div>
          <div className={styles.editCardFormTitle}>
            {cardId && <>Изменить карточку</>}
            {!cardId && <>Новая карточка</>}
          </div>
          <ul className={styles.editCardLine}>
            <li>
              <div className={styles.editCardLineItem}>
                <div className={styles.editCardLineItemInner}>
                  {!loadedImg && currentImgUrl && <img alt='Изображение' className={styles.editCardLineItemImg} src={currentImgUrl}/>}
                  {loadedImg && <img alt='Изображение' className={styles.editCardLineItemImg} src={loadedImg}/>}
                </div>
                <div className={styles.editCardLineItemIconName}>Текущее изображение</div>
              </div>
            </li>
            <li>
              <div className={styles.editCardLineItem}>
                <input onChange={uploadFileHandler}
                  type='file'
                  name='file'
                  id='file'
                  accept='image/png, image/jpg, image/webp'
                  className={styles.editCardImageInput}
                />
                <label htmlFor='file'>
                  <div className={styles.editCardLineItemInner}>
                    <img alt='Загрузить с устройства' className={styles.editCardLineItemIcon} src={`${defaultBackendRootURL}/images/photo.svg`}/>
                  </div>
                  <div className={styles.editCardLineItemIconName}>Загрузить с устройства</div>
                </label>
              </div>
            </li>
            <li>
              <div className={styles.editCardLineItem}>
                <div className={styles.editCardLineItemInner}>
                  <img alt='Выбрать из стоковых' className={styles.editCardLineItemIcon} src={`${defaultBackendRootURL}/images/gallery.svg`}/>
                </div>
                <div className={styles.editCardLineItemIconName}>Выбрать из стоковых</div>
              </div>
            </li>
          </ul>
          <div className={styles.editCardInputsBlock}>
            <input onChange={uploadNameHandler}
              className={styles.editCardInput}
              type="text"
              name="name"
              placeholder="Имя карточки"
              value={newName}
            />
            { parent === PANEL_DAY && <>
              <label className={styles.editCardLabel} htmlFor="startTime">Начало:</label>
              <input
                className={styles.editCardInput}
                type="time"
                name="startTime"
                id="startTime"
                placeholder="Время начала"
                value=""
              />
              <label className={styles.editCardLabel} htmlFor="startTime">Конец:</label>
              <input
                className={styles.editCardInput}
                type="time"
                name="endTime"
                id="endTime"
                placeholder="Время окончания"
                value=""
              />
            </>}
          </div>

          <div className={styles.editCardFormButtons}>
            <input onClick={submitEditFormHandler}
              className={styles.editCardFormSubmit}
              type='submit'
              value="Сохранить"
            />
          </div>
          <div className={styles.editCardFormMsg}>{warning}</div>
        </div>
      </form>
    </div>
  );
};

export { EditCard };
