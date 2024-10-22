
---

# EzyMetrics Report Generation 

This is a Node.js-based API for generating reports in PDF and CSV formats using data from a MongoDB database. 
## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [License](#license)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Nandu-ramineni/ezyMetrics-backend.git
   ```

2. Navigate into the project directory:

   ```bash
   cd ezymetrics-backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up your environment variables. Create a `.env` file in the root of your project:

   ```bash
   touch .env
   ```

   Add the following configuration in your `.env` file:

   ```env
    PORT = 5000
    MONGO_URI = "YOUR MONGO SRV"
    NODE_ENV= production

   ```

5. Run the server:

   ```bash
   npm run dev
   ```

## Usage

The API provides two key routes for generating reports based on the data stored in the MongoDB database:

- **PDF Report**: Generates a PDF report using the `pdf-creator-node` package.
- **CSV Report**: Generates a CSV report.

The PDF and CSV reports can be downloaded directly via the API.

## API Routes

### 1. Generate PDF Report

- **URL**: `/api/reports/pdf`
- **Method**: `GET`
- **Description**: Generates a PDF report containing all the data stored in the MongoDB database.
- **Response**: A PDF file with the report data.
  
#### Example Request:

```bash
GET https://ezymetrics-backend.onrender.com/api/report/pdf
```

#### Example Response:

- **Content-Type**: `application/pdf`
- The response is a downloadable PDF file.

### 2. Generate CSV Report

- **URL**: `/api/reports/csv`
- **Method**: `GET`
- **Description**: Generates a CSV report containing all the data stored in the MongoDB database.
- **Response**: A CSV file with the report data.

#### Example Request:

```bash
GET https://ezymetrics-backend.onrender.com/api/report/csv
```

#### Example Response:

- **Content-Type**: `text/csv`
- The response is a downloadable CSV file.

### 3. Fetch and Display

- **URL**: `/api/fetch-data`
- **Method**: `GET`
- **Description**: The response can be viewed directly in the browser or downloaded as a file. .

  
#### Example Request:

```bash
GET https://ezymetrics-backend.onrender.com/api/fetch-data
```


## Project Structure

```
├── Models/
│   └── dataModel.js      # Mongoose model for data
├── Controllers/
│   └── reportController.js # Handles the generation of PDF and CSV reports
├── Routes/
│   └── reportRoutes.js     # Defines API routes for reports
├── .env                    # Environment variables
├── server.js               # Main server file
└── README.md               # Project documentation
```

### Models

The `Data` model schema includes the following fields:

- `leadName`: `String` – Name of the lead.
- `campaignName`: `String` – Name of the campaign.
- `conversionRate`: `Number` – Conversion rate for the campaign.
- `leadScore`: `Number` – Score assigned to the lead.

### Controllers

- **reportController.js**: Contains the logic for generating PDF and CSV reports using the `pdf-creator-node` library for PDF generation.

### Routes

- **reportRoutes.js**: Defines the API endpoints for generating reports.

### Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM library for MongoDB.
- **pdf-creator-node**: Template-based PDF generation for invoices and reports.

## License

This project is licensed under the MIT License.

---

Feel free to customize this `README.md` file as per your project's specific details and requirements.