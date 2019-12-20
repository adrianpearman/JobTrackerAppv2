const MONGOURI = {
  DEV: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds161391.mlab.com:61391/job-app-tracker-dev`,
  PROD: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds161391.mlab.com:61391/job-app-tracker-prod`
};

module.exports = MONGOURI;
