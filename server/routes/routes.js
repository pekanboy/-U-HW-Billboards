// @ts-ignore
const {Router} = require('express');
const router = Router();
const companiesAndBillboards = require('./../models/companiesAndBillboards.js');

router.post(
  '/company/add',
  async (req, res) => {
   try {
      const result = companiesAndBillboards.addCompany(req.body);
      if (!result.isOk) throw 'Internal server error';

      res.status(201).json({id: result.id})
    } catch (err) {
      res.status(500).json({message: err});
    }
  });

router.get(
  '/company',
  async (req, res) => {
    try {
      let result = companiesAndBillboards.companies;

      res.status(201).json({companies: Array.from(result.entries())})
    } catch (err) {
      res.status(500).json({message: err});
    }
  });

router.put(
  '/company/change',
  async (req, res) => {
    try {
      const result = companiesAndBillboards.changeCompany(req.body);
      if (!result.isOk) throw 'Internal server error';

      res.status(201).json({})
    } catch (err) {
      res.status(500).json({message: err});
    }
  });

router.delete(
  '/company/delete',
  async (req, res) => {
    try {
      const result = companiesAndBillboards.deleteCompany(req.body);
      if (!result.isOk) throw 'Internal server error';

      res.status(201).json({});
    } catch (err) {
      res.status(500).json({message: err});
    }
  });

router.get(
  '/billboard',
  async (req, res) => {
    try {
      let result = companiesAndBillboards.billboards;

      res.status(201).json({billboards: Array.from(result.entries())})
    } catch (err) {
      res.status(500).json({message: err});
    }
  });

router.post(
  '/billboard/add',
  async (req, res) => {
    try {
      const result = companiesAndBillboards.addBillboard(req.body);
      if (!result.isOk) throw 'Internal server error';

      res.status(201).json({id: result.id})
    } catch (err) {
      res.status(500).json({message: err});
    }
  });

router.put(
  '/billboard/change',
  async (req, res) => {
    try {
      const result = companiesAndBillboards.changeBillboard(req.body);
      if (!result.isOk) throw 'Internal server error';

      res.status(201).json({})
    } catch (err) {
      res.status(500).json({message: err});
    }
  });

router.delete(
  '/billboard/delete',
  async (req, res) => {
    try {
      const result = companiesAndBillboards.deleteBillboard(req.body);
      if (!result.isOk) throw 'Internal server error';

      res.status(201).json({});
    } catch (err) {
      res.status(500).json({message: err});
    }
  });

module.exports = router;