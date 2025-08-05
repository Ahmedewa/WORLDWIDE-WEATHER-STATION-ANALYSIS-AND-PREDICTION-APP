               POSTGRESQL DATABASE

### **Elaborate on the Database Schema**

#### **Problem**:  
The app needs to store and query large datasets (e.g., NOAA GSOD, real-time weather data) efficiently.

#### **Solution**:

Design a normalized schema to support scalability and fast querying.

** PostgreSQL Schema**:
```sql
-- Table to store real-time weather data
CREATE TABLE weather_data (
    id SERIAL PRIMARY KEY,
    location VARCHAR(255),
    temperature DECIMAL,
    humidity DECIMAL,
    wind_speed DECIMAL,
    observation_time TIMESTAMP
);

-- Table to store historical climate data
CREATE TABLE historical_climate (
    id SERIAL PRIMARY KEY,
    region VARCHAR(255),
    year INT,
    temperature_anomaly DECIMAL,
    event_type VARCHAR(255),
    deaths INT,
    details TEXT
);

-- Table for disaster predictions
CREATE TABLE disaster_predictions (
    id SERIAL PRIMARY KEY,
    region VARCHAR(255),
    disaster_type VARCHAR(255),
    prediction_date TIMESTAMP,
    confidence_score DECIMAL
);

-- Indexes for faster queries
CREATE INDEX idx_location ON weather_data(location);
CREATE INDEX idx_region ON historical_climate(region);
CREATE INDEX idx_prediction_date ON disaster_predictions(prediction_date);
```



---
