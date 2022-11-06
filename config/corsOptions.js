const allowedOrigins = ['https://resume-builder-tpvd.onrender.com/']

const corsOptions = {
   origin: (origin, callback) => {
      allowedOrigins.includes(origin) ? callback(null, true) : callback(new Error('NOT ALLOWED BY CORS'))
   },
   credentials: true,
   optionsSuccessStatus: 200
}

module.exports = corsOptions;
