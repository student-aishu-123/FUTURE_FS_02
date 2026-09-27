const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Lead = require('../models/Lead');

dotenv.config();

const sampleLeads = [
  {
    fullName: 'Alexander Wright',
    email: 'alex.wright@techinnovations.io',
    phone: '+1 (555) 234-5678',
    company: 'Tech Innovations Inc',
    source: 'LinkedIn',
    status: 'New',
    priority: 'High',
    notes: 'Interested in enterprise tier subscription. Requested demo next Tuesday.',
  },
  {
    fullName: 'Sophia Martinez',
    email: 's.martinez@apexsolutions.com',
    phone: '+1 (555) 876-5432',
    company: 'Apex Solutions',
    source: 'Website',
    status: 'Contacted',
    priority: 'Medium',
    notes: 'Had introductory call. Sent pricing proposal deck.',
  },
  {
    fullName: 'Marcus Vance',
    email: 'marcus@vancelogistics.net',
    phone: '+1 (555) 345-6789',
    company: 'Vance Logistics',
    source: 'Referral',
    status: 'In Progress',
    priority: 'High',
    notes: 'Contract under review by legal team. Expected close end of month.',
  },
  {
    fullName: 'Emily Chen',
    email: 'e.chen@quantumdigital.com',
    phone: '+1 (555) 901-2345',
    company: 'Quantum Digital',
    source: 'Email Campaign',
    status: 'Converted',
    priority: 'High',
    notes: 'Signed 12-month annual contract for 50 seats!',
  },
  {
    fullName: 'David Miller',
    email: 'd.miller@legacyretail.org',
    phone: '+1 (555) 432-1098',
    company: 'Legacy Retail',
    source: 'Cold Call',
    status: 'Lost',
    priority: 'Low',
    notes: 'Budget frozen for Q3/Q4. Follow up next year.',
  },
  {
    fullName: 'Olivia Taylor',
    email: 'olivia@nexuscloud.co',
    phone: '+1 (555) 654-9870',
    company: 'Nexus Cloud Services',
    source: 'Event',
    status: 'New',
    priority: 'Medium',
    notes: 'Met at Cloud Expo booth. Wants API documentation.',
  },
  {
    fullName: 'Ethan Hunt',
    email: 'ethan@imftech.com',
    phone: '+1 (555) 111-2233',
    company: 'IMF Tech',
    source: 'Referral',
    status: 'Contacted',
    priority: 'High',
    notes: 'Requires high-security custom integration.',
  },
  {
    fullName: 'Isabella Rossi',
    email: 'isabella@milanodesign.it',
    phone: '+39 02 5551 234',
    company: 'Milano Design Studio',
    source: 'Website',
    status: 'Converted',
    priority: 'Medium',
    notes: 'Selected Growth Tier plan.',
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/client_lead_crm');
    console.log('Database connected for seeding...');

    await Lead.deleteMany();
    await Lead.insertMany(sampleLeads);
    console.log(`${sampleLeads.length} Sample Leads seeded successfully!`);

    process.exit(0);
  } catch (error) {
    console.error(`Seeding error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
