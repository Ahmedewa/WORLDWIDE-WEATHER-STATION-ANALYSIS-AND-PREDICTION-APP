# WORLDWIDE-WEATHER-STATION-ANALYSIS-AND-PREDICTION-APP
(Using Angullar.js)

A)AIMS AND GOALS OF THE PROJECT:
The aim of the project is to help diversify the predictive models already in
existance using the 'Angullar.js' framework to create the App
'WORLD-WEATHER-STATION-ANALYSIS-AND-PREDICTION-APP.Rather tha man , 
his activities , projects being left at the'mercy' of the weather.

B)PREREQUISITES/CONTENTS:

B(i). TECH STACK: 

-MEDIA: -Diagrams (Flow charts).

TECH STACK[WORLD-WIDE-WEATHER-STATION-ANALYSIS-AND-PREDICTION-APP-USING-ANGULLAR.JS]

weather-app
│
├── /frontend (Angular App)
│   ├── /src
│   │   ├── /app
│   │   │   ├── /components
│   │   │   ├── /services
│   │   │   └── app.module.ts
│   │   └── index.html
│   └── angular.json
│
├── /backend (Node.js App)
│   ├── /models
│   │   └── User.js
│   ├── /routes
│   │   └── api.js
│   ├── server.js
│   └── package.json
│
├── /docker (Dockerfiles and configurations)
│
├── /github-actions (GitHub Actions workflows)
│   └── main.yml
│
└── docker-compose.yml



B.(ii)DEVELOPMENT- ENVIRONMENT SETUP :
1. Environmental Setup

#### Required Tools and Libraries

- **Programming Language**: Python
- **Framework**: Flask (for web application)
- **Database**: SQLite or any preferred database
- **JSON Handling**: `json` library (built-in)
- **Docker**: For containerization
- **GitHub Actions**: For CI/CD

#### Installation Commands

```bash
# Install Flask
pip install Flask

# Install SQLite (if not available)
sudo apt-get install sqlite3

# Install Docker (follow Docker installation documentation)
```
B.(iii) IDEs: VSCode, Vim, Jupyter Notebook, Notepad++, PyCharm.



C) CODE :

- Source Code file (Src File):

Here’s a simple Flask application that serves weather data and integrates with JSON.

#### Directory Structure

```
weather_station/
│
├── app.py
├── requirements.txt
├── Dockerfile
└── .github/
    └── workflows/
        └── ci.yml
```

#### `app.py`

```python
from flask import Flask, jsonify, request
import sqlite3
import json

app = Flask(__name__)

# Initialize SQLite database
def init_db():
    conn = sqlite3.connect('weather.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS weather (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            location TEXT NOT NULL,
            temperature REAL NOT NULL,
            humidity REAL NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

@app.route('/weather', methods=['POST'])
def add_weather():
    data = request.json
    location = data['location']
    temperature = data['temperature']
    humidity = data['humidity']
    
    conn = sqlite3.connect('weather.db')
    cursor = conn.cursor()
    cursor.execute('INSERT INTO weather (location, temperature, humidity) VALUES (?, ?, ?)',
                   (location, temperature, humidity))
    conn.commit()
    conn.close()
    
    return jsonify({"message": "Weather data added"}), 201

@app.route('/weather', methods=['GET'])
def get_weather():
    conn = sqlite3.connect('weather.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM weather')
    rows = cursor.fetchall()
    conn.close()
    
    weather_data = [{"id": row[0], "location": row[1], "temperature": row[2], "humidity": row[3]} for row in rows]
    return jsonify(weather_data)

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
```

#### `requirements.txt`

```
Flask
```


 1. Authentication & Authorization (Sign-in Users)

### Backend: Node.js with JWT

1. **Install Required Packages**:
   ```bash
   npm install jsonwebtoken bcrypt express-session passport passport-jwt
   ```

