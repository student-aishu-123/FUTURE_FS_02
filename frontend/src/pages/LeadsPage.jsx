import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import LeadTable from '../components/LeadTable';
import LeadFormModal from '../components/LeadFormModal';
import { Search, Filter, Plus, RefreshCw } from 'lucide-react';

const LeadsPage = ({ isAddModalOpen, setIsAddModalOpen }) => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [editingLead, setEditingLead] = useState(null);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (statusFilter !== 'All') params.status = statusFilter;
      if (priorityFilter !== 'All') params.priority = priorityFilter;

      const response = await axiosInstance.get('/leads', { params });
      setLeads(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching leads:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [searchTerm, statusFilter, priorityFilter]);

  const handleCreateOrUpdateLead = async (formData) => {
    try {
      if (editingLead) {
        await axiosInstance.put(`/leads/${editingLead._id}`, formData);
      } else {
        await axiosInstance.post('/leads', formData);
      }
      setIsAddModalOpen(false);
      setEditingLead(null);
      fetchLeads();
    } catch (error) {
      console.error('Error saving lead:', error);
      alert(error.response?.data?.message || 'Error saving lead');
    }
  };

  const handleEditClick = (lead) => {
    setEditingLead(lead);
    setIsAddModalOpen(true);
  };

  const handleDeleteClick = async (leadId) => {
    if (window.confirm('Are you sure you want to delete this lead? This action cannot be undone.')) {
      try {
        await axiosInstance.delete(`/leads/${leadId}`);
        fetchLeads();
      } catch (error) {
        console.error('Error deleting lead:', error);
        alert(error.response?.data?.message || 'Failed to delete lead');
      }
    }
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingLead(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Leads Directory</h1>
          <p className="text-slate-500 text-sm">Manage, filter, and track all client leads</p>
        </div>

        <button
          onClick={() => {
            setEditingLead(null);
            setIsAddModalOpen(true);
          }}
          className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Lead
        </button>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search name, email, company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-semibold text-slate-500 uppercase">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-sm bg-slate-50 rounded-xl border border-slate-200 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Converted">Converted</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">Priority:</span>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 text-sm bg-slate-50 rounded-xl border border-slate-200 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <button
            onClick={fetchLeads}
            className="p-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
            title="Refresh Leads"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Leads Table */}
      <LeadTable
        leads={leads}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        loading={loading}
      />

      {/* Add / Edit Modal */}
      <LeadFormModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateOrUpdateLead}
        initialData={editingLead}
      />
    </div>
  );
};

export default LeadsPage;
