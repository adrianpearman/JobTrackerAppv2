// Models
const { Application, Company } = require("../databases/sql/models");

const companyController = {
  getApplicationsByCompany: async (req, res) => {
    // Destructuring the request query
    const { companyUuid } = req.query;
    try {
      // Throwing error if no company uuid
      if (!companyUuid || companyUuid === undefined) {
        throw new Error("Company ID is missing");
      }
      // Retrieving the company and associated applications
      const company = await Company.findOne({
        where: { uuid: companyUuid },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          as: "applications",
          model: Application,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
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
  getCompanies: async (req, res) => {
    try {
      const companies = await Company.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      res.send({
        companies: companies,
        msg: "Successfully retrieved platforms",
        success: true,
      });
    } catch (error) {
      res.status(404).send({
        companies: null,
        msg: error.msg,
        success: false,
      });
    }
  },
};

module.exports = companyController;
