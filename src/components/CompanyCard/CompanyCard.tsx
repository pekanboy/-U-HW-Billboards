import styles from './CompanyCard.module.css';
import change from '../static/change.svg';
import save from '../static/save.png';
import classnames from 'classnames';
import {useCallback, useState, useRef} from "react";

interface ICompanyCardProps {
    id: number;
    name: string;
    billboards: number[];
    onSave: (id: number, name: string, billboards: number[]) => void;
}

export const CompanyCard = ({id, name, onSave, billboards}: ICompanyCardProps) => {
    const [isChange, setIsChange] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const billboardsRef = useRef<HTMLInputElement | null>(null);

    const onChangeClick = useCallback(() => {
        setIsChange(prev => !prev);
    }, []);

    const onSaveClick = useCallback(() => {
        debugger
        if (inputRef?.current?.value) {
            onSave(id, inputRef.current.value, billboardsRef.current?.value.split(' ').map((t) => Number(t)) || []);
            setIsChange(prev => !prev);
            setIsValid(true);
            return;
        }

        setIsValid(false);
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.inputs}>
                <input
                    className={classnames(styles.name, {
                        [styles.notValid]: !isValid
                    })}
                    defaultValue={name}
                    ref={inputRef}
                    disabled={!isChange} />
                <input
                    className={styles.name}
                    defaultValue={billboards?.join(' ') || ''}
                    placeholder={'Номера билборбов через пробел'}
                    ref={billboardsRef}
                    disabled={!isChange} />
            </div>
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
        </div>
    )
}