import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit2, Trash2, Mail, Phone, Building } from 'lucide-react';

const LeadTable = ({ leads, onEdit, onDelete, loading }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'New':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Contacted':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'In Progress':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Converted':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Lost':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-100 text-rose-800';
      case 'Medium':
        return 'bg-amber-100 text-amber-800';
      case 'Low':
        return 'bg-slate-100 text-slate-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500 font-medium">
        Loading leads directory...
      </div>
    );
  }

  if (!leads || leads.length === 0) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
        <Building className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-800">No leads found</h3>
        <p className="text-sm text-slate-500 mt-1">Try clearing your filters or create a new lead.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <th className="py-4 px-6">Lead / Company</th>
            <th className="py-4 px-6">Contact Info</th>
            <th className="py-4 px-6">Source</th>
            <th className="py-4 px-6">Status</th>
            <th className="py-4 px-6">Priority</th>
            <th className="py-4 px-6">Created Date</th>
            <th className="py-4 px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-sm">
          {leads.map((lead) => (
            <tr key={lead._id} className="hover:bg-slate-50/80 transition-colors">
              <td className="py-4 px-6">
                <div>
                  <Link 
                    to={`/leads/${lead._id}`}
                    className="font-bold text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    {lead.fullName}
                  </Link>
                  <p className="text-xs text-slate-500 font-medium">{lead.company}</p>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="space-y-1">
                  <div className="flex items-center text-xs text-slate-600">
                    <Mail className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                    <span>{lead.email}</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-600">
                    <Phone className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                    <span>{lead.phone}</span>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6">
                <span className="inline-block px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-md">
                  {lead.source}
                </span>
              </td>
              <td className="py-4 px-6">
                <span className={`inline-block px-3 py-1 text-xs font-semibold border rounded-full ${getStatusBadge(lead.status)}`}>
                  {lead.status}
                </span>
              </td>
              <td className="py-4 px-6">
                <span className={`inline-block px-2.5 py-0.5 text-xs font-bold rounded-md ${getPriorityBadge(lead.priority)}`}>
                  {lead.priority}
                </span>
              </td>
              <td className="py-4 px-6 text-slate-500 text-xs">
                {new Date(lead.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </td>
              <td className="py-4 px-6 text-right space-x-2">
                <Link
                  to={`/leads/${lead._id}`}
                  className="inline-flex p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="View Details"
                >
                  <Eye className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => onEdit(lead)}
                  className="inline-flex p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                  title="Edit Lead"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(lead._id)}
                  className="inline-flex p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Delete Lead"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;
