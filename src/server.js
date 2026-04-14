require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const { swaggerSpec } = require('./swagger');
const { errorHandler } = require('./middleware/error.middleware');

const authRoutes = require('./routes/auth.routes');
const movieRoutes = require('./routes/movies.routes');
const watchlistRoutes = require('./routes/watchlists.routes');
const reviewRoutes = require('./routes/reviews.routes');

const app = express();
app.use(express.json());

app.use('/api-docs', ...swaggerUi.serveFiles(swaggerSpec), swaggerUi.setup(swaggerSpec));
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/watchlists', watchlistRoutes);
app.use('/api/reviews', reviewRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