2. **User Model** (e.g., `models/User.js`):
   ```javascript
   const mongoose = require('mongoose');

   const userSchema = new mongoose.Schema({
     username: { type: String, required: true, unique: true },
     password: { type: String, required: true }
   });

   module.exports = mongoose.model('User', userSchema);

3. **Authentication Logic** (`server.js`):
   ```javascript
   const express = require('express');
   const mongoose = require('mongoose');
   const bcrypt = require('bcrypt');
   const jwt = require('jsonwebtoken');
   const User = require('./models/User');

   const app = express();
   app.use(express.json());

   mongoose.connect('mongodb://localhost:27017/weatherApp', { useNewUrlParser: true, useUnifiedTopology: true });

   // Register User
   app.post('/api/register', async (req, res) => {
     const hashedPassword = await bcrypt.hash(req.body.password, 10);
     const user = new User({ username: req.body.username, password: hashedPassword });
     await user.save();
     res.status(201).send('User registered');
  });

   // Login User
   app.post('/api/login', async (req, res) => {
     const user = await User.findOne({ username: req.body.username });
     if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
       return res.status(401).send('Invalid credentials');
     }

     const token = jwt.sign({ id: user._id }, 'your_jwt_secret');
     res.json({ token });
   });

   app.listen(5000, () => console.log('Server running on port 5000'));
   ```

### Frontend: Angular 

1. **Login Component** (`login.component.ts`):
   ```typescript
   import { Component } from '@angular/core';
   import { HttpClient } from '@angular/common/http';

   @Component({
     selector: 'app-login',
     templateUrl: './login.component.html',
   })
   export class LoginComponent {
     username: string = '';
     password: string = '';

     constructor(private http: HttpClient) {}

     login() {
       this.http.post('http://localhost:5000/api/login', { username: this.username, password: this.password })
         .subscribe((response: any) => {
           localStorage.setItem('token', response.token);
           alert('Login successful!');

```
typescript
   import { Component } from '@angular/core';
   import { HttpClient } from '@angular/common/http';

   @Component({
     selector: 'app-login',
     templateUrl: './login.component.html',
   })
   export class LoginComponent {
     username: string = '';
     password: string = '';

     constructor(private http: HttpClient) {}

     login() {
       this.http.post('http://localhost:5000/api/login', { username: this.username, password: this.password })
         .subscribe((response: any) => {
           localStorage.setItem('token', response.token);
           alert('Login successful!');


-Step 1: Setting Up the Angular Project :
We use Angular CLI to set up the new Angular project. 
This will scaffold a basic Angular application with all necessary files 
and dependencies.

We install Angular CLI  using: `npm install -g @angular/cli`.
Open our terminal and run the following command to create a new Angular app:
Navigate to the project directory using: `cd weather-app`.
Start the development server using the command: `ng serve --open`.
ng new weather-app

-Step 2: We generate the Weather Component
Creating  a new component for displaying weather information using Angular CLI.

-Generate a new component named `weather` using Angular CLI:
Update `app.component.html` to use the new weather component by adding: `<app-weather></app-weather>`.
Implement the logic for displaying weather data in `weather.component.ts`.
ng generate component weather

Step 3: We set Up the Weather Service
We create a service to handle the HTTP requests to the weather API and 
provide data to the weather component.

-We generate a new service named `weather` using Angular CLI:
Import the `HttpClientModule` in `app.module.ts` to use the HTTP client.
Add the logic to fetch weather data from the API in `weather.service.ts`.
ng generate service weather

Step 4: We implement Weather Data Fetching
Use the weather service to fetch data from the weather API and display it in the component.

-Inject the weather service in `weather.component.ts`.
We create methods to fetch and display weather data based on user input.
Handle errors and display appropriate messages if the city is not found.
// src/app/weather/weather.component.ts
  import { Component } from '@angular/core';
  import { WeatherService } from '../weather.service';
  
  @Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css']
  })
  export class WeatherComponent {
    city: string = '';
    weatherData: any;
    error: string = '';
  
    constructor(private weatherService: WeatherService) {}
  
    getWeather(): void {
      this.weatherService.getWeather(this.city).subscribe(
        (data) => {
          this.weatherData = data;
          this.error = '';
        },
        (error) => {
          this.error = 'City not found!';
          this.weatherData = null;
        }
      );
    }
  }

Step 5: We update the HTML Template for Displaying Weather Data
Update the HTML template of the weather component to display the fetched weather 
data and handle user input.

We update `weather.component.html` to include input fields and buttons for user interaction.
Display weather information such as temperature, humidity, and wind speed.
Show an error message if the city is not found or the input is invalid.
<div class=\"weather-container\">
    <h2>Weather App</h2>
    <input
      type=\"text\"
      placeholder=\"Enter city name\"
      [(ngModel)]=\"city\"
      class=\"city-input\"
    />
    <button (click)=\"getWeather()\" class=\"get-weather-btn\">Get Weather</button>
  
    <div *ngIf=\"weatherData\" class=\"weather-info\">
      <h3>{{ weatherData.name }}, {{ weatherData.sys.country }}</h3>
      <p>Temperature: {{ weatherData.main.temp }} &#8451;</p>
      <p>Weather: {{ weatherData.weather[0].description }}</p>
      <p>Humidity: {{ weatherData.main.humidity }}%</p>
      <p>Wind Speed: {{ weatherData.wind.speed }} m/s</p>
    </div>
  
    <div *ngIf=\"error\" class=\"error-message\">{{ error }}</div>
  </div>
Step 6: Style the Weather Component
Add CSS styles to enhance the appearance of the weather component and make it responsive.

We reate and update the `weather.component.css` file with styles for the weather component.
Add styles for the container, input fields, buttons, and displayed weather data.
Ensure the layout is responsive and visually appealing.
.weather-container {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .city-input {
    width: 80%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .get-weather-btn {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .get-weather-btn:hover {
    background-color: #0056b3;
  }
  
  .weather-info {
    margin-top: 20px;
    background-color: #e3f2fd;
    padding: 20px;
    border-radius: 8px;
  }
  
  .error-message {
    color: red;
    margin-top: 20px;
  }


Step 7: Run and Test the Application
We run the application to test the weather component and ensure all features 
work as expected.

We use the following command to start the development server:
Open the application in the browser at `http://localhost:4200/`.
Test the application by entering different city names and checking the displayed weather information.
Handle any errors or bugs that may arise during testing.
ng serve



Weather Station Application

1. Frontend: Angular Weather App

 Step 1: Set Up the Angular Project

1. **Install Angular CLI** (if not already installed):
   ```bash
   npm install -g @angular/cli
   ```

2. **Create a new Angular app**:
   ```bash
   ng new weather-app
   cd weather-app
   ng serve --open
   ```

 Step 2: Generate the Weather Component

1. **Create a new component**:
   ```bash
   ng generate component weather
   ```

2. **Update `app.component.html`**:
   ```html
   <app-weather></app-weather>
   ```

#### Step 3: Set Up the Weather Service

1. **Generate a new service**:
   ```bash
   ng generate service weather
   ```

2. **Implement the Weather Service** (`weather.service.ts`):
   ```typescript
   import { Injectable } from '@angular/core';
   import { HttpClient } from '@angular/common/http';
   import { Observable } from 'rxjs';

   @Injectable({
     providedIn: 'root'
   })
   export class WeatherService {
     private apiUrl = 'https://api.openweathermap.org/data/2.5/weather?appid=YOUR_API_KEY&units=metric';

     constructor(private http: HttpClient) {}

     getWeather(city: string): Observable<any> {
       return this.http.get(`${this.apiUrl}&q=${city}`);
     }
   }
   ```

#Step 4: Implement Weather Data Fetching

1. **Update `weather.component.ts`**:
   ```typescript
   import { Component } from '@angular/core';
   import { WeatherService } from '../weather.service';

   @Component({
     selector: 'app-weather',
     templateUrl: './weather.component.html',
     styleUrls: ['./weather.component.css']
   })
   export class WeatherComponent {
     city: string = '';
     weatherData: any;
     error: string = '';

     constructor(private weatherService: WeatherService) {}

     getWeather(): void {
       this.weatherService.getWeather(this.city).subscribe(
         data => {
           this.weatherData = data;
           this.error = '';
         },
         error => {
           this.error = 'City not found!';
           this.weatherData = null;
         }
       );
     }
   }
   ```

# Step 5: Update the HTML Template

**Update `weather.component.html`**:
```html
<div class="weather-container">
  <h2>Weather App</h2>
  <input type="text" placeholder="Enter city name" [(ngModel)]="city" class="city-input" />
  <button (click)="getWeather()" class="get-weather-btn">Get Weather</button>

  <div *ngIf="weatherData" class="weather-info">
    <h3>{{ weatherData.name }}, {{ weatherData.sys.country }}</h3>
    <p>Temperature: {{ weatherData.main.temp }} &#8451;</p>
    <p>Weather: {{ weatherData.weather[0].description }}</p>
    <p>Humidity: {{ weatherData.main.humidity }}%</p>
    <p>Wind Speed: {{ weatherData.wind.speed }} m/s</p>
  </div>

  <div *ngIf="error" class="error-message">{{ error }}</div>
</div>
```

#Step 6: Style the Weather Component

**Update `weather.component.css`**:
```css
.weather-container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.city-input {
  width: 80%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.get-weather-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.get-weather-btn:hover {
  background-color: #0056b3;
}

.weather-info {
  margin-top: 20px;
  background-color: #e3f2fd;
  padding: 20px;
  border-radius: 8px;
}

.error-message {
  color: red;
  margin-top: 20px;
}
```

#Step 7: Run and Test the Application

Run the application to test the weather component:
```bash
ng serve
```
We open the application in the browser at `http://localhost:4200/` 
and test it by entering different city names.

---

2. Integrating with Backend Technologies

Backend Setup

1. **Node.js with Express**: We create a new Node.js application.
2. **Install Required Packages**:
   ```bash
   npm init -y
   npm install express cors mongoose dotenv jsonwebtoken bcrypt
   ```

3. **Create Basic Server** (`server.js`):
   ```javascript
   const express = require('express');
   const mongoose = require('mongoose');
   const cors = require('cors');
   const app = express();
   const PORT = process.env.PORT || 5000;

   app.use(cors());
   app.use(express.json());

   // Connect to MongoDB
   mongoose.connect('mongodb://localhost:27017/weatherApp', { useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => console.log('MongoDB connected'))
     .catch(err => console.error(err));

   app.get('/', (req, res) => {
     res.send('Welcome to the Weather API');
   });

   app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
   });
   ```

API Integration

1. **Create Weather API**: Create an endpoint within our Node.js server to
2. fetch weather data from an external API and store it in MongoDB.

3. **Implement RabbitMQ for Notifications**:
   ```bash
   npm install amqplib
   ```

**Basic RabbitMQ Producer Example**:
```javascript
const amqp = require('amqplib');

async function sendNotification(message) {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'weatherNotifications';

  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(message));
  console.log("Notification sent:", message);
  await channel.close();
}
```

3. **Set Up Nginx**: Configure Nginx as a load balancer for our application.

4. **Database Integration**: Use MongoDB or PostgreSQL to store user data and weather information.

5. **Processing with Apache Spark**:

6. Set up Spark for future analytics processing.



4).DEBBUGGING: -Debugging Technique.

-Testing and Debugging

1. **Postman for API Testing**: Use Postman to test our API endpoints.
2. **cURL for Command-Line Requests**: Test our API from the command line using
 cURL.

-Error Handling

1. **Use try-catch blocks** for all async functions to handle errors gracefully:
   ```javascript
   try {
     // Your code here
   } catch (error) {
     console.error('Error:', error);
   }
   ```

2. **Utilize nodemon** for hot-reloading during development:
   ```bash
   npm install --save-dev nodemon
   ```

3. **Debugging**: Use the Node.js debugger or tools like `debug` to inspect values.


We configure the Nginx Load Balancer

### Nginx Configuration

1. **Install Nginx**:
   ```bash
   sudo apt-get install nginx
   ```

2. **Create a Configuration File** (`/etc/nginx/sites-available/weather_app`):
   ```nginx
   server {
       listen 80;

       location / {
           proxy_pass http://localhost:5000;  # Your Node.js server
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. **Enable the Configuration**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/weather_app /etc/nginx/sites-enabled/
   sudo systemctl restart nginx
   ```

## 3. Set Up RabbitMQ for Weather Notifications

### Install RabbitMQ

1. **Install RabbitMQ**:
   ```bash
   sudo apt-get install rabbitmq-server
   ```

2. **Start RabbitMQ Server**:
   ```bash
   sudo systemctl start rabbitmq-server
   ```

### RabbitMQ Producer Example for Notifications

1. **Producer Code** (`notifications.js`):
   ```javascript
   const amqp = require('amqplib');

   async function sendNotification(message) {
     const connection = await amqp.connect('amqp://localhost');
     const channel = await connection.createChannel();
     const queue = 'weatherNotifications';

     await channel.assertQueue(queue, { durable: true });
     channel.sendToQueue(queue, Buffer.from(message));
     console.log('Notification sent:', message);
     await channel.close();
   }

   sendNotification('Weather Alert: Storm is coming!');
   ```

 4. Using Various Technologies/microservies components in the App

### 4a. Webhooks

**Webhook Example**:
1. **Set Up a Simple Webhook**:
   ```javascript
   app.post('/webhook', (req, res) => {
     console.log('Webhook received:', req.body);
     res.status(200).send('Webhook received');
   });
   ```

4b. Axios

**Using Axios in Angular**:
1. **Install Axios**:
   ```bash
   npm install axios
   ```

2. **Axios Example**:
   ```typescript
   import axios from 'axios';

   axios.get('http://localhost:5000/api/data')
     .then(response => console.log(response.data))
     .catch(error => console.error(error));
   ```

 4c. Failure and Re-entry Framework

**Example Retry Logic**:
```javascript
async function fetchDataWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Fetch failed, retrying...', error);
      if (i === retries - 1) throw error;
    }
  }
}
```

4d. Security Protocols

#### i. Helmet.js Frontend

**Install Helmet**:
```bash
npm install helmet
```

**Usage in Express**:
```javascript
const helmet = require('helmet');
app.use(helmet());
```

ii. Passport.js Backend

**Install Passport**:
```bash
npm install passport passport-jwt
```

**Usage**:
```javascript
const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
};

passport.use(new Strategy(opts, async (jwt_payload, done) => {
  const user = await User.findById(jwt_payload.id); // Find user
  return user ? done(null, user) : done(null, false);
}));

app.use(passport.initialize());
```

iii. Rate Limiting

**Install Express Rate Limit**:
```bash
npm install express-rate-limit
```

**Usage**:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.'
});

app.use('/api/', limiter);
```


2. Importance of JWT's Secret Key in Security

The secret key used in JWT signing is crucial for ensuring the integrity and
authenticity of the token. If the key is compromised, anyone can generate 
valid tokens.

 Code

```javascript
const jwt = require('jsonwebtoken');

// Role of secret key
const secretKey = 'your_jwt_secret'; // Keep this secure!

// Sign a token
const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });

