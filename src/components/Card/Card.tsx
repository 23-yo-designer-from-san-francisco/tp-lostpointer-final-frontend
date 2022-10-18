import React, { useState } from 'react';
import styles from './Card.module.css';
import { useNavigate } from 'react-router-dom';

export interface CardProps {
    done?: boolean;
    imgUrl?: string;
    scheduleId?: string;
}

const Card: React.FC<CardProps> = ({ done, imgUrl , scheduleId }) => {
  const navigate = useNavigate();
  const [_done, setDone] = useState<boolean>(Boolean(done));
  // const [loadedImg, setLoadedImg] = useState<string>('');


  const setDoneHandler = () => {
    setDone(!_done);
  };

  const createNewHandler = () => {
    navigate('/new');
  };

  // const uploadFileHandler = async (event: any) => {
  //   event.preventDefault();
  //
  //   const file = event.target.files[0];
  //
  //   const formdata = new FormData();
  //   formdata.append('image', file);
  //   // В result будет полная информация о карточке, а она нам нужна? Мб просто успешно изменение или нет
  //   const result = await apiRequest.post(`schedules/day/${scheduleId}/cards`, formdata, ContentType.FORM);
  //
  //   const ext = file.name
  //     .substring(file.name.lastIndexOf('.') + 1)
  //     .toLowerCase();
  //
  //   if (['gif', 'png', 'jpeg', 'jpg', 'webp'].includes(ext)) {
  //     const reader = new FileReader();
  //     reader.addEventListener('load', (e) => {
  //       e.preventDefault();
  //       if (typeof e?.target?.result === 'string') {
  //         setLoadedImg(e.target.result);
  //       }
  //     });
  //     reader.readAsDataURL(file);
  //   }
  // };

  return(
    <div className={styles.card} onClick={setDoneHandler}>
      {!imgUrl &&
        <div onClick={createNewHandler} className={styles.cardInner}>+</div>
      }

      {imgUrl && !_done &&
          <div className={styles.cardInner}>
            <img src={imgUrl} />
          </div>
      }
      {imgUrl && _done &&
          <div className={`${styles.cardInner} ${styles.transparent}`}>
            <img src={imgUrl}/>
          </div>
      }
    </div>);
};

export { Card };
