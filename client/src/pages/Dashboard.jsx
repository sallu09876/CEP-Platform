import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import CampaignTable from '../components/CampaignTable';
import { dashboardService } from '../services/dashboardService';
import { Users, Megaphone, Send, Activity } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await dashboardService.getStats();
        setStats(res.data.data);
      } catch (err) {
        console.error('Failed to load dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = stats
    ? [
        {
          title: 'Total Customers',
          value: stats.totalCustomers.toLocaleString(),
          trend: stats.newCustomersThisWeek > 0 ? `+${stats.newCustomersThisWeek}` : null,
          trendLabel: stats.newCustomersThisWeek > 0 ? 'new this week' : 'No new this week',
          icon: Users,
          iconBg: 'bg-indigo-500',
        },
        {
          title: 'Total Campaigns',
          value: stats.totalCampaigns.toLocaleString(),
          trend: stats.newCampaignsThisMonth > 0 ? `+${stats.newCampaignsThisMonth}` : null,
          trendLabel: stats.newCampaignsThisMonth > 0 ? 'this month' : 'No new this month',
          icon: Megaphone,
          iconBg: 'bg-emerald-500',
        },
        {
          title: 'Messages Sent',
          value: stats.messagesSent.toLocaleString(),
          trend: null,
          trendLabel: 'Total delivered',
          icon: Send,
          iconBg: 'bg-amber-500',
        },
        {
          title: 'Active Campaigns',
          value: stats.activeCampaigns.toLocaleString(),
          trend: null,
          trendLabel: stats.activeCampaigns > 0 ? 'Running now' : 'None active',
          icon: Activity,
          iconBg: 'bg-red-500',
        },
      ]
    : [];

  // Format recent campaigns for the table component
  const recentCampaigns = stats?.recentCampaigns?.map((c) => ({
    name: c.title,
    channel: c.channel,
    status: c.status === 'Sent' ? 'Active' : c.status,
    date: new Date(c.createdAt).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    }),
  })) || [];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <div className="flex-1 flex flex-col lg:ml-60 min-w-0 overflow-hidden">
        <Navbar title="Dashboard" onMenuClick={() => setMobileMenuOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <svg className="animate-spin h-7 w-7 text-primary" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            </div>
          ) : (
            <>
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                {statCards.map((stat, idx) => (
                  <StatCard key={idx} {...stat} />
                ))}
              </div>

              {/* Recent Campaigns Table */}
              <CampaignTable campaigns={recentCampaigns} />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
