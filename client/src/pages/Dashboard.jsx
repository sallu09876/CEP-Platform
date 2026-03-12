import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import CampaignTable from '../components/CampaignTable';
import { Users, Megaphone, Send, Activity } from 'lucide-react';

const stats = [
  {
    title: 'Total Customers',
    value: '1,248',
    trend: '+12%',
    trendLabel: 'this week',
    icon: Users,
    iconBg: 'bg-indigo-500',
  },
  {
    title: 'Total Campaigns',
    value: '64',
    trend: '+5%',
    trendLabel: 'this month',
    icon: Megaphone,
    iconBg: 'bg-emerald-500',
  },
  {
    title: 'Messages Sent',
    value: '18,542',
    trend: '+23%',
    trendLabel: 'this week',
    icon: Send,
    iconBg: 'bg-amber-500',
  },
  {
    title: 'Active Campaigns',
    value: '8',
    trend: null,
    trendLabel: 'Running now',
    icon: Activity,
    iconBg: 'bg-red-500',
  },
];

const campaigns = [
  { name: 'Summer Sale 2026', channel: 'Email', status: 'Active', date: 'Mar 10, 2026' },
  { name: 'New Product Launch', channel: 'WhatsApp', status: 'Active', date: 'Mar 12, 2026' },
  { name: 'Customer Feedback', channel: 'SMS', status: 'Pending', date: 'Mar 9, 2026' },
  { name: 'Flash Sale Alert', channel: 'Email', status: 'Active', date: 'Mar 8, 2026' },
  { name: 'Welcome Campaign', channel: 'Email', status: 'Active', date: 'Mar 7, 2026' },
];

const Dashboard = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col lg:ml-60 min-w-0 overflow-hidden">
        <Navbar
          title="Dashboard"
          onMenuClick={() => setMobileMenuOpen(true)}
        />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>

          {/* Campaign Table */}
          <CampaignTable campaigns={campaigns} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
