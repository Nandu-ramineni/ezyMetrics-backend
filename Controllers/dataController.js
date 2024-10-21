import Data from "../Models/dataModel.js";


export const fetchAndStoreData = async (req, res) => {
    try {
        const dummyData = [
            { leadName: 'Ramesh Rao', campaignName: 'Campaign A', conversionRate: 30, leadScore: 85 },
            { leadName: 'Suresh Naidu', campaignName: 'Campaign B', conversionRate: 45, leadScore: 90 },
            { leadName: 'Lakshmi Narayana', campaignName: 'Campaign C', conversionRate: 55, leadScore: 88 },
            { leadName: 'Kavya Reddy', campaignName: 'Campaign D', conversionRate: 40, leadScore: 78 },
            { leadName: 'Vijay Kumar', campaignName: 'Campaign E', conversionRate: 60, leadScore: 95 },
            { leadName: 'Anitha Rao', campaignName: 'Campaign F', conversionRate: 50, leadScore: 89 },
            { leadName: 'Rajeshwari Reddy', campaignName: 'Campaign G', conversionRate: 35, leadScore: 82 },
            { leadName: 'Sai Kiran', campaignName: 'Campaign H', conversionRate: 65, leadScore: 91 },
            { leadName: 'Manjula Devi', campaignName: 'Campaign I', conversionRate: 25, leadScore: 70 },
            { leadName: 'Shankar Prasad', campaignName: 'Campaign J', conversionRate: 48, leadScore: 87 }
        ];
        await Data.insertMany(dummyData);

        res.status(200).json({ success: true, message: 'Data fetched and stored successfully',data: dummyData});
    } catch (error) {
        next(error);
    }
};