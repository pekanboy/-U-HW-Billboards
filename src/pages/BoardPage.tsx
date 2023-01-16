import React, {useEffect, useState} from 'react';
import styles from './BoardPage.module.css';
import {CompanyCard} from "../components/CompanyCard/CompanyCard";
import {BillboardCard} from "../components/BillboardCard/BillboardCard";
import {Button} from "../components/Button/Button";
import {useHttp} from "../hooks/useHttp";

interface ICompany {
    id: number;
    name: string;
    billboards: number[];
}

interface IBillboard {
    id: number;
    name: string;
    place: string;
    price: number;
}

export const BoardPage = () => {
    const {request} = useHttp();
    const [companies, setCompanies] = useState(new Map<number, ICompany>([]));
    const [billboards, setBillboards] = useState(new Map<number, IBillboard>([]));

    useEffect(() => {
        request('/company', 'GET')
            .then((res) => {
                setCompanies(new Map(res.companies));
            });
        request('/billboard', 'GET')
            .then((res) => {
                setBillboards(new Map(res.billboards));
            });
    }, []);

    const onChangeCompany = async (id: number, name: string, billboards: number[]): Promise<void> => {
        try {
            const res = await request('/company/change', 'PUT', {id, name, billboards})
            res.message && alert(res.message);
            !res.message && setCompanies(prev => prev.set(id, {id, name, billboards}))
        } catch (_) {}
    }

    const onAddCompany = async (): Promise<void> => {
        const dummy = {name: 'Название компании',  billboards: []}
        try {
            const res = await request('/company/add', 'POST', dummy)
            res.message && alert(res.message);
            res.id && setCompanies(prev => prev.set(res.id, {id: res.id, ...dummy}))
        } catch (_) {}
    }

    const onAddBillboard = async (): Promise<void> => {
        const dummy = {
            name: 'Название',
            price: 0,
            place: 'Адрес'
        };

        try {
            const res = await request('/billboard/add', 'POST', dummy)
            res.message && alert(res.message);
            res.id && setBillboards(prev => prev.set(res.id, {id: res.id, ...dummy}))
        } catch (_) {}
    }

    const onChangeBillboard = async (id: number, name: string, place: string, price: number): Promise<void> => {
        try {
            const res = await request('/billboard/change', 'PUT', {id, name, place, price})
            res.message && alert(res.message);
            !res.message && setBillboards(prev => prev.set(id, {id, name, place, price}))
        } catch (_) {}
    }

    const onDeleteBillboard = async (id: number): Promise<void> => {
        try {
            const res = await request('/billboard/delete', 'DELETE', {id})
            res.message && alert(res.message);
            !res.message && setBillboards(prev => {prev.delete(id); return prev})
        } catch (_) {}
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>Доска управления заказами</div>
            <div className={styles.columns}>
                <div className={styles.right}>
                    <div className={styles.miniHeader}>Компании:</div>
                    {Array.from(companies.values()).map((company) =>
                        <CompanyCard
                            billboards={company.billboards}
                            id={company.id}
                            name={company.name}
                            onSave={onChangeCompany}
                            key={company.id}
                        />
                    )}
                    <Button text={'Добавить компанию'} onClick={onAddCompany}/>
                </div>
                <div className={styles.left}>
                    <div className={styles.miniHeader}>Билборды:</div>
                    {Array.from(billboards.values()).map((billboard) =>
                        <BillboardCard
                            {...billboard}
                            onSave={onChangeBillboard}
                            onDelete={onDeleteBillboard}
                            key={billboard.id}
                        />
                    )}
                    <Button text={'Добавить билборд'} onClick={onAddBillboard}/>
                </div>
            </div>
        </div>
    )
}