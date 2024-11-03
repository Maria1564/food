import React, { useEffect, useRef, useState } from 'react';
import Input from 'components/Input';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import "./MultiDropdown.scss"

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({className, value, options,  onChange, getTitle, disabled}) => {
  const [openModal, setOpenModal] = useState(false);
  const [inpValue, setInpValue] = useState<string>('');
  const [currentArr, setCurrentArr] = useState<string[]>([])
  const [currentValue, setCurrentValue] = useState("")
  const [filteredArr, setFilteredArr] = useState<Option[]>([])
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  
  const placeholder = getTitle(value);
  useEffect(() => {
    const opt = options.map(item => item.key)
    if(opt.join(",").includes(getTitle(value))){
      setInpValue(getTitle(value))
      setCurrentValue(getTitle(value))
    }else{
      setInpValue("")
      setCurrentValue("")
    }
    
    const handleClickOutside = (event: MouseEvent) => {
      console.log(placeholder)
      console.log("inpValue >> ", inpValue)
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // console.log("handleClickOutside")
        setOpenModal(false);
        setInpValue(placeholder);
        setCurrentValue(placeholder)
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [placeholder]);
  
  const handleToggleModal = () => {
    if (!openModal) {
      setCurrentArr(inpValue.split(", "))
      setInpValue('');
      setCurrentValue("")
      setOpenModal(prev => !prev);
    }
  };

  const handleOptionClick = (option: Option) => {
    const isSelected = value.some(v => v.key === option.key);
    const newValue = isSelected
      ? value.filter(v => v.key !== option.key)
      : [...value, option]; 

      // console.log("new >> ", newValue, value)
      onChange(newValue);
      const arr = newValue.map(item => item.value)
      setCurrentArr(() => [...arr])
      // console.log(currentArr)
    setInpValue(getTitle(newValue)); 
    
  };

  const handlerChange = (val: string) => {
    setCurrentValue(val)
    const res = options.filter(item => item.value.includes(val))
    console.log("res >> ", res)
    setFilteredArr(res)
  }
  return (
    <div ref={dropdownRef} >
      <Input 
      className={className}
        value={currentValue} 
        onChange={(val) => handlerChange(val)} 
        afterSlot={<ArrowDownIcon />}  
        onClick={handleToggleModal} 
        placeholder={placeholder} 
      />
      {(openModal && disabled !== true) ? filteredArr.length === 0 && currentValue === "" ? ( 
        <div className='wrapper_items'> 
          {options.map(item => (
            
            <div className='item' key={item.key}  style={{color:( currentArr.includes(item.value) && "#B5460F")as string}} onClick={() => handleOptionClick(item)}>
              {item.value}
            </div>
          ))}
        </div>
      ):(
        <div className="wrapper_items">
          
          {filteredArr.map((item, ) =>(
           <div className='item' key={item.key} style={{color:( currentArr.includes(item.value) && "#B5460F")as string}} onClick={() => handleOptionClick(item)}>
           {item.value}
         </div>
          ))}
        </div>
      ): <></>}
    </div>
  );

};

export default MultiDropdown;
