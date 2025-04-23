// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const apiController = require('./controllers/apicontroller');

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// app.use('/api', apiController);


// app.use(express.static('frontend'));

// const PORT = process.env.PORT || 3300;
// app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));


const express = require('express');
const cors    = require('cors');
const path    = require('path');
require('dotenv').config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rutas API
const apiController = require('./controllers/apicontroller');
app.use('/api', apiController);

// servir archivos estáticos de /frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// ruta raíz: mostrar login.html cuando alguien visite "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'login.html'));
});

// opcional: si quieres manejar específicamente /login.html
// app.get('/login.html', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend', 'login.html'));
// });

// si usas fallback SPA, hazlo después de estas rutas, o elimínalo
// app.get('*', (req, res) => { … });

const PORT = process.env.PORT || 3300;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
