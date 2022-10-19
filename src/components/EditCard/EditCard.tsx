import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiRequest } from '../../services/request';
import { ContentType } from '../../services/requestUtils';
import { AppContext } from '../../AppContext';
import { PANEL_DAY, PANEL_LESSON } from '../../pages';
import { CardModel } from '../../Interfaces';

import styles from './EditCard.module.css';

export interface EditCardProps {
  id: string;
}

const EditCard: React.FC<EditCardProps> = ({ id }) => {
  const appContext = useContext(AppContext);
  const { scheduleId, cardId } = useParams();
  const navigate = useNavigate();

  const [warning, setWarning] = useState<string>('');
  const [loadedImg, setLoadedImg] = useState<string>('');

  let endpointPrefix = '';
  if (id === PANEL_DAY) {
    endpointPrefix = 'day';
  } else if (id === PANEL_LESSON) {
    endpointPrefix = 'lesson';
  }

  let currentName = '';
  let currentImgUrl = '';
  if (cardId) {
    const { cards } = appContext.getPanelData(id);
    const currentCard = cards.find((card: CardModel) => String(card.id) === cardId);
    currentName = currentCard.name;
    currentImgUrl = currentCard.imgUrl;
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
        const { cards } = appContext.getPanelData(id);
        const currentCard = cards.find((card: CardModel) => String(card.id) === cardId);
        currentCard.name = currentName;
        currentCard.imgUrl = loadedImg;
        await apiRequest.post(`schedules/${endpointPrefix}/${scheduleId}/cards/${cardId}`, formdata, ContentType.FORM);
      } else {
        const newCard = await apiRequest.post(`schedules/${endpointPrefix}/${scheduleId}/cards`, formdata, ContentType.FORM);
        const { cards } = appContext.getPanelData(id);
        appContext.updatePanel(id, { cards: [...cards, newCard] });
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
    const { cards } = appContext.getPanelData(id);
    cards.splice(cards.findIndex((card: CardModel) => String(card.id) === cardId), 1);
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
      <div className={styles.editCardContent}>
        <img alt="Закрыть окно" className={styles.editCardClose} onClick={closeWindowHandler} src="https://lostpointer.tech/images/delete.svg"/>
        {cardId && !deleteConfirmation && <img alt="Удалить карточку" onClick={setDeleteConfirmation} className={styles.editCardDelete} src="https://lostpointer.tech/images/trash.svg"/>}
        {cardId && deleteConfirmation && <img alt="Удалить карточку" onClick={deleteCard} className={styles.editCardDelete} src="https://lostpointer.tech/images/trash.svg"/>}
        <div className={styles.editCardContentFlex}>
          <form className={styles.editCardForm} action='#' noValidate>
            <div>
              <div className={styles.editCardImageBlock}>
                {!loadedImg && currentImgUrl && <img alt='Изображение' className={styles.editCardImageImg} src={currentImgUrl}/>}
                {loadedImg && <img alt='Изображение' className={styles.editCardImageImg} src={loadedImg}/>}
              </div>
              <input onChange={uploadFileHandler}
                type='file'
                name='file'
                id='file'
                accept='image/png, image/jpg, image/webp'
                className={styles.editCardImageInput}
              />
              <label htmlFor='file' className={styles.editCardImageInputBtn}>Upload file</label>
            </div>
            <div>
              <div className={styles.editCardFormTitle}>
                {cardId && <>Изменить карточку</>}
                {!cardId && <>Новая карточка</>}
              </div>
              <input onChange={uploadNameHandler}
                className={styles.editCardNameInput}
                type="text"
                name="name"
                placeholder="Имя карточки"
                value={newName}
              />
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
      </div>
    </div>
  );
};

export { EditCard };
