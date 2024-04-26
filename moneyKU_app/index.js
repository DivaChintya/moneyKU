
const express = require('express');
const router = require('./routers') //index SAMBUNGAN ROUTER  IMPORT
const NotFoundMiddleware = require('./middleware/not-found')
const ErrorHandlerMiddleware = require('./middleware/error-handler')


const app = express();
const port = 3001;

app.use(express.json());
app.use('/api', router); 


app.use(NotFoundMiddleware);// handle apabila URL tidak ditemukan atau salah
app.use(ErrorHandlerMiddleware);//handle Internal Server Error

app.listen(port, () => {
  console.log(`Port Sedang Berjalan di ${port}`);
});



