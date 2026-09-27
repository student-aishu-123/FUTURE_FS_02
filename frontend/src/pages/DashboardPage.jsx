import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import StatCard from '../components/StatCard';
import LeadFormModal from '../components/LeadFormModal';
import { 
  Users, 
  UserPlus, 
  PhoneCall, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  ArrowRight,
  PieChart
} from 'lucide-react';

const DashboardPage = ({ onOpenAddModal }) => {
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    contactedLeads: 0,
    inProgressLeads: 0,
    convertedLeads: 0,
    lostLeads: 0,
    recentLeads: [],
    sourceBreakdown: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/leads/stats/summary');
      setStats(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const conversionRate = stats.totalLeads > 0 
    ? ((stats.convertedLeads / stats.totalLeads) * 100).toFixed(1) 
    : 0;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-700 via-blue-800 to-slate-900 p-6 rounded-3xl text-white shadow-xl">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">CRM Performance Dashboard</h1>
          <p className="text-blue-200 text-sm mt-1">Real-time overview of client leads pipeline and conversion metrics</p>
        </div>
        <button
          onClick={onOpenAddModal}
          className="inline-flex items-center justify-center px-4 py-2.5 bg-white text-blue-800 hover:bg-blue-50 text-sm font-semibold rounded-xl shadow-lg transition-all"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add New Lead
        </button>
      </div>

      {/* Primary KPI Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Leads"
          value={stats.totalLeads}
          icon={Users}
          color="blue"
          subtitle="All registered leads"
        />
        <StatCard
          title="New Leads"
          value={stats.newLeads}
          icon={UserPlus}
          color="amber"
          subtitle="Uncontacted leads"
        />
        <StatCard
          title="Contacted Leads"
          value={stats.contactedLeads}
          icon={PhoneCall}
          color="purple"
          subtitle="In initial contact stage"
        />
        <StatCard
          title="Converted Leads"
          value={stats.convertedLeads}
          icon={CheckCircle2}
          color="emerald"
          subtitle={`${conversionRate}% conversion rate`}
        />
        <StatCard
          title="Lost Leads"
          value={stats.lostLeads}
          icon={XCircle}
          color="rose"
          subtitle="Closed / Unqualified"
        />
      </div>

      {/* Analytics & Pipeline Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads Activity Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-800 flex items-center">
              <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
              Recent Leads
            </h2>
            <Link
              to="/leads"
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center"
            >
              View All Directory <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          {loading ? (
            <div className="py-8 text-center text-slate-400 text-sm">Loading activity...</div>
          ) : stats.recentLeads.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-sm">No recent leads found.</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {stats.recentLeads.map((lead) => (
                <div key={lead._id} className="py-3 flex items-center justify-between hover:bg-slate-50/50 rounded-xl px-2 transition-colors">
                  <div>
                    <Link to={`/leads/${lead._id}`} className="font-semibold text-slate-900 hover:text-blue-600 text-sm">
                      {lead.fullName}
                    </Link>
                    <p className="text-xs text-slate-500">{lead.company} • {lead.email}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {lead.status}
                    </span>
                    <Link
                      to={`/leads/${lead._id}`}
                      className="text-slate-400 hover:text-blue-600"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Lead Source Breakdown Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-800 flex items-center">
              <PieChart className="w-5 h-5 text-purple-600 mr-2" />
              Acquisition Sources
            </h2>
          </div>

          {loading ? (
            <div className="py-8 text-center text-slate-400 text-sm">Loading sources...</div>
          ) : stats.sourceBreakdown.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-sm">No source data available.</div>
          ) : (
            <div className="space-y-3">
              {stats.sourceBreakdown.map((item) => {
                const percentage = stats.totalLeads > 0 
                  ? Math.round((item.count / stats.totalLeads) * 100) 
                  : 0;

                return (
                  <div key={item._id} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-700">
                      <span>{item._id || 'Direct / Other'}</span>
                      <span className="font-bold">{item.count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
