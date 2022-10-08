import React, { useState } from 'react';
import styles from './Card.module.css';
import request from '../../services/request';
import { ContentType } from '../../services/requestUtils';

export interface CardProps {
  done?: boolean;
    imgUrl?: string;
}


const Card: React.FC<CardProps> = ({ done, imgUrl }) => {
  const [_done, setDone] = useState<boolean>(Boolean(done));
  const [loadedImg, setLoadedImg] = useState<string>('');


  const clickHandler = () => {
    setDone(!_done);
  };
  const uploadFileHandler = async (event: any) => {
    event.preventDefault();

    const file = event.target.files[0];
    // const readFile = null;

    const formdata = new FormData();
    formdata.append('image', file);
    formdata.append('json', '{"name":"card","startTime":"05:00","endTime":"06:00"}');
    // В result будет полная информация о карточке, а она нам нужна? Мб просто успешно изменение или нет
    const result = await request.post('cards', formdata, ContentType.FORM);

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
    <div className={styles.card} onClick={clickHandler}>
      {!imgUrl && !loadedImg && <form className="cardForm">
        <input onChange={uploadFileHandler}
          type='file'
          name='file'
          id='file'
          accept='image/png, image/jpg, image/webp'
          className={styles.cardFormFile}
        />
        <label htmlFor='file' className={styles.cardInner}>+</label>
      </form>}
      {!imgUrl && loadedImg &&
          <div className={styles.cardInner}>
            <img src={loadedImg} />
          </div>}
      {imgUrl && !_done &&
          <div className={styles.cardInner}>
            <img src={imgUrl} />
          </div>}
      {imgUrl && _done &&
          <div className={`${styles.cardInner} ${styles.transparent}`}>
            <img src={imgUrl}/>
          </div>
      }
    </div>);
};

export { Card };
