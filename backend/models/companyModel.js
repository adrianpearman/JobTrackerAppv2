const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanyDataSchema = new Schema({
  companyNameContainer: {
    type: Array,
    default: []
  },
  a: { type: Array, default: [] },
  b: { type: Array, default: [] },
  c: { type: Array, default: [] },
  d: { type: Array, default: [] },
  e: { type: Array, default: [] },
  f: { type: Array, default: [] },
  g: { type: Array, default: [] },
  h: { type: Array, default: [] },
  i: { type: Array, default: [] },
  j: { type: Array, default: [] },
  k: { type: Array, default: [] },
  l: { type: Array, default: [] },
  m: { type: Array, default: [] },
  n: { type: Array, default: [] },
  o: { type: Array, default: [] },
  p: { type: Array, default: [] },
  q: { type: Array, default: [] },
  r: { type: Array, default: [] },
  s: { type: Array, default: [] },
  t: { type: Array, default: [] },
  u: { type: Array, default: [] },
  v: { type: Array, default: [] },
  w: { type: Array, default: [] },
  x: { type: Array, default: [] },
  y: { type: Array, default: [] },
  z: { type: Array, default: [] },
  number: { type: Array, default: [] }
});

const CompanyData = mongoose.model("CompanyDatas", CompanyDataSchema);

module.exports = CompanyData;
