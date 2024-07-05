import express from "express";
import mongoose from "mongoose";
import { MusicInstrument } from "./models/musicInstrumentModel.js";
import instrumentRoute from "./routes/instrumentRoute.js";
import userRoute from "./routes/userRoutes.js"; 
import cartRoute from "./routes/cartRoutes.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
//




const PORT = 5555;
const app = express();
const mongoDBURL = 'mongodb+srv://root:1234@music-instrument-store.cujn07b.mongodb.net/instrument-collection?retryWrites=true&w=majority';

app.use(fileUpload());
app.use('/public/item', express.static('public/item'));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));


app.use(cookieParser());

app.get('/', (req, res) => {
    console.log(req);
    return res.status(200).send('Welcome');
});

app.use('/instruments', instrumentRoute);
app.use('/users', userRoute);
app.use('/cart', cartRoute);

mongoose.connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Your ss Application App Connected to MongoDB ');

    app.listen(PORT, () => {
        console.log(`App is listening on port: ${PORT}`);
    });
})
.catch(error => {
    console.error(error);
});
