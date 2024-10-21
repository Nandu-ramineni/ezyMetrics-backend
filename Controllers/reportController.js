import Data from "../Models/dataModel.js";
import PDFDocument from "pdfkit";

export const generatePDFReport = async (req, res) => {
    try {
        const data = await Data.find({});
        if (!data) {
            return res.status(404).json({ success: false, message: 'No data found' });
        }
        const doc = new PDFDocument({ margin: 50 });
        function generateTableRow(doc, col1, col2, col3, col4) {
            doc
                .fontSize(10)
                .text(col2, 150, doc.y, { continued: true,width: 90, align: 'left' })
                .text(col3, 250, doc.y, {continued: true, width: 90, align: 'right' })
                .text(col4, 350, doc.y, {continued: true, width: 90, align: 'right' });
            doc.moveDown();
        }

        doc
            .fontSize(20)
            .text('EzyMetrics Report', { align: 'center' })
            .moveDown(1.5);

        doc
            .fontSize(14)
            .fillColor('#444444')
            .text(`Generated on: ${new Date().toLocaleDateString()}`, { align: 'right' })
            .moveDown();
            doc
            .fontSize(12)
            .fillColor('#000000')
            .text('Lead Name', 50, doc.y, { continued: true })
            .text('Campaign Name', 150, doc.y, { continued: true })
            .text('Conversion Rate', 300, doc.y, { continued: true,  })
            .text('Lead Score', 400, doc.y, ) 
            .moveDown();

        doc.strokeColor('#aaaaaa').lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();

        data.forEach(item => {
            generateTableRow(doc, item.leadName, item.campaignName, `${item.conversionRate}%`, item.leadScore);
            doc.strokeColor('#aaaaaa').lineWidth(0.5).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
        });
        doc
            .moveDown(2)
            .fontSize(12)
            .text('Thank you for using EzyMetrics!', { align: 'center', fillColor: '#444444' })
            .moveDown(0.5);

        doc
            .fontSize(10)
            .text('This report was generated automatically. For more details, contact us at support@ezymetrics.com.', { align: 'center' });

        doc.end();

        let buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            const pdfData = Buffer.concat(buffers);
            res.type('pdf');
            res.send(pdfData);
    });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to generate PDF report' });
    }
}

export const generateCSVReport = async (req, res) => {
    try {
        const data = await Data.find({});
        if (!data) {
            return res.status(404).json({ success: false, message: 'No data found' });
        }
        let csvData = 'Lead Name,Campaign Name,Conversion Rate,Lead Score\n';

        data.forEach(item => {
            csvData += `${item.leadName},${item.campaignName},${item.conversionRate},${item.leadScore}\n`;
        });

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=report.csv');
        res.status(200).send(csvData);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to generate CSV report' });
    }
}