           APACHE SPARK


## 🔥 4. Apache Spark Middleware

**Tool**: Apache Spark + PySpark  
**Use Case**: Analyze historical weather data, detect climate patterns, and run ML models.

### Spark Job:
```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("ClimateAnalytics").getOrCreate()
df = spark.read.csv("weather_100_years.csv", header=True, inferSchema=True)
df.groupBy("region").avg("temperature").show()
```

🔧 *Run this job on a Spark cluster or integrate with your backend via
REST APIs.*

---
