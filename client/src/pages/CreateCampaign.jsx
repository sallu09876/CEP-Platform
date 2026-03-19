import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import CustomerSelector from '../components/CustomerSelector';
import { campaignService } from '../services/campaignService';
import { customerService } from '../services/customerService';
import { Save, Send } from 'lucide-react';

const CHANNELS = ['Email', 'WhatsApp', 'SMS'];

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ title: '', channel: '', message: '' });
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    customerService.getAll().then((res) => setCustomers(res.data.data)).catch(console.error);
  }, []);

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Campaign title is required';
    if (!form.channel) errs.channel = 'Please select a channel';
    if (!form.message.trim()) errs.message = 'Message content is required';
    return errs;
  };

  const handleSubmit = async (status) => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setSubmitting(true);
    try {
      if (status === 'Sent') {
        console.log(`Sending campaign to ${selectedCustomers.length} customers...`);
        // Simulate delay
        await new Promise((r) => setTimeout(r, 1200));
      }
      await campaignService.create({
        title: form.title,
        channel: form.channel,
        message: form.message,
        customers: selectedCustomers,
        status,
      });
      navigate('/campaigns');
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || 'Something went wrong' });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-3 py-2.5 text-sm border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition ${
      errors[field] ? 'border-red-400' : 'border-gray-200'
    }`;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <div className="flex-1 flex flex-col lg:ml-60 min-w-0 overflow-hidden">
        <Navbar title="Create Campaign" onMenuClick={() => setMobileMenuOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">

              {errors.submit && (
                <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                  {errors.submit}
                </div>
              )}

              {/* Campaign Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Campaign Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Enter campaign title"
                  className={inputClass('title')}
                />
                {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
              </div>

              {/* Channel */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Channel</label>
                <select
                  value={form.channel}
                  onChange={(e) => setForm({ ...form, channel: e.target.value })}
                  className={inputClass('channel')}
                >
                  <option value="">Select channel</option>
                  {CHANNELS.map((ch) => (
                    <option key={ch} value={ch}>{ch}</option>
                  ))}
                </select>
                {errors.channel && <p className="text-xs text-red-500 mt-1">{errors.channel}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Message Content</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Enter your message here..."
                  rows={6}
                  className={inputClass('message') + ' resize-none'}
                />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
              </div>

              {/* Customer Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Customers</label>
                <CustomerSelector
                  customers={customers}
                  selected={selectedCustomers}
                  onChange={setSelectedCustomers}
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => handleSubmit('Draft')}
                  disabled={submitting}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-60"
                >
                  <Save size={15} />
                  {submitting ? 'Saving...' : 'Save Draft'}
                </button>
                <button
                  onClick={() => handleSubmit('Sent')}
                  disabled={submitting}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-lg shadow-sm hover:opacity-90 transition disabled:opacity-60"
                  style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}
                >
                  <Send size={15} />
                  {submitting ? 'Sending...' : 'Send Campaign'}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateCampaign;
