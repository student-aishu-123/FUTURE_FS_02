import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import LeadFormModal from '../components/LeadFormModal';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Building, 
  Globe, 
  Calendar, 
  Edit2, 
  Trash2, 
  Clock, 
  FileText,
  UserCheck
} from 'lucide-react';

const LeadDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchLeadDetails = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/leads/${id}`);
      setLead(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading lead details:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeadDetails();
  }, [id]);

  const handleUpdateStatus = async (newStatus) => {
    try {
      const res = await axiosInstance.put(`/leads/${id}`, { status: newStatus });
      setLead(res.data);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleUpdatePriority = async (newPriority) => {
    try {
      const res = await axiosInstance.put(`/leads/${id}`, { priority: newPriority });
      setLead(res.data);
    } catch (error) {
      console.error('Error updating priority:', error);
    }
  };

  const handleSaveLead = async (formData) => {
    try {
      const res = await axiosInstance.put(`/leads/${id}`, formData);
      setLead(res.data);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating lead:', error);
      alert(error.response?.data?.message || 'Error updating lead');
    }
  };

  const handleDeleteLead = async () => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await axiosInstance.delete(`/leads/${id}`);
        navigate('/leads');
      } catch (error) {
        console.error('Error deleting lead:', error);
        alert('Failed to delete lead');
      }
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center text-slate-500 font-medium">
        Loading lead record details...
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800">Lead record not found</h3>
        <Link to="/leads" className="text-blue-600 text-sm mt-2 inline-block font-semibold">
          Return to Leads Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Link
            to="/leads"
            className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{lead.fullName}</h1>
            <p className="text-sm text-slate-500 flex items-center mt-0.5">
              <Building className="w-4 h-4 mr-1 text-slate-400" />
              {lead.company}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="inline-flex items-center px-4 py-2.5 border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 rounded-xl text-sm font-semibold transition-colors shadow-sm"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Lead
          </button>
          <button
            onClick={handleDeleteLead}
            className="inline-flex items-center px-4 py-2.5 border border-rose-200 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl text-sm font-semibold transition-colors"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </button>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Key Info Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Status Control Panel */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Pipeline Stage & Priority
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 font-semibold mb-1">Status</label>
                <select
                  value={lead.status}
                  onChange={(e) => handleUpdateStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Converted">Converted</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-400 font-semibold mb-1">Priority Level</label>
                <select
                  value={lead.priority}
                  onChange={(e) => handleUpdatePriority(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-800 flex items-center">
              <UserCheck className="w-5 h-5 text-blue-600 mr-2" />
              Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase">Email</span>
                <div className="flex items-center text-slate-900 font-medium">
                  <Mail className="w-4 h-4 mr-2 text-slate-400" />
                  <a href={`mailto:${lead.email}`} className="hover:text-blue-600">
                    {lead.email}
                  </a>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase">Phone</span>
                <div className="flex items-center text-slate-900 font-medium">
                  <Phone className="w-4 h-4 mr-2 text-slate-400" />
                  <a href={`tel:${lead.phone}`} className="hover:text-blue-600">
                    {lead.phone}
                  </a>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase">Company</span>
                <div className="flex items-center text-slate-900 font-medium">
                  <Building className="w-4 h-4 mr-2 text-slate-400" />
                  {lead.company}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase">Lead Source</span>
                <div className="flex items-center text-slate-900 font-medium">
                  <Globe className="w-4 h-4 mr-2 text-slate-400" />
                  {lead.source}
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base font-bold text-slate-800 flex items-center">
              <FileText className="w-5 h-5 text-amber-600 mr-2" />
              Notes & Discussion History
            </h2>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
              {lead.notes || 'No notes added for this client lead.'}
            </div>
          </div>
        </div>

        {/* Right Column - Metadata Timeline */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 h-fit">
          <h2 className="text-base font-bold text-slate-800">Lead Metadata</h2>
          
          <div className="space-y-4 text-xs">
            <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <Calendar className="w-4 h-4 text-slate-400 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-700">Created Date</p>
                <p className="text-slate-500 mt-0.5">
                  {new Date(lead.createdAt).toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <Clock className="w-4 h-4 text-slate-400 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-700">Last Modified</p>
                <p className="text-slate-500 mt-0.5">
                  {new Date(lead.updatedAt).toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form Modal */}
      <LeadFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleSaveLead}
        initialData={lead}
      />
    </div>
  );
};

export default LeadDetailsPage;
