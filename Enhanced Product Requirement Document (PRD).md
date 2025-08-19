# Enhanced Product Requirement Document (PRD)

## Farmers’ Price Board App

### 1. Overview

The Farmers’ Price Board is a mobile and web application designed to empower farmers with real-time market price information for major crops. Built with React Native (Expo) for cross-platform compatibility and Supabase for robust backend services, the application leverages open APIs or Ministry of Food & Agriculture datasets to display up-to-date prices. This helps farmers make informed decisions about when and where to sell their produce, ultimately maximizing their profits. This enhanced PRD provides a deeper dive into the application's architecture, technical specifications, and implementation details, ensuring a comprehensive understanding for development and future iterations.

### 2. Goals

-   **Real-time Price Information:** Provide farmers with accurate and up-to-date market prices for their crops.
-   **Regional and Crop Filtering:** Allow farmers to easily filter price information by specific crop types and geographical regions/markets.
-   **User-Friendly Interface:** Present complex market data in a simple, intuitive, and easy-to-read format (tables and charts).
-   **Accessibility:** Ensure the application is readily available and functional across both mobile and web platforms, catering to diverse user access methods.

### 3. User Stories

To better understand the needs and interactions of our users, the following user stories have been defined:

*   **As a farmer, I want to see the current prices of my crops so that I can choose the best market.**
*   **As a farmer, I want to filter prices by crop type so that I only see relevant data.**
*   **As a farmer, I want to filter prices by region so that I can compare local market trends.**
*   **As a farmer, I want to see historical trends so that I can predict when to sell.**
*   **As an admin, I want to update market data sources so that information stays reliable.**

### 4. Solutions

The application leverages a modern technology stack to deliver its core functionalities:

-   **Authentication:** Supabase Auth provides secure and scalable user login and signup capabilities.
-   **Data Storage:** Crop price records are securely stored and managed within the Supabase Database.
-   **Data Sourcing:** Price data is pulled from reliable sources such as the Ministry of Food & Agriculture API or other open APIs.
-   **Data Presentation:** Comprehensive filtering and sorting options are provided, and data is displayed in both tabular and graphical formats.
-   **Deployment:** The web application is deployed on Vercel, while the mobile application is distributed via Expo EAS, ensuring broad accessibility.

### 5. User Flow

The following diagram illustrates the primary user journey within the application:

