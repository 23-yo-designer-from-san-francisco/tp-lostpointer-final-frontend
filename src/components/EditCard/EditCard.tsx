import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiRequest } from '../../services/request';
import { ContentType, defaultBackendRootURL } from '../../services/requestUtils';
import { AppContext } from '../../AppContext';
import { NEW_CARD_ORDER, Panel, PANEL_DAY, PANEL_LESSON } from '../../pages';
import { CardModel } from '../../Interfaces';
import { makeid } from '../../utils';

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
  let currentStartTime = '';
  let currentEndTime = '';
  if (cardId) {
    const { cards } = appContext.getPanelData(parent);
    const currentCard = cards.find((card: CardModel) => String(card.id) === cardId);
    if (currentCard) {
      currentName = currentCard.name;
      currentImgUrl = currentCard.imgUrl;
      currentStartTime = currentCard.startTime;
      currentEndTime = currentCard.endTime;
    }
  }

  const [newName, setName] = useState<string|undefined>(currentName);
  const [newStartTime, setStartTime] = useState<string|undefined>(currentStartTime);
  const [newEndTime, setEndTime] = useState<string|undefined>(currentEndTime);
  const [newFile, setFile] = useState<File|null>(null);
  const [deleteConfirmation, setDeleteConfirmationState] = useState<boolean>(false);

  const submitEditFormHandler = async (event: any) => {
    event.preventDefault();
    if (!newFile && newName === currentName && newStartTime === currentStartTime && newEndTime === currentEndTime) {
      setWarning('?????????? ???????????? ?????????? ????????????????!');
    } else {
      setWarning('');
      // ???????????? ???? ?????????????????? ???????????????????????? ????????????????
      const newCardOrder = appContext.getPanelData(NEW_CARD_ORDER);
      const formdata = new FormData();
      // ?????????????????? ???????????? ?????? ???????? ??????????????
      const newCardJson: CardModel = {};
      if (newFile) {
        formdata.append('image', newFile);
      }
      if (newName !== currentName) {
        newCardJson.name = newName;
      }
      if (newStartTime !== currentStartTime) {
        newCardJson.startTime = newStartTime;
        if (newEndTime !== currentEndTime) {
          newCardJson.endTime = newEndTime;
        }
      }
      // ???????????????? ???????????? ?? formdata
      if (newCardJson) {
        if (newCardOrder) {
          newCardJson.orderPlace = newCardOrder;
          appContext.updatePanel(NEW_CARD_ORDER, null);
        }
        formdata.append('card', JSON.stringify(newCardJson));
      }
      // ???????? ?????????????????????? ????????????????
      if (cardId) {
        const { cards } = appContext.getPanelData(parent);
        const currentCard = cards.find((card: CardModel) => String(card.id) === cardId);
        if (currentCard) {
          if (newFile) {
            currentCard.imgUrl = loadedImg;
          }
          if (newName !== currentName) {
            currentCard.name = newName;
          }
          if (newStartTime !== currentStartTime) {
            currentCard.startTime = newStartTime;
          }
          if (newStartTime && newEndTime !== currentEndTime) {
            currentCard.endTime = newEndTime;
          }
        }
        await apiRequest.post(`schedules/${endpointPrefix}/${scheduleId}/cards/${cardId}`, formdata, ContentType.FORM);
      // ???????? ?????????????? ?????????? ????????????????
      } else {
        const newCard = await apiRequest.post(`schedules/${endpointPrefix}/${scheduleId}/cards`, formdata, ContentType.FORM);
        const { cards } = appContext.getPanelData(parent);
        let index = 0;
        if (newCardOrder) {
          index = cards.findIndex((card: CardModel) => card.orderPlace === newCardOrder);
        }
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

  const uploadStartTimeHandler = (event: any) => {
    setStartTime(event.target.value);
  };

  const uploadEndTimeHandler = (event: any) => {
    setEndTime(event.target.value);
  };

  const setDeleteConfirmation = () => {
    setWarning('?????????????? ?????? ?????? ?????? ????????????????!');
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
    // ???? ?????????????????? ???????????????????? ?????????????????? ???? ?????????????? ???????????? ???????????? 3-??
    if (cards.length <= 3) {
      const index = cards.findIndex((card: CardModel) => String(card.id) === cardId);
      cards[index] = { id: `empty-${makeid(5)}`, orderPlace: index, schedule_id: parseInt(String(scheduleId)) };
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
            <img alt="?????????????? ????????" className={styles.editCardClose} onClick={closeWindowHandler} src={`${defaultBackendRootURL}/images/delete.svg`}/>
            {cardId && !deleteConfirmation && <img alt="?????????????? ????????????????" onClick={setDeleteConfirmation} className={styles.editCardDelete} src={`${defaultBackendRootURL}/images/trash.svg`}/>}
            {cardId && deleteConfirmation && <img alt="?????????????? ????????????????" onClick={deleteCard} className={styles.editCardDelete} src={`${defaultBackendRootURL}/images/trash.svg`}/>}
          </div>
          <div className={styles.editCardFormTitle}>
            {cardId && <>???????????????? ????????????????</>}
            {!cardId && <>?????????? ????????????????</>}
          </div>
          <ul className={styles.editCardLine}>
            <li>
              <div className={styles.editCardLineItem}>
                <div className={styles.editCardLineItemInner}>
                  {!loadedImg && currentImgUrl && <img alt='??????????????????????' className={styles.editCardLineItemImg} src={currentImgUrl}/>}
                  {loadedImg && <img alt='??????????????????????' className={styles.editCardLineItemImg} src={loadedImg}/>}
                </div>
                <div className={styles.editCardLineItemIconName}>?????????????? ??????????????????????</div>
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
                    <img alt='?????????????????? ?? ????????????????????' className={styles.editCardLineItemIcon} src={`${defaultBackendRootURL}/images/photo.svg`}/>
                  </div>
                  <div className={styles.editCardLineItemIconName}>?????????????????? ?? ????????????????????</div>
                </label>
              </div>
            </li>
            <li>
              <div className={styles.editCardLineItem}>
                <div className={styles.editCardLineItemInner}>
                  <img alt='?????????????? ???? ????????????????' className={styles.editCardLineItemIcon} src={`${defaultBackendRootURL}/images/gallery.svg`}/>
                </div>
                <div className={styles.editCardLineItemIconName}>?????????????? ???? ????????????????</div>
              </div>
            </li>
          </ul>
          <div className={styles.editCardInputsBlock}>
            <input onChange={uploadNameHandler}
              className={styles.editCardInput}
              type="text"
              name="name"
              placeholder="?????? ????????????????"
              value={newName}
            />
            { parent === PANEL_DAY && <>
              <label className={styles.editCardLabel} htmlFor="startTime">????????????:</label>
              <input onChange={uploadStartTimeHandler}
                className={styles.editCardInput}
                type="time"
                name="startTime"
                id="startTime"
                placeholder="?????????? ????????????"
                value={newStartTime}
              />
              <label className={styles.editCardLabel} htmlFor="startTime">??????????:</label>
              <input onChange={uploadEndTimeHandler}
                className={styles.editCardInput}
                type="time"
                name="endTime"
                id="endTime"
                placeholder="?????????? ??????????????????"
                value={newEndTime}
              />
            </>}
          </div>

          <div className={styles.editCardFormButtons}>
            <input onClick={submitEditFormHandler}
              className={styles.editCardFormSubmit}
              type='submit'
              value="??????????????????"
            />
          </div>
          <div className={styles.editCardFormMsg}>{warning}</div>
        </div>
      </form>
    </div>
  );
};

export { EditCard };
