import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import CustomerTable from '../components/CustomerTable';
import CustomerModal from '../components/CustomerModal';
import { customerService } from '../services/customerService';
import { Search, Upload, Plus } from 'lucide-react';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fetchCustomers = async () => {
    try {
      const res = await customerService.getAll();
      setCustomers(res.data.data);
      setFiltered(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCustomers(); }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      customers.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q)
      )
    );
  }, [search, customers]);

  const handleSave = async (form) => {
    if (editData) {
      await customerService.update(editData._id, form);
    } else {
      await customerService.create(form);
    }
    await fetchCustomers();
    setEditData(null);
  };

  const handleEdit = (customer) => {
    setEditData(customer);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this customer?')) return;
    await customerService.delete(id);
    await fetchCustomers();
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditData(null);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <div className="flex-1 flex flex-col lg:ml-60 min-w-0 overflow-hidden">
        <Navbar title="Customers" onMenuClick={() => setMobileMenuOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-5">
            {/* Search */}
            <div className="relative flex-1 max-w-lg">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search customers..."
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
              />
            </div>

            <div className="flex items-center gap-2.5">
              {/* Import CSV - UI only */}
              <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition">
                <Upload size={15} />
                Import CSV
              </button>

              {/* Add Customer */}
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-lg shadow-sm hover:opacity-90 transition"
                style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}
              >
                <Plus size={15} />
                Add Customer
              </button>
            </div>
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
            <CustomerTable
              customers={filtered}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </main>
      </div>

      <CustomerModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        onSave={handleSave}
        editData={editData}
      />
    </div>
  );
};

export default Customers;
