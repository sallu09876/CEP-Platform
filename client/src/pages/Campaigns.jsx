import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import CampaignTableFull from '../components/CampaignTableFull';
import { campaignService } from '../services/campaignService';
import { Plus } from 'lucide-react';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const fetchCampaigns = async () => {
    try {
      const res = await campaignService.getAll();
      setCampaigns(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCampaigns(); }, []);

  const handleSend = async (id) => {
    if (!window.confirm('Send this campaign to all selected customers?')) return;
    try {
      await campaignService.send(id);
      await fetchCampaigns();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this campaign?')) return;
    try {
      await campaignService.delete(id);
      await fetchCampaigns();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <div className="flex-1 flex flex-col lg:ml-60 min-w-0 overflow-hidden">
        <Navbar title="Campaigns" onMenuClick={() => setMobileMenuOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {/* Top Bar */}
          <div className="flex justify-end mb-5">
            <button
              onClick={() => navigate('/campaigns/create')}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-lg shadow-sm hover:opacity-90 transition"
              style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}
            >
              <Plus size={15} />
              Create Campaign
            </button>
          </div>

          {/* Table */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <svg className="animate-spin h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            </div>
          ) : (
            <CampaignTableFull
              campaigns={campaigns}
              onSend={handleSend}
              onDelete={handleDelete}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Campaigns;
