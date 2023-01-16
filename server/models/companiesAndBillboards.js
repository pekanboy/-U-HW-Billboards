class CompaniesAndBillboards {
    bcount = 0;
    ccount = 0;
    // billboard {id: number, name, desc, place, price}
    billboards = new Map([]);
    // {id: number, name, billboards: billboard}
    companies = new Map([]);

    addCompany({name}) {
        this.ccount += 1;
        const id = this.ccount;
        this.companies.set(id, {id, name});

        return {
            isOk: true,
            id,
        };
    }

    changeCompany({id, name, billboards}) {
        this.companies.set(id, {id, name, billboards});

        return {
            isOk: true,
            id,
        };
    }

    changeBillboard({id, name, place, price}) {
        this.billboards.set(id, {id, name, place, price});

        return {
            isOk: true,
            id,
        };
    }

    deleteCompany({id}) {
        this.companies.delete(id);

        return {
            isOk: true,
        };
    }

    addBillboard({name, place, price}) {
        this.bcount += 1;
        const id = this.bcount;
        this.billboards.set(id, {id, name, place, price});

        return {
            isOk: true,
            id,
        };
    }

    deleteBillboard({id}) {
        this.billboards.delete(id);

        return {
            isOk: true,
        };
    }
}

module.exports = new CompaniesAndBillboards();