![User Flow Diagram](https://private-us-east-1.manuscdn.com/sessionFile/A3PkNw9mH6QlkEVZ59AMrG/sandbox/EAGtHdr7MlLOvmCGKch1XP-images_1755512205595_na1fn_L2hvbWUvdWJ1bnR1L2Zhcm1lcnNfcHJpY2VfYm9hcmRfdXNlcl9mbG93.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQTNQa053OW1INlFsa0VWWjU5QU1yRy9zYW5kYm94L0VBR3RIZHI3TWxMT3ZtQ0dLY2gxWFAtaW1hZ2VzXzE3NTU1MTIyMDU1OTVfbmExZm5fTDJodmJXVXZkV0oxYm5SMUwyWmhjbTFsY25OZmNISnBZMlZmWW05aGNtUmZkWE5sY2w5bWJHOTMucG5nIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=ESc4Lkq9BMTp1OVNNvSCfVn3DwQOKYvEB1OiKdeXBcJ~053lD29ErCqoSnlKm34ZpL~RG7WhRX7lcNvANmhTkqgOpO4qCps65h9XsbkCRIxebX8hXKMdNPMV1SIByMRfT-SksuxOS2-hQraCWM3EJYyJDxeDlJ0J-IKhEMTCtf553t9ZSw94aWHHiIYHyf-YtxXniABtyQ08tssTIccYNUsyBZ0fyi5i6oyFhyWWYeQGKFL1-qUePUlNIY0POSX2ieG46ASh7ZHB3Wqw0FxE~TWA6m6o6h4qO1aBENtG3pgu9VLAu4hWrmQlzFe6IFGrI9PvTCZHx6~SkbBGqx6~NQ__)

**Detailed User Flow Steps:**

1.  **User Authentication:** The user initiates interaction by signing up or logging in via Supabase Auth.
2.  **Data Selection:** The user selects a specific crop or region from a dropdown menu to narrow down the price information.
3.  **Data Fetching:** The application fetches the current market prices from the integrated API or the Supabase database based on the user's selection.
4.  **Result Display:** The fetched price data is presented to the user in a clear and concise table and chart format.
5.  **Historical Trend Analysis:** The user can access and view historical price trends for selected crops or regions to aid in decision-making.
6.  **Logout:** The user can securely log out of their session.

### 6. Technical Requirements

The technical foundation of the application is built upon the following components:

-   **Frontend Framework:** React Native (Expo) for developing a single codebase that deploys to both iOS, Android, and web platforms.
-   **Backend Services:** Supabase, an open-source Firebase alternative, providing:
    -   **Authentication:** User management and secure access.
    -   **Database:** PostgreSQL database for structured data storage.
-   **Data Sources:** Integration with external APIs such as the Ministry of Food & Agriculture API or other open data sources for crop price information.
-   **Charting Library:** A suitable charting library (e.g., Recharts for web, Victory Native for React Native) for visualizing price trends.
-   **User Interface:** Responsive design principles applied to ensure optimal viewing and interaction across various device sizes.
-   **Version Control:** GitHub repository for collaborative development and robust version management.
-   **Deployment Platforms:** Vercel for web application hosting and Expo EAS for mobile application builds and distribution.

### 7. System Architecture

The overall system architecture is depicted below, illustrating the interaction between different components:

![System Architecture Diagram](https://private-us-east-1.manuscdn.com/sessionFile/A3PkNw9mH6QlkEVZ59AMrG/sandbox/EAGtHdr7MlLOvmCGKch1XP-images_1755512205596_na1fn_L2hvbWUvdWJ1bnR1L2Zhcm1lcnNfcHJpY2VfYm9hcmRfc3lzdGVtX2FyY2hpdGVjdHVyZQ.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQTNQa053OW1INlFsa0VWWjU5QU1yRy9zYW5kYm94L0VBR3RIZHI3TWxMT3ZtQ0dLY2gxWFAtaW1hZ2VzXzE3NTU1MTIyMDU1OTZfbmExZm5fTDJodmJXVXZkV0oxYm5SMUwyWmhjbTFsY25OZmNISnBZMlZmWW05aGNtUmZjM2x6ZEdWdFgyRnlZMmhwZEdWamRIVnlaUS5wbmciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=j62Jn5MIUbuyJs8TCxnZT9v6CERrP29DQn1sAKxXf29dLfyD1oXnb5f43555H5qjURUTbYMaIn3dwh6R0uc4-U63LcmAL677kGI9ElVoaAd3WDgwELzONrIIMh86vGpWFlAcXoOum8tWDKyQHVpx~v5sABmNSfRC6yT19-0ZiCEE9AwZVCGnUbL7yY0MSr9qBZQ~Tz8ufFP3S3JLFUXV3f0OaRMITZA9tkhGxvRUsue24FD5GvGtJVXgf8HX3vmxXTuS46TWHvS6bLrRuGZvvb73aG8OWOIWI5aosH0bDdFoB6FlRfIydwWSl3-3Tjx6RrURZclq3akxmqvVQ~DjJA__)

**Architectural Overview:**

The system comprises a client-side application (mobile/web) interacting with Supabase backend services and external data sources. The client application handles user interface, data selection, and displays reports. Supabase manages user authentication and stores crop price data, which can be populated from external APIs.

### 8. Database Design

The core data model revolves around the `crop_prices` table, designed to store all relevant information about crop market prices.

**Table: `crop_prices`**

| Column Name   | Data Type | Description                                   | Constraints               |
| :------------ | :-------- | :-------------------------------------------- | :------------------------ |
| `id`          | `uuid`    | Primary key, unique identifier for each price record | Primary Key, UUID, Not Null |
| `crop_name`   | `text`    | Name of the crop (e.g., maize, cassava, tomatoes) | Not Null                  |
| `region`      | `text`    | Region/market where the price data was collected | Not Null                  |
| `price`       | `numeric` | Price per unit (e.g., per kg or per bag)      | Not Null                  |
| `date`        | `timestamp` | Date of the price record                      | Not Null, Default: NOW()  |
| `source`      | `text`    | Data source (e.g., MoFA API, open API, manual upload) | Not Null                  |

**Relationships:**

-   The `crop_prices` table is designed to be self-contained for price data, with `source` indicating the origin of the data.

### 9. Technical Specifications and Code Snippets

This section provides detailed technical specifications for key integrations and includes illustrative code snippets to guide implementation.

#### 9.1. Supabase Authentication

Supabase Auth provides a secure and easy-to-use authentication system. Users can sign up and log in using email and password. The client-side application will interact with Supabase's client library to manage user sessions.

**Example: User Signup (React Native/Expo)**

```javascript
import { supabase } from './supabaseClient'; // Assuming supabaseClient.js is configured

async function signUpNewUser(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    console.error('Error signing up:', error.message);
    return { success: false, message: error.message };
  } else {
    console.log('User signed up:', data.user);
    return { success: true, message: 'Check your email for the confirmation link!' };
  }
}

// Example Usage:
signUpNewUser('test@example.com', 'password123');
```

**Example: User Login (React Native/Expo)**

```javascript
import { supabase } from './supabaseClient';

async function signInWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.error('Error logging in:', error.message);
    return { success: false, message: error.message };
  } else {
    console.log('User logged in:', data.user);
    return { success: true, message: 'Logged in successfully!' };
  }
}

// Example Usage:
signInWithEmail('test@example.com', 'password123');
```

#### 9.2. Supabase Database Operations (Crop Prices)

The application will fetch crop price data from the `crop_prices` table in Supabase, allowing for filtering by crop name and region.

**Example: Fetching Crop Prices (React Native/Expo)**

```javascript
import { supabase } from './supabaseClient';

async function getCropPrices(cropName = null, region = null) {
  let query = supabase
    .from('crop_prices')
    .select('*')
    .order('date', { ascending: false });

  if (cropName) {
    query = query.eq('crop_name', cropName);
  }

  if (region) {
    query = query.eq('region', region);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching crop prices:', error.message);
    return { success: false, message: error.message };
  } else {
    console.log('Crop prices:', data);
    return { success: true, data: data };
  }
}

// Example Usage:
// getCropPrices('maize', 'Accra');
// getCropPrices(null, 'Kumasi'); // Get all crops in Kumasi
// getCropPrices('tomatoes'); // Get tomatoes prices across all regions
```

**Example: Adding a Crop Price Record (Admin Functionality - React Native/Expo)**

```javascript
import { supabase } from './supabaseClient';

async function addCropPrice(cropName, region, price, source) {
  const { data, error } = await supabase
    .from('crop_prices')
    .insert([
      {
        crop_name: cropName,
        region: region,
        price: price,
        source: source,
      },
    ]);

  if (error) {
    console.error('Error adding crop price:', error.message);
    return { success: false, message: error.message };
  } else {
    console.log('Crop price added:', data);
    return { success: true, data: data };
  }
}

// Example Usage (for admin to manually add data or for API ingestion):
// addCropPrice('maize', 'Accra', 150.00, 'MoFA API');
```

#### 9.3. External API Integration (Ministry of Food & Agriculture / Open API)

The application will integrate with external APIs to fetch real-time or near real-time crop price data. The specific API endpoint and data structure will depend on the chosen provider (e.g., Ministry of Food & Agriculture API or a general agricultural commodity API).

**Conceptual API Integration Example (using `fetch`):**

```javascript
async function fetchPricesFromExternalAPI(crop, location) {
  const API_URL = 'https://api.example.com/crop-prices'; // Replace with actual API endpoint
  const API_KEY = 'YOUR_EXTERNAL_API_KEY'; // Replace with your actual API key

  try {
    const response = await fetch(`${API_URL}?crop=${crop}&location=${location}&apiKey=${API_KEY}`);
    const data = await response.json();

    if (response.ok) {
      console.log('External API response:', data);
      // Process data and potentially insert into Supabase 'crop_prices' table
      return { success: true, data: data };
    } else {
      console.error('External API error:', data);
      return { success: false, message: data.message || 'Unknown API error' };
    }
  } catch (error) {
    console.error('Network or API call error:', error);
    return { success: false, message: error.message };
  }
}

// Example Usage:
// fetchPricesFromExternalAPI('maize', 'Accra');
```

#### 9.4. Data Visualization (Charting)

To provide clear insights into price trends, the application will integrate a charting library. For React Native, Victory Native is a popular choice, while Recharts is commonly used for web applications.

**Example: Basic Line Chart for Price Trends with Victory Native (React Native)**

```javascript
import React from 'react';
import { View } from 'react-native';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme } from 'victory-native';

const historicalData = [
  { date: new Date(2025, 0, 1), price: 100 },
  { date: new Date(2025, 0, 8), price: 105 },
  { date: new Date(2025, 0, 15), price: 98 },
  { date: new Date(2025, 0, 22), price: 110 },
  { date: new Date(2025, 0, 29), price: 103 },
];

const PriceTrendChart = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <VictoryChart
        width={350}
        theme={VictoryTheme.material}
        scale={{ x: 'time' }}
      >
        <VictoryAxis
          tickFormat={(x) => x.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          label="Date"
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => (`$${x}`)}
          label="Price ($)"
        />
        <VictoryLine
          data={historicalData}
          x="date"
          y="price"
          style={{
            data: { stroke: "#c43a31" }
          }}
        />
      </VictoryChart>
    </View>
  );
};

export default PriceTrendChart;
```

### 10. Milestones

The project development will proceed in the following weekly milestones:

-   **Week 1: Project Setup & Authentication**
    -   Initialize React Native (Expo) project.
    -   Configure Supabase client and integrate Supabase Auth.
    -   Implement user signup and login functionalities.

-   **Week 2: API Integration & Database Setup**
    -   Integrate with the chosen crop price API (e.g., MoFA API).
    -   Set up the `crop_prices` table in Supabase and implement data ingestion from the API.

-   **Week 3: Filtering, Sorting & Chart Views**
    -   Implement filtering and sorting functionalities for crop names and regions.
    -   Integrate a charting library to display price trends and comparisons.
    -   Develop tabular views for detailed price information.

-   **Week 4: Testing, Deployment & Documentation**
    -   Conduct comprehensive testing (unit, integration, user acceptance).
    -   Deploy web application to Vercel and mobile application via Expo EAS.
    -   Finalize documentation and prepare for presentation.

### 11. Future Enhancements (Roadmap)

-   **Push Notifications:** Alert farmers about significant price changes or market opportunities for their crops.
-   **Predictive Analytics:** Implement basic machine learning models to forecast future price trends.
-   **Farmer-to-Farmer Trading:** Enable direct communication and trading between farmers within the app.
-   **Supply and Demand Insights:** Provide data on regional supply and demand to further inform selling decisions.
-   **Integration with Logistics:** Suggest optimal transport routes or connect farmers with logistics providers.

---

**Author:** Manus AI
**Date:** August 18, 2025