// Verify a token
jwt.verify(token, secretKey, (err, decoded) => {
  if (err) {
    console.error('Token verification failed:', err);
  } else {
    console.log('Decoded payload:', decoded);
  }
});
```


4).DEBBUGGING: -Debugging Technique.


iv. Error Handling

**Error Handling Middleware**:
```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

#### v. Postman for Endpoint API

1. **Test Your API**: Use Postman to send requests to your endpoints (e.g., POST to `/api/login`).

#### vi. cURL for Command-Line Requests

1. **Example cURL Command**:
   ```bash
   curl -X POST http://localhost:5000/api/login -H "Content-Type: application/json" -d '{"username":"testuser","password":"testpass"}'
   ```


3. Start and Build Using JSON Packages

To run the application:

1. **Run the Flask Application**:
   ```bash
   python app.py
   ```

2. **Add Weather Data** (via `curl`):
   ```bash
   curl -X POST http://127.0.0.1:5000/weather -H "Content-Type: application/json" -d '{"location": "New York", "temperature": 75, "humidity": 60}'
   ```

3. **Get Weather Data**:
   ```bash
   curl http://127.0.0.1:5000/weather
   ```


                               ADVANTAGES
          Advantages of a Weather Station App in Angular.js
- Single-Page Application: Angular.js enables you to build single-page applications with different views using routes and components. This architecture makes your app more efficient and scalable.
- Model-View-Controller (MVC) Pattern: Angular.js follows the MVC pattern, dividing applications into different but connected parts. This allows for parallel development and makes your code more maintainable.
- Responsive Design: With Bootstrap integration, our weather app can adapt to various devices, providing a seamless user experience across desktops, tablets, and mobile phones.
- Easy Data Binding: Angular.js simplifies data binding, reducing the amount of code you need to write and maintain. This makes it ideal for real-time data-driven applications like weather stations.
- Large Community Support: As a popular framework, Angular.js has extensive community support, resources, and libraries, making development and troubleshooting easier.



