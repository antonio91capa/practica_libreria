module.exports = {
   port: process.env.PORT || 5000,
   database_url: process.env.DATABASE_URL || 'mongodb://localhost:27017/libreria',
   jwt_secret: process.env.JWT_SECRET || 's3cr3t0'
}