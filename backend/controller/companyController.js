// NPM Modules
const { Application, Company } = require("../models");

//
const companyController = {
  getApplicationsByCompany: async (req, res) => {
    const { companyUuid } = req.query;
    try {
      if (!companyUuid || companyUuid === undefined) {
        throw new Error("Company ID is missing");
      }

      const company = await Company.findOne({
        where: { uuid: companyUuid },
        include: {
          as: "applications",
          model: Application,
        },
      });

      res.send({
        company: company,
        message: "Successfully returned all applications",
        success: true,
      });
    } catch (error) {
      res.status(400).send({
        company: null,
        message: error.message || `Unable to find company: ${companyUuid}`,
        success: false,
      });
    }
  },
};

module.exports = companyController;
