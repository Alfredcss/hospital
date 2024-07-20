const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 4000;

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Servir archivos de 'node_modules'
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Rutas para las páginas HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/index.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/home.html'));
});


app.post('/login', (req, res) => {
    // Aquí manejarías el envío del formulario y la autenticación
    res.redirect('/home');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
