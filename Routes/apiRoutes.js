import express from 'express';
import { fetchAndStoreData } from '../Controllers/dataController.js';
import { generateCSVReport, generatePDFReport } from '../Controllers/reportController.js';
// import { sendAlertEmail } from '../Controllers/alertController.js';


const router = express.Router();


router.get('/fetch-data', fetchAndStoreData);
router.get('/report/pdf', generatePDFReport);
router.get('/report/csv', generateCSVReport);
// router.post('/alert', sendAlertEmail);

export default router;