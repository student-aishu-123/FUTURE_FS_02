const Lead = require('../models/Lead');

// @desc    Get all leads with search & filter
// @route   GET /api/leads
// @access  Private
const getLeads = async (req, res) => {
  try {
    const { search, status, priority, source, sortBy, order } = req.query;

    let query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (priority && priority !== 'All') {
      query.priority = priority;
    }

    if (source && source !== 'All') {
      query.source = source;
    }

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = order === 'asc' ? 1 : -1;
    } else {
      sortOptions.createdAt = -1; // Default latest first
    }

    const leads = await Lead.find(query).sort(sortOptions);
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get dashboard metrics & summary counts
// @route   GET /api/leads/stats/summary
// @access  Private
const getLeadStats = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const newLeads = await Lead.countDocuments({ status: 'New' });
    const contactedLeads = await Lead.countDocuments({ status: 'Contacted' });
    const inProgressLeads = await Lead.countDocuments({ status: 'In Progress' });
    const convertedLeads = await Lead.countDocuments({ status: 'Converted' });
    const lostLeads = await Lead.countDocuments({ status: 'Lost' });

    // Recent 5 leads
    const recentLeads = await Lead.find().sort({ createdAt: -1 }).limit(5);

    // Distribution by Source
    const sourceBreakdown = await Lead.aggregate([
      { $group: { _id: '$source', count: { $sum: 1 } } }
    ]);

    res.json({
      totalLeads,
      newLeads,
      contactedLeads,
      inProgressLeads,
      convertedLeads,
      lostLeads,
      recentLeads,
      sourceBreakdown
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single lead by ID
// @route   GET /api/leads/:id
// @access  Private
const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new lead
// @route   POST /api/leads
// @access  Private
const createLead = async (req, res) => {
  try {
    const { fullName, email, phone, company, source, status, priority, notes } = req.body;

    if (!fullName || !email || !phone || !company) {
      return res.status(400).json({ message: 'Please provide Full Name, Email, Phone, and Company' });
    }

    const lead = new Lead({
      fullName,
      email,
      phone,
      company,
      source: source || 'Website',
      status: status || 'New',
      priority: priority || 'Medium',
      notes: notes || '',
      user: req.user ? req.user._id : null
    });

    const createdLead = await lead.save();
    res.status(201).json(createdLead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update lead
// @route   PUT /api/leads/:id
// @access  Private
const updateLead = async (req, res) => {
  try {
    const { fullName, email, phone, company, source, status, priority, notes } = req.body;

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    lead.fullName = fullName || lead.fullName;
    lead.email = email || lead.email;
    lead.phone = phone || lead.phone;
    lead.company = company || lead.company;
    lead.source = source || lead.source;
    lead.status = status || lead.status;
    lead.priority = priority || lead.priority;
    if (notes !== undefined) lead.notes = notes;

    const updatedLead = await lead.save();
    res.json(updatedLead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete lead
// @route   DELETE /api/leads/:id
// @access  Private
const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    await lead.deleteOne();
    res.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getLeads,
  getLeadStats,
  getLeadById,
  createLead,
  updateLead,
  deleteLead
};
