import express from 'express'
import axios from 'axios'
import morgan from 'morgan'

const app = express()
app.use(express.json())
app.use(morgan('dev'))

let token;

async function validateToken(req, res, next) {
  // const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  try {
    const response = await axios.get(`http://localhost:3000/validate/${token}`);

    next();
  } catch (err) {
    res.status(401).json({ error: "invalid token" });
  }

}

app.get('/location', validateToken, (req, res) => {
  const gpsData = {
    latitude: -23.55052,
    longitude: -46.63331,
    altitude: "760m",
    speed: "50.5 km/h",
    heading: "230.0°",
    timestamp: new Date().toISOString(),
    accuracy: {
      horizontal: "5.0m",
      vertical: "3.0m"
    }
  };

  res.status(200).json({ gpsData })
})

app.post("/login", async (req, res) => {
  const username = req.body.username
  const password = req.body.password

  try {
    const response = await axios.post('http://localhost:3000/login', { username, password });

    if (response.status !== 200) {
      return res.status(401).json({ error: "invalid credentials" });
    }

    token = response.data.sessionToken;

    return res.status(200).json({ data: response.data });
  } catch (error) {
    return res.status(401).json({ error: "invalid credentials" });
  }
})

app.listen(3001, () => {
  console.log('Server is running on port 3001')
})