import express from 'express';
import cors from 'cors';
import * as firebaseAdmin from 'firebase-admin';
import serviceAccount from './common/bunk-dev-test-firebase-adminsdk-vfeaa-48519ad9f5.json';
import { getAddress } from './data-access/address-repository';
import bodyParser from 'body-parser';
const app = express();
const port = 3001;

const _serviceAccount: object = serviceAccount;

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(_serviceAccount),
  databaseURL: "https://assessment-backend-default-rtdb.asia-southeast1.firebasedatabase.app"
});

app.use(cors());
app.use(express.json())

app.get('/get', async (req, res) => {
  const data = await getAddress();
  if (data) {
    console.log(data)
    res.send(data);
  }
});

app.post('/add', (req, res) => {
  // console.log(req);
  const params = JSON.parse(req.body.mjson);
  console.log(params);
  if(params)
  {
    const address = params.address;
    console.log(address);
    const lat = params.coordinates.lat;
    const lng = params.coordinates.lng;
    console.log(lat, lng);
    const db = firebaseAdmin.database();
    const ref = db.ref("addresses");
    const addressRef = ref.child(address);
    addressRef.set({
      address: address,
      coordinates: {
        lat: lat,
        lng: lng
      }
    })
  }
  else
    res.send("Invalid request");
})

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;
