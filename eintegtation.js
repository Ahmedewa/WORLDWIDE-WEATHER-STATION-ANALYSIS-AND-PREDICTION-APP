                DATABASE[POSTGRESQL] INTEGRATION


3. **Database Integration**:
   - Use PostgreSQL to store historical data:
     ```sql
     CREATE TABLE climate_data (
         id SERIAL PRIMARY KEY,
         region VARCHAR(255),
         year INT,
         deaths INT,
         temperature_anomaly DECIMAL,
         event_details TEXT
     );
     ```

   - Query climate data with `pg`:
     ```javascript
     const { Pool } = require('pg');
     const pool = new Pool({
       user: 'postgres',
       host: 'localhost',
       database: 'weather',
       password: 'password',
       port: 5432
     });

     const getHistoricalData = async (region) => {
       const result = await pool.query(
         'SELECT * FROM climate_data WHERE region = $1',
         [region]
       );
       return result.rows;
     };
     ```

---
