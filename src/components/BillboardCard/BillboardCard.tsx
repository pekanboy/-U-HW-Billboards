import styles from './BillboardCard.module.css';
import change from '../static/change.svg';
import save from '../static/save.png';
import remove from '../static/remove.png';
import classnames from 'classnames';
import {useCallback, useState, useRef} from "react";

interface IBillboardCardProps {
    id: number;
    name: string;
    place: string;
    price: number;
    onSave: (id: number, name: string, place: string, price: number) => void;
    onDelete: (id: number) => void;
}

export const BillboardCard = ({id, name, onSave, place, price, onDelete}: IBillboardCardProps) => {
    const [isChange, setIsChange] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const nameRef = useRef<HTMLInputElement | null>(null);
    const placeRef = useRef<HTMLInputElement | null>(null);
    const priceRef = useRef<HTMLInputElement | null>(null);

    const onChangeClick = useCallback(() => {
        setIsChange(prev => !prev);
    }, []);

    const onSaveClick = useCallback(() => {
        if (nameRef?.current?.value && placeRef?.current?.value && priceRef?.current?.value) {
            onSave(id, nameRef.current.value, placeRef.current.value, Number(priceRef.current.value));
            setIsChange(prev => !prev);
            setIsValid(true);
            return;
        }

        setIsValid(false);
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.inputs}>
                <div className={styles.header}>ID: {id}</div>
                <input
                    className={classnames(styles.name, {
                        [styles.notValid]: !isValid
                    })}
                    defaultValue={name}
                    ref={nameRef}
                    disabled={!isChange} />
                <input
                    className={classnames(styles.place, {
                        [styles.notValid]: !isValid
                    })}
                    defaultValue={place}
                    ref={placeRef}
                    disabled={!isChange} />
                <input
                    className={classnames(styles.price, {
                        [styles.notValid]: !isValid
                    })}
                    type={'number'}
                    defaultValue={price}
                    ref={priceRef}
                    disabled={!isChange} />
            </div>
            <div className={styles.imgs}>
                {!isChange && <img
                  src={change}
                  alt="Изменить название компании"
                  className={styles.img}
                  onClick={onChangeClick}
                />}
                {isChange && <img
                  src={save}
                  alt="Сохранить название"
                  className={styles.img}
                  onClick={onSaveClick}
                />}
                <img
                    src={remove}
                    alt="Удалить билборд"
                    className={styles.img}
                    onClick={() => onDelete(id)}
                />
            </div>
        </div>
    )
}