import Text from "components/Text"
import React from 'react';
import "./Card.scss"

export type CardProps = {
    /** Дополнительный classname */
    className?: string,
    /** URL изображения */
    image: string;
    /** Слот над заголовком */
    captionSlot?: React.ReactNode;
    /** Заголовок карточки */
    title: React.ReactNode;
    /** Описание карточки */
    subtitle: React.ReactNode;
    /** Содержимое карточки (футер/боковая часть), может быть пустым */
    contentSlot?: React.ReactNode;
    /** Клик на карточку */
    onClick?: React.MouseEventHandler;
    /** Слот для действия */
    actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({className, image, captionSlot, title, subtitle, contentSlot, onClick, actionSlot}) => {
   return (
    <div className={`card ${className}`} >
        <div className="card__content second_content"  >
            <img src={image} alt="" className="card__image" width={360}/>
        </div>
        <div className="card__content">
            {captionSlot && <Text tag='div' className='card__capt-slot' view='p-14' weight='medium' color='secondary'>{captionSlot}</Text>}
            <div className="" onClick={onClick}>
            <Text view='p-20' weight='medium' maxLines={2} color='primary' className='card__title'>{title}</Text>
             <Text className='card__subtitle' view='p-16' color='secondary' maxLines={3}>{subtitle}</Text>
            </div>
            <div className="card__other-info">
                {contentSlot && <Text tag='span' view='p-18' weight='bold'>{contentSlot}</Text>}
                {actionSlot && actionSlot}
             </div>
        </div>
    </div>
   )
};

export default Card;