5).COMMON PITFALLS/PROBLEMS/DISADVANTAGES:

-Disadvantages of a Weather Station App in Angular.js
- Steep Learning Curve: Angular.js has a complex architecture and syntax, which can be challenging for beginners to learn and master.
- Performance Issues: Large-scale Angular.js applications can experience performance issues if not optimized properly, which may impact the user experience.
- Security Concerns: As with any client-side framework, Angular.js applications are vulnerable to security threats like cross-site scripting (XSS) and cross-site request forgery (CSRF).

                     REAL-LIFE EXAMPLES
- Dark Sky: A popular weather app that provides hyperlocal weather forecasts, Dark Sky utilizes a robust front-end framework to deliver real-time weather data and alerts.
- The Weather Channel: The official app of The Weather Channel offers detailed weather forecasts, radar maps, and severe weather alerts, showcasing the importance of responsive design and real-time data updates.
- Weather Underground: This app provides detailed weather forecasts, weather radar, and severe weather alerts, demonstrating the potential of Angular.js in building complex weather applications ¹.




6).CONCLUSION:
Long are the days when man could'nt predict his activities, and future movements , due to the lack of knowledge of the weather. 
Those days of the 'Rain Maker' , and the'Shaman or Witch Doctors', where such activites , were at the mercy of such individuals.
Thanks to the use of 'predictive Models', like the 'WORLD-WIDE-STATION-ANALYSIS-AND-PREDICTION-APP'
(USING ANGULLAR.JS), and multiple weather stations on earth , and Satellites hovering
over the surface of the earth in space , severe weather 
disruptions , such as 'Hurricanes,Tornados, Tsunami's,violent storms , and ocean surges,
are predicted acurately,in advance and warnings  issued for the safety of people
activities (also, movement of Airplanes, Ships) and properties.
However, can man use predictive Models to predict ' Earthquakes'? We hope we will see such in the near future!
Such advances will also prevent a lot of calamities.

     
