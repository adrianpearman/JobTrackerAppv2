const Company = require("../models/companyModel");

const letters = /^[A-Za-z]+$/;

const updateCompanyContainer = {
  add: async companyName => {
    let companyLetter = companyName.toLowerCase()[0];
    let companyContainer = await Company.findOne({});
    // Adding company name if not already in the array
    if (
      !companyContainer.companyNameContainer.includes(companyName.toLowerCase())
    ) {
      companyContainer.companyNameContainer.push(companyName);
    }
    // Adding company name to indexed company list
    if (companyLetter.match(letters)) {
      // validate whether it isn't already in the row
      if (!companyContainer[companyLetter].includes(companyName)) {
        companyContainer[companyLetter].push(companyName);
      }
    } else {
      // validate whether it isn't already in the row
      if (!companyContainer.number.includes(companyName)) {
        companyContainer.number.push(companyName);
      }
    }
    await Company.updateOne({ _id: companyContainer._id }, companyContainer);
    return companyContainer;
  },
  delete: async companyName => {
    let companyLetter = companyName.toLowerCase()[0];
    let companyContainer = await Company.findOne({});
    // Removing company value from array
    let updatedCompanyNameContainer = companyContainer.companyNameContainer.filter(
      company => {
        return company.indexOf(companyName) === -1;
      }
    );
    companyContainer.companyNameContainer = updatedCompanyNameContainer;
    // Deleting company name to indexed company list
    if (companyLetter.match(letters)) {
      let updateCompanyLetterContainer = companyContainer[companyLetter].filter(
        company => {
          return company.indexOf(companyName) === -1;
        }
      );
      companyContainer[companyLetter] = updateCompanyLetterContainer;
    } else {
      let updateCompanyNumberContainer = companyContainer.number.filter(
        company => {
          return company.indexOf(companyName) === -1;
        }
      );
      companyContainer.number = updateCompanyNumberContainer;
    }
    await Company.updateOne({ _id: companyContainer._id }, companyContainer);
    return companyContainer;
  }
};

module.exports = updateCompanyContainer;
