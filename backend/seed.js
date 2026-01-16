const mongoose = require("mongoose");
const faker = require("faker");
const Lead = require("./models/Lead");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

const seedLeads = async () => {
  await Lead.deleteMany();

  let leads = [];
  for (let i = 0; i < 500; i++) {
    leads.push({
      name: faker.name.findName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      source: faker.random.arrayElement(["Website", "Ads", "Referral"]),
      status: faker.random.arrayElement(["New", "Contacted", "Converted"]),
      stage: faker.random.arrayElement(["Cold", "Warm", "Hot"])
    });
  }

  await Lead.insertMany(leads);
  console.log("500 Leads Seeded");
  process.exit();
};

seedLeads();
