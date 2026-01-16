const Lead = require("../models/Lead");

// GET all leads with search, filter, pagination
exports.getLeads = async (req, res) => {
  const { search, status, stage, page = 1, limit = 10 } = req.query;

  let query = {};

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }
  if (status) query.status = status;
  if (stage) query.stage = stage;

  const leads = await Lead.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Lead.countDocuments(query);

  res.json({ total, leads });
};

// GET single lead
exports.getLeadById = async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  res.json(lead);
};
