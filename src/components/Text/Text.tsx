import * as React from 'react';
import './Text.scss';
import classNames from 'classnames';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({
  className,
  view = "p-14",
  tag: Tag = 'p',
  weight,
  children,
  color,
  maxLines,
}) => {
    
    const cn = classNames("text", {
        [className as string]: className ? className : "",
        [view as string]: view,
        [weight as string]: weight,
        [`text_color_${color}`]: color
    })

  // let selectTag = <p className={cn} style={{ WebkitLineClamp: maxLines ? maxLines : 100}}>{children}</p>;
  // let selectColor
  // switch (color){
  //   case "secondary":
  //       selectColor = "#AFADB5"
  //       break
  //   case "accent":
  //       selectColor = "#B5460F"
  //       break
  //   case "primary":
  //       selectColor = "#000"
  //       break
  //   default:
  //       selectColor = "inherit"
  //       break
  // }

  // switch (tag) {
  //   case 'h1':
  //     selectTag = <h1 className={cn} style={{color: selectColor, WebkitLineClamp: maxLines ? maxLines : 100}}>{children}</h1>;
  //     break;
  //   case 'h2':
  //       selectTag = <h2 className={cn} style={{color: selectColor, WebkitLineClamp: maxLines ? maxLines : 100}}>{children}</h2>;
  //     break;
  //   case 'h3':
  //       selectTag = <h3 className={cn} style={{color: selectColor, WebkitLineClamp: maxLines ? maxLines : 100}}>{children}</h3>;
  //     break;
  //   case 'h4':
  //       selectTag = <h4 className={cn} style={{color: selectColor, WebkitLineClamp: maxLines ? maxLines : 100}}>{children}</h4>
  //     break;
  //   case 'h5':
  //       selectTag =  <h5 className={cn} style={{color: selectColor, WebkitLineClamp: maxLines ? maxLines : 100}}>{children}</h5>
  //     break;
  //   case 'h6':
  //       selectTag =  <h6 className={cn} style={{color: selectColor, WebkitLineClamp: maxLines ? maxLines : 100}}>{children}</h6>
  //     break;
  //   case 'div':
  //       selectTag =  <div className={cn} style={{color: selectColor, WebkitLineClamp: maxLines ? maxLines : 100}}>{children}</div>
  //     break;
  //   case 'p':
  //       selectTag =  <p className={cn} style={{color: selectColor, WebkitLineClamp: maxLines ? maxLines : 100}}>{children}</p>
  //     break;
  //     case 'span':
  //       selectTag = <span className={cn} style={{color: selectColor, WebkitLineClamp: maxLines ? maxLines : 100}}>{children}</span>
  //     break;
  // }


  return <Tag className={cn} style={ {WebkitLineClamp: maxLines ? maxLines : 100}}>{children}</Tag>;
};

export default Text;
