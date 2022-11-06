const allowedOrigins = ['https://resume-builder-u0ip.onrender.com']

const corsOptions = {
   origin: (origin, callback) => {
      allowedOrigins.includes(origin) || !origin ? callback(null, true) : callback(new Error('NOT ALLOWED BY CORS'))
   },
   credentials: true,
   optionsSuccessStatus: 200
}

module.exports = corsOptions;
