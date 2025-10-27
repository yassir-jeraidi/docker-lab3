const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// GET / : Page d'accueil
app.get('/', (req, res) => {
    res.json({
        message: 'Bienvenue sur l\'application Node.js Dockerisée!',
        welcome: 'Welcome to the Dockerized Node.js App!',
        endpoints: [
            'GET / - Page d\'accueil',
            'GET /api/health - Status de l\'application',
            'GET /api/info - Informations sur l\'environnement',
            'GET /api/time - Heure actuelle'
        ]
    });
});

// GET /api/health : Status de l'application
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// GET /api/info : Informations sur l'environnement
app.get('/api/info', (req, res) => {
    res.json({
        nodeVersion: process.version,
        platform: process.platform,
        architecture: process.arch,
        environment: process.env.NODE_ENV || 'development',
        memory: {
            total: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)}MB`,
            used: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`
        }
    });
});

// GET /api/time : Heure actuelle
app.get('/api/time', (req, res) => {
    const now = new Date();
    res.json({
        timestamp: now.toISOString(),
        date: now.toLocaleDateString('fr-FR'),
        time: now.toLocaleTimeString('fr-FR'),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    });
});

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌍 Access the app at http://localhost:${PORT}`);
});
