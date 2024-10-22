import Data from "../Models/dataModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const fetchAndDisplayData = async (req, res, next) => {
    try {

        const data = await Data.find({});
        if (!data || data.length === 0) {
            return res.status(404).send("No data found");
        }

        const htmlTemplate = fs.readFileSync(path.join(__dirname, "../views/fetchData.html"), "utf-8");

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

        const populatedHtml = htmlTemplate.replace('{{tableRows}}', tableRows);

        res.send(populatedHtml);
    } catch (error) {
        next(error);
    }
};
