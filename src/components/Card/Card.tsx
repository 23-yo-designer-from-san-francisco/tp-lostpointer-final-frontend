import React, { useState } from 'react';
import styles from './Card.module.css';
import request from '../../services/request';
import { ContentType } from '../../services/requestUtils';

export interface CardProps {
    executed?: boolean;
    imageUrl?: string;
}


const Card: React.FC<CardProps> = ({ executed, imageUrl }) => {
  const [done, setDone] = useState<boolean>(Boolean(executed));
  const [loadedImg, setLoadedImg] = useState<string>('');


  const clickHandler = () => {
    setDone(!done);
  };
  const uploadFileHandler = async (event: any) => {
    event.preventDefault();

    const file = event.target.files[0];
    // const readFile = null;

    const formdata = new FormData();
    formdata.append('image', file, file.name);
    formdata.append('json', '{"name":"card","startTime":"05:00","endTime":"06:00"}\n');
    const result = await request.post('cards', formdata, ContentType.JSON);
    console.log(result);

    const ext = file.name
      .substring(file.name.lastIndexOf('.') + 1)
      .toLowerCase();

    if (
      ext === 'gif' ||
        ext === 'png' ||
        ext === 'jpeg' ||
        ext === 'jpg' ||
        ext === 'webp'
    ) {
      const reader = new FileReader();
      reader.addEventListener('load', (e) => {
        e.preventDefault();
        // @ts-ignore
        if (typeof e.target.result === 'string') {
          // @ts-ignore
          setLoadedImg(e.target.result);
          // readFile = e.target.result;
        }
      });
      reader.readAsDataURL(file);
    }
  };

  return(
    <div className={styles.card} onClick={clickHandler}>
      {!imageUrl && !loadedImg && <form className="cardForm">
        <input onChange={uploadFileHandler}
          type='file'
          name='file'
          id='file'
          accept='image/png, image/jpg, image/webp'
          className={styles.cardFormFile}
        />
        <label htmlFor='file' className={styles.cardInner}>+</label>
      </form>}
      {!imageUrl && loadedImg &&
          <div className={styles.cardInner}>
            <img src={loadedImg} />
          </div>}
      {imageUrl && !done &&
          <div className={styles.cardInner}>
            <img src={imageUrl} />
          </div>}
      {imageUrl && done &&
          <div className={`${styles.cardInner} ${styles.transparent}`}>
            <img src={imageUrl}/>
          </div>
      }
    </div>);
};

export { Card };
