import Data from "../Models/dataModel.js";
import pdf from "pdf-creator-node";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import qrcode from "qrcode";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generatePDFReport = async (req, res) => {
    try {
        const data = await Data.find({});
        if (!data || data.length === 0) {
            return res.status(404).json({ success: false, message: 'No data found' });
        }

        const pageUrl = 'http://localhost:5000/api/report/pdf';
        const qrCodeImage = await qrcode.toDataURL(pageUrl);

        const htmlTemplate = fs.readFileSync(path.join(__dirname, "../views/reportTemplate.html"), "utf-8");
        let tableRows = '';
        data.forEach(item => {
            tableRows += `
                <tr>
                    <td>${item.leadName}</td>
                    <td>${item.campaignName}</td>
                    <td>${item.conversionRate}</td>
                    <td>${item.leadScore}</td>
                </tr>
            `;
        });
        const html = htmlTemplate
            .replace('{{date}}', new Date().toLocaleDateString())
            .replace('{{tableRows}}', tableRows)
            .replace('{{qrCode}}', qrCodeImage);
        const options = {
            format: "A4",
            orientation: "portrait",
            border: "10mm",
            header: {
                height: "15mm",
                contents: '<h4 style="text-align: center;">EzyMetrics Report</h4>'
            },
            footer: {
                height: "20mm",
            }
        };
        const document = {
            html: html,
            data: {},
            path: "./output/report.pdf"
        };
        pdf.create(document, options)
            .then(() => {
                console.log("PDF report generated successfully.");
                const filePath = path.resolve('./output/report.pdf');
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
                const fileStream = fs.createReadStream(filePath);
                fileStream.pipe(res);
                fileStream.on('end', () => {
                    fs.unlinkSync(filePath);  
                });
            })
            .catch((error) => {
                console.error("Error generating PDF:", error);
                res.status(500).json({ success: false, message: 'Failed to generate PDF report' });
            });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to generate PDF report', error: error.message });
    }
};

export const generateCSVReport = async (req, res) => {
    try {
        const data = await Data.find({});
        if (!data || data.length === 0) {
            return res.status(404).json({ success: false, message: 'No data found' });
        }
        let csvData = 'Lead Name,Campaign Name,Conversion Rate (%),Lead Score\n';
        data.forEach(item => {
            csvData += `${item.leadName},${item.campaignName},${item.conversionRate},${item.leadScore}\n`;
        });

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=report.csv');
        
        res.status(200).send(csvData);
    } catch (error) {
        console.error("Error generating CSV:", error);
        res.status(500).json({ success: false, message: 'Failed to generate CSV report', error: error.message });
    }
};
