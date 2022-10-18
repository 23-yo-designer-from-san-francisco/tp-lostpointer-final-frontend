import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiRequest } from '../../services/request';
import { ContentType } from '../../services/requestUtils';

import styles from './EditCard.module.css';

export interface EditCardProps {
    id?: string;
    name?: string;
    imgUrl?: string;
}

const EditCard: React.FC<EditCardProps> = ({ id, name, imgUrl }) => {
  const [warning, setWarning] = useState<string>('');
  const [newName, setName] = useState<string|undefined>(name);
  const { scheduleId } = useParams();
  const navigate = useNavigate();
  const [loadedImg, setLoadedImg] = useState<string>('');

  const submitEditFormHandler = async (event: any) => {
    event.preventDefault();
    if (!loadedImg && newName == name) {
      setWarning('Нужно новое фото или имя!');
    } else if (!loadedImg) {
      setWarning('Нужно новое фото!');
    } else if (!loadedImg && newName || loadedImg) {
      setWarning('');
      const formdata = new FormData();
      if (loadedImg) {
        formdata.append('image', loadedImg);
      }
      if (newName) {
        formdata.append('card', JSON.stringify({ 'name': newName }));
      }
      const card = await apiRequest.post(`schedules/day/${scheduleId}/cards`, formdata, ContentType.FORM);
    }
  };

  const closeWindowHandler = () => {
    navigate(-1);
  };

  const uploadNameHandler = (event: any) => {
    setName(event.target.value);
  };

  const uploadFileHandler = async (event: any) => {
    event.preventDefault();

    const file = event.target.files[0];

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
    <div className={styles.editCard}>
      <div className={styles.editCardContent}>
        <img alt="Закрыть окно" className={styles.editCardClose} onClick={closeWindowHandler} src="https://lostpointer.tech/images/delete.svg"/>
        <div className={styles.editCardContentFlex}>
          <form className={styles.editCardForm} action='#' noValidate>
            <div>
              <div className={styles.editCardImageBlock}>
                {imgUrl && <img alt='Изображение' className={styles.editCardImageImg} src={imgUrl}/>}
                {!imgUrl && loadedImg && <img alt='Изображение' className={styles.editCardImageImg} src={loadedImg}/>}
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
                {id && <>Изменить карточку</>}
                {!id && <>Новая карточка</>}
              </div>
              {id && <img alt="Удалить карточку" className={styles.editCardDelete} src="https://lostpointer.tech/images/trash.svg"/>}
              <input onChange={uploadNameHandler}
                className={styles.editCardNameInput}
                type="text"
                name="name"
                placeholder="Имя карточки"
                value={name}
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
