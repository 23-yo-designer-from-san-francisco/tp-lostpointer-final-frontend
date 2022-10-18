import React from 'react';
import styles from './EditCard.module.css';

export interface EditCardProps {
    id?: string;
    name?: string;
    imgUrl?: string;
}

const EditCard: React.FC<EditCardProps> = ({ id, name, imgUrl }) => {
  return(
    <div className={styles.editCard}>
      <div className={styles.editCardContent}>
        <img alt="Закрыть окно" className={styles.editCardClose} src="https://lostpointer.tech/images/delete.svg"/>
        <div className={styles.editCardContentFlex}>
          <form className={styles.editCardImage} action='#' noValidate>
            <div className={styles.editCardImageBlock}>
              {imgUrl && <img alt='Изображение' className={styles.editCardImageImg} src={imgUrl}/>}
            </div>
            <input
              type='file'
              name='file'
              id='file'
              accept='image/png, image/jpg, image/webp'
              className={styles.editCardImageInput}
            />
            <label htmlFor='file' className={styles.editCardImageInputBtn}>Upload file</label>
          </form>
          <form className={styles.editCardForm} action='#' noValidate>
            <div className={styles.editCardFormTitle}>
              {id && <>Изменить карточку</>}
              {!id && <>Новая карточка</>}
            </div>
            {id && <img alt="Delete card" className={styles.editCardDelete} src="https://lostpointer.tech/images/trash.svg"/>}
            <input
              className={styles.editCardNameInput}
              type="text"
              name="name"
              placeholder="Имя карточки"
              value={name}
            />
            <div className={styles.editCardFormButtons}>
              <input
                className={styles.editCardFormSubmit}
                type='submit'
                value="Сохранить"
              />
            </div>
            <div className={styles.editCardFormMsg}></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { EditCard };
