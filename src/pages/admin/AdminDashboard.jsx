import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { LogOut, Calendar, Save, Printer, Users, MessageSquare, Bell, Search, BarChart3 } from 'lucide-react';

const timeOptions = [];
for (let h = 0; h < 24; h++) {
  for (let m of ['00', '15', '30', '45']) {
    const isPM = h >= 12;
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    const ampm = isPM ? 'PM' : 'AM';
    const label = `${hour12}:${m} ${ampm}`;
    const value = `${String(h).padStart(2, '0')}:${m}`;
    timeOptions.push({ label, value });
  }
}

export default function AdminDashboard() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [datePart, setDatePart] = useState('');
  const [timePart, setTimePart] = useState('');
  const [location, setLocation] = useState('');
  const [whatsappLink, setWhatsappLink] = useState('');
  const [whatsappMessage, setWhatsappMessage] = useState('');
  const [registrations, setRegistrations] = useState([]);
  const [contactSubmissions, setContactSubmissions] = useState([]);
  const [waitlistLeads, setWaitlistLeads] = useState([]);
  const [courseEnquiries, setCourseEnquiries] = useState([]);
  const [activeTab, setActiveTab] = useState('audience');
  
  // Audience Tab State
  const [audienceWorkshopFilter, setAudienceWorkshopFilter] = useState('all'); // all, offline-workshop
  const [audienceSourceFilter, setAudienceSourceFilter] = useState('all'); // all, meta, website
  const [audiencePaymentFilter, setAudiencePaymentFilter] = useState('all'); // all, paid, pending
  const [audienceSearch, setAudienceSearch] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/admin/login');
      } else {
        setSession(session);
        fetchSettings();
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/admin/login');
      } else {
        setSession(session);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('workshop_date, workshop_location, whatsapp_group_link')
        .eq('id', 1)
        .single();

      if (error) throw error;

      if (data && data.workshop_date) {
        // Convert to local datetime string format
        const date = new Date(data.workshop_date);
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        const iso = date.toISOString().slice(0, 16);
        setDatePart(iso.split('T')[0]);
        setTimePart(iso.split('T')[1].slice(0, 5));
      }
      
      if (data && data.workshop_location) {
        setLocation(data.workshop_location);
      }

      if (data && data.whatsapp_group_link) {
        setWhatsappLink(data.whatsapp_group_link);
      }

      // Fetch registrations
      const { data: regData, error: regError } = await supabase
        .from('workshop_registrations')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (!regError && regData) {
        setRegistrations(regData);
      }

      // Fetch contact submissions
      const { data: contactData, error: contactError } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (!contactError && contactData) {
        setContactSubmissions(contactData);
      }

      // Fetch waitlist leads
      const { data: waitlistData, error: waitlistError } = await supabase
        .from('workshop_waitlist')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (!waitlistError && waitlistData) {
        setWaitlistLeads(waitlistData);
      }

      // Fetch course enquiries
      const { data: enquiryData, error: enquiryError } = await supabase
        .from('course_enquiries')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (!enquiryError && enquiryData) {
        setCourseEnquiries(enquiryData);
      }
    } catch (error) {
      console.error('Error fetching settings:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      // Convert local date and time back to UTC ISO string
      const isoDate = new Date(`${datePart}T${timePart}`).toISOString();

      const { error } = await supabase
        .from('site_settings')
        .upsert({ id: 1, workshop_date: isoDate, workshop_location: location });

      if (error) throw error;

      // Also update the active workshop date to keep the frontend checkout logic in sync
      const { error: wsError } = await supabase
        .from('workshops')
        .update({ date: isoDate, location: location })
        .eq('is_active', true);

      if (wsError) throw wsError;

      setMessage('Workshop date updated successfully!');
    } catch (error) {
      setMessage(`Error updating date: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveWhatsapp = async (e) => {
    e.preventDefault();
    setSaving(true);
    setWhatsappMessage('');

    try {
      if (whatsappLink && !whatsappLink.match(/^https?:\/\//)) {
        throw new Error('Please enter a valid URL starting with http:// or https://');
      }

      const { error } = await supabase
        .from('site_settings')
        .update({ whatsapp_group_link: whatsappLink || null })
        .eq('id', 1);

      if (error) throw error;

      setWhatsappMessage('WhatsApp group link updated successfully!');
    } catch (error) {
      setWhatsappMessage(`Error updating link: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };



  const updateEnquiryStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('course_enquiries')
        .update({ status: newStatus })
        .eq('id', id);
        
      if (error) throw error;
      
      setCourseEnquiries(prev => 
        prev.map(enq => enq.id === id ? { ...enq, status: newStatus } : enq)
      );
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Unified Audience Logic
  const allAudience = useMemo(() => {
    const paid = registrations
      .map(r => ({
        type: 'registration',
        id: `paid-${r.id}`,
        originalId: r.id,
        created_at: r.created_at,
        name: r.name,
        phone: r.phone,
        email: r.email,
        course: 'Real Estate Offline Workshop',
        paymentStatus: r.payment_status || 'PENDING', // PENDING, PAID, FAILED
        registrationStatus: r.registration_status,
        source: r.acquisition_source || 'WEBSITE',
        leadStatus: null,
      }));

    const organic = courseEnquiries
      .map(e => ({
        type: 'enquiry',
        id: `organic-${e.id}`,
        originalId: e.id,
        created_at: e.created_at,
        name: e.name,
        phone: e.phone,
        email: e.email,
        course: e.course_name,
        paymentStatus: null,
        source: e.acquisition_source || 'WEBSITE',
        leadStatus: e.status,
      }));

    return [...paid, ...organic].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [registrations, courseEnquiries]);

  const filteredAudience = useMemo(() => {
    let result = allAudience;
    
    // Workshop Filter
    if (audienceWorkshopFilter === 'offline-workshop') {
      result = result.filter(r => r.course === 'Real Estate Offline Workshop');
    }

    // Source Filter
    if (audienceSourceFilter === 'meta') {
      result = result.filter(r => r.source === 'META_AD');
    } else if (audienceSourceFilter === 'website') {
      result = result.filter(r => r.source === 'WEBSITE');
    }

    // Payment Filter
    if (audiencePaymentFilter === 'paid') {
      result = result.filter(r => r.paymentStatus === 'PAID');
    } else if (audiencePaymentFilter === 'pending') {
      result = result.filter(r => r.paymentStatus === 'PENDING');
    }

    // Search Filter
    if (audienceSearch.trim()) {
      const q = audienceSearch.toLowerCase();
      result = result.filter(r => 
        (r.name && r.name.toLowerCase().includes(q)) ||
        (r.email && r.email.toLowerCase().includes(q)) ||
        (r.phone && r.phone.toLowerCase().includes(q))
      );
    }
    
    return result;
  }, [allAudience, audienceWorkshopFilter, audienceSourceFilter, audiencePaymentFilter, audienceSearch]);

  const stats = useMemo(() => {
    // Only compute stats for the currently filtered workshop (or all if not filtered by workshop)
    let base = allAudience;
    if (audienceWorkshopFilter === 'offline-workshop') {
      base = base.filter(r => r.course === 'Real Estate Offline Workshop');
    }
    
    return {
      total: base.length,
      paid: base.filter(r => r.paymentStatus === 'PAID').length,
      pending: base.filter(r => r.paymentStatus === 'PENDING').length,
      meta: base.filter(r => r.source === 'META_AD').length,
      website: base.filter(r => r.source === 'WEBSITE').length
    };
  }, [allAudience, audienceWorkshopFilter]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm print:hidden">
        <h1 className="text-xl font-black text-slate-900">Dr Amol Mourya <span className="text-blue-600">Admin</span></h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12 print:max-w-none print:p-0">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-4 mb-8 print:hidden">
          <button 
            onClick={() => setActiveTab('audience')}
            className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
              activeTab === 'audience' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Audience
          </button>
          <button 
            onClick={() => setActiveTab('registrations')}
            className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
              activeTab === 'registrations' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Users className="w-4 h-4" />
            Registrations
          </button>
          <button 
            onClick={() => setActiveTab('enquiries')}
            className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
              activeTab === 'enquiries' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Course Enquiries
          </button>
          <button 
            onClick={() => setActiveTab('contacts')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'contacts' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Contact Forms
          </button>
          <button 
            onClick={() => setActiveTab('waitlist')}
            className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
              activeTab === 'waitlist' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Bell className="w-4 h-4" />
            Waitlist
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'settings' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Settings
          </button>
        </div>

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <>
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">Workshop Settings</h2>
              <p className="text-slate-500 text-sm">Update the live countdown timer on the website</p>
            </div>
          </div>

          {message && (
            <div className={`p-4 rounded-xl mb-6 text-sm font-medium border ${message.includes('Error') ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-700 border-green-200'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Workshop Date</label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={datePart}
                    onChange={(e) => setDatePart(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Start Time (AM/PM)</label>
                <div className="relative">
                  <select
                    required
                    value={timePart}
                    onChange={(e) => setTimePart(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-white appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select Time</option>
                    {timeOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Workshop Location</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. NAGPUR, MAHARASHTRA"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-2">This will instantly update the countdown timer on the /workshop page.</p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center justify-center gap-2 w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save Settings'}
              </button>

            </div>
          </form>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 mt-8">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">WhatsApp Group</h2>
              <p className="text-slate-500 text-sm">Manage the active WhatsApp group link for the Thank You page</p>
            </div>
          </div>

          {whatsappMessage && (
            <div className={`p-4 rounded-xl mb-6 text-sm font-medium border ${whatsappMessage.includes('Error') ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-700 border-green-200'}`}>
              {whatsappMessage}
            </div>
          )}

          <form onSubmit={handleSaveWhatsapp} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Current WhatsApp Group Link</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="https://chat.whatsapp.com/..."
                  value={whatsappLink}
                  onChange={(e) => setWhatsappLink(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
              </div>
              <p className="text-xs text-slate-400 mt-2">Leave blank to hide the WhatsApp join button on the Thank You page.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center justify-center gap-2 w-full sm:w-auto bg-green-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save WhatsApp Link'}
              </button>
              
              {whatsappLink && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto bg-slate-100 text-slate-700 font-bold py-3 px-8 rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Test Link
                </a>
              )}
            </div>
          </form>
          </div>
          </>
        )}

        {/* Registrations Tab */}
        {activeTab === 'registrations' && (
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 printable-area">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-slate-100 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900">Registered Students</h2>
                <p className="text-slate-500 text-sm">{registrations.length} students confirmed</p>
              </div>
            </div>
            
            <button 
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 px-4 rounded-xl transition-colors whitespace-nowrap print:hidden"
            >
              <Printer className="w-4 h-4" />
              Print List
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 px-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="py-3 px-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Name</th>
                  <th className="py-3 px-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Contact</th>
                  <th className="py-3 px-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Course</th>
                  <th className="py-3 px-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Statuses</th>
                  <th className="py-3 px-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Payment ID</th>
                </tr>
              </thead>
              <tbody>
                {registrations.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-slate-500">
                      No registrations found yet.
                    </td>
                  </tr>
                ) : (
                  registrations.map((reg) => (
                    <tr key={reg.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-slate-500 whitespace-nowrap">
                        {new Date(reg.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-900">{reg.name}</td>
                      <td className="py-3 px-4 text-slate-600 text-sm">
                        <div className="flex flex-col">
                          <span>{reg.phone}</span>
                          <span className="text-slate-400">{reg.email}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600">RGC Champions Launchpad</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-xs text-slate-500 flex items-center justify-between gap-2">Reg: <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold ${reg.registration_status === 'CONFIRMED' ? 'bg-green-100 text-green-800' : reg.registration_status === 'PENDING' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>
                            {reg.registration_status || 'PENDING'}
                          </span></span>
                          <span className="text-xs text-slate-500 flex items-center justify-between gap-2">Pay: <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold ${reg.payment_status === 'PAID' ? 'bg-green-100 text-green-800' : reg.payment_status === 'FAILED' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>
                            {reg.payment_status || 'PENDING'}
                          </span></span>
                          <span className="text-xs text-slate-500 flex items-center justify-between gap-2">Att: <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold ${reg.attendance_status === 'ATTENDED' ? 'bg-blue-100 text-blue-800' : reg.attendance_status === 'NO_SHOW' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-800'}`}>
                            {reg.attendance_status || 'NOT_ATTENDED'}
                          </span></span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600 font-mono text-xs">
                        {reg.razorpay_payment_id || '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        )}

        {/* Contact Submissions Tab */}
        {activeTab === 'contacts' && (
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 printable-area">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-slate-100 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900">Contact Submissions</h2>
                <p className="text-slate-500 text-sm">{contactSubmissions.length} inquiries received</p>
              </div>
            </div>
            
            <button 
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 px-4 rounded-xl transition-colors whitespace-nowrap print:hidden"
            >
              <Printer className="w-4 h-4" />
              Print List
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 px-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="py-3 px-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Name</th>
                  <th className="py-3 px-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Email</th>
                  <th className="py-3 px-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Phone</th>
                  <th className="py-3 px-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Role</th>
                </tr>
              </thead>
              <tbody>
                {contactSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-slate-500">
                      No contact submissions found yet.
                    </td>
                  </tr>
                ) : (
                  contactSubmissions.map((sub) => (
                    <tr key={sub.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-slate-500 whitespace-nowrap">
                        {new Date(sub.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-900">{sub.name}</td>
                      <td className="py-3 px-4 text-slate-600">{sub.email}</td>
                      <td className="py-3 px-4 text-slate-600">{sub.phone}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
                          {sub.role}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        )}

        {/* Waitlist Tab */}
        {activeTab === 'waitlist' && (
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 printable-area">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-slate-100 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900">Waitlist Leads</h2>
                <p className="text-slate-500 text-sm">{waitlistLeads.length} people waiting for the next workshop</p>
              </div>
            </div>
            
            <button 
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 px-4 rounded-xl transition-colors whitespace-nowrap print:hidden"
            >
              <Printer className="w-4 h-4" />
              Print List
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 px-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="py-3 px-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Name</th>
                  <th className="py-3 px-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Email</th>
                  <th className="py-3 px-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Phone</th>
                  <th className="py-3 px-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Source</th>
                </tr>
              </thead>
              <tbody>
                {waitlistLeads.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-slate-500">
                      No waitlist signups yet.
                    </td>
                  </tr>
                ) : (
                  waitlistLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-slate-500 whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-900">{lead.name}</td>
                      <td className="py-3 px-4 text-slate-600">{lead.email}</td>
                      <td className="py-3 px-4 text-slate-600">{lead.phone}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${(lead.lead_source || 'organic') === 'meta_ads' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'}`}>
                          {(lead.lead_source || 'organic') === 'meta_ads' ? 'Meta Ads' : 'Organic'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        )}

        {/* Course Enquiries Tab */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 printable-area">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-slate-100 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900">Course Enquiries</h2>
                <p className="text-slate-500 text-sm">{courseEnquiries.length} total enquiries</p>
              </div>
            </div>
            
            <button 
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 px-4 rounded-xl transition-colors whitespace-nowrap print:hidden"
            >
              <Printer className="w-4 h-4" />
              Print List
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 px-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="py-3 px-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Course</th>
                  <th className="py-3 px-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Name</th>
                  <th className="py-3 px-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Phone / Email</th>
                  <th className="py-3 px-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Message</th>
                  <th className="py-3 px-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {courseEnquiries.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-500">
                      No course enquiries yet.
                    </td>
                  </tr>
                ) : (
                  courseEnquiries.map((enq) => (
                    <tr key={enq.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-slate-500 whitespace-nowrap">
                        {new Date(enq.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900 text-sm max-w-[150px] truncate" title={enq.course_name}>
                        {enq.course_name}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-900">{enq.name}</td>
                      <td className="py-3 px-4 text-slate-600 text-sm">
                        <a href={`tel:${enq.phone}`} className="text-blue-600 hover:underline block font-medium">{enq.phone}</a>
                        {enq.email && <a href={`mailto:${enq.email}`} className="text-slate-400 hover:text-slate-600">{enq.email}</a>}
                      </td>
                      <td className="py-3 px-4 text-slate-600 text-sm max-w-[200px] truncate" title={enq.message}>
                        {enq.message || '-'}
                      </td>
                      <td className="py-3 px-4">
                        <select 
                          value={enq.status}
                          onChange={(e) => updateEnquiryStatus(enq.id, e.target.value)}
                          className={`text-xs font-bold rounded-full px-2.5 py-1 border-0 focus:ring-2 focus:ring-blue-500 cursor-pointer ${
                            enq.status === 'NEW' ? 'bg-blue-100 text-blue-800' :
                            enq.status === 'CONTACTED' ? 'bg-amber-100 text-amber-800' :
                            enq.status === 'INTERESTED' ? 'bg-purple-100 text-purple-800' :
                            enq.status === 'CONVERTED' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="INTERESTED">INTERESTED</option>
                          <option value="CONVERTED">CONVERTED</option>
                          <option value="NOT_INTERESTED">NOT_INTERESTED</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        )}

        {/* Unified Audience Tab */}
        {activeTab === 'audience' && (
          <div className="space-y-6 printable-area">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-5 flex flex-col justify-center text-center">
                <p className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-1">Total Audience</p>
                <h3 className="text-3xl font-black text-slate-900">{stats.total}</h3>
              </div>
              <div className="bg-blue-50 rounded-3xl shadow-sm border border-blue-100 p-5 flex flex-col justify-center text-center">
                <p className="text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">Paid</p>
                <h3 className="text-3xl font-black text-blue-900">{stats.paid}</h3>
              </div>
              <div className="bg-amber-50 rounded-3xl shadow-sm border border-amber-100 p-5 flex flex-col justify-center text-center">
                <p className="text-amber-600 font-bold text-xs uppercase tracking-wider mb-1">Pending</p>
                <h3 className="text-3xl font-black text-amber-900">{stats.pending}</h3>
              </div>
              <div className="bg-purple-50 rounded-3xl shadow-sm border border-purple-100 p-5 flex flex-col justify-center text-center">
                <p className="text-purple-600 font-bold text-xs uppercase tracking-wider mb-1">Meta Ads</p>
                <h3 className="text-3xl font-black text-purple-900">{stats.meta}</h3>
              </div>
              <div className="bg-emerald-50 rounded-3xl shadow-sm border border-emerald-100 p-5 flex flex-col justify-center text-center">
                <p className="text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">Website</p>
                <h3 className="text-3xl font-black text-emerald-900">{stats.website}</h3>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
              {/* Toolbar */}
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 print:hidden">
                <div className="flex flex-wrap gap-4 w-full xl:w-auto">
                  <div className="flex flex-col gap-1 w-full sm:w-auto">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Workshop</label>
                    <select
                      value={audienceWorkshopFilter}
                      onChange={(e) => setAudienceWorkshopFilter(e.target.value)}
                      className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                      <option value="all">All Workshops</option>
                      <option value="offline-workshop">Real Estate Offline Workshop</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1 w-full sm:w-auto">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Source</label>
                    <select
                      value={audienceSourceFilter}
                      onChange={(e) => setAudienceSourceFilter(e.target.value)}
                      className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                      <option value="all">All Sources</option>
                      <option value="meta">Meta Ads</option>
                      <option value="website">Website</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1 w-full sm:w-auto">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Payment</label>
                    <select
                      value={audiencePaymentFilter}
                      onChange={(e) => setAudiencePaymentFilter(e.target.value)}
                      className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                      <option value="all">All Payments</option>
                      <option value="paid">Paid</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full xl:w-auto">
                  <div className="relative w-full xl:w-72">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search name, phone, email..."
                      value={audienceSearch}
                      onChange={(e) => setAudienceSearch(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 sm:text-sm transition-colors"
                    />
                  </div>
                  
                  <button 
                    onClick={() => window.print()}
                    className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl transition-colors whitespace-nowrap hidden sm:flex"
                  >
                    <Printer className="w-4 h-4" />
                    Print
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-3 px-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Source</th>
                      <th className="py-3 px-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Date</th>
                      <th className="py-3 px-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Name & Contact</th>
                      <th className="py-3 px-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Course</th>
                      <th className="py-3 px-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Payment / Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAudience.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="py-12 text-center text-slate-500">
                          <div className="flex flex-col items-center justify-center">
                            <Search className="w-10 h-10 text-slate-300 mb-3" />
                            <p className="font-medium text-lg text-slate-600">No audience members found</p>
                            <p className="text-sm text-slate-400 mt-1">Try adjusting your filters or search query.</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredAudience.map((person) => (
                        <tr key={person.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-4">
                            {person.source === 'META_AD' ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
                                <span>📣</span> Meta Ads
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800">
                                <span>🌐</span> Website
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-4 text-sm text-slate-500 whitespace-nowrap">
                            {new Date(person.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-bold text-slate-900 mb-1">{person.name}</div>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                              <a href={`tel:${person.phone}`} className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1">
                                ☎ {person.phone}
                              </a>
                              {person.email && (
                                <a href={`mailto:${person.email}`} className="text-slate-500 hover:text-slate-800 inline-flex items-center gap-1">
                                  ✉ {person.email}
                                </a>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4 font-medium text-slate-700 text-sm max-w-[200px] truncate" title={person.course}>
                            {person.course}
                          </td>
                          <td className="py-4 px-4">
                            {person.type === 'registration' ? (
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase ${person.paymentStatus === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                                {person.paymentStatus === 'PAID' ? '₹97 Paid' : 'Pending'}
                              </span>
                            ) : (
                              <select 
                                value={person.leadStatus}
                                onChange={(e) => updateEnquiryStatus(person.originalId, e.target.value)}
                                className={`text-xs font-bold rounded-full px-3 py-1.5 border-0 focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm ${
                                  person.leadStatus === 'NEW' ? 'bg-blue-100 text-blue-800' :
                                  person.leadStatus === 'CONTACTED' ? 'bg-amber-100 text-amber-800' :
                                  person.leadStatus === 'INTERESTED' ? 'bg-purple-100 text-purple-800' :
                                  person.leadStatus === 'CONVERTED' ? 'bg-green-100 text-green-800' :
                                  'bg-red-100 text-red-800'
                                }`}
                              >
                                <option value="NEW">NEW</option>
                                <option value="CONTACTED">CONTACTED</option>
                                <option value="INTERESTED">INTERESTED</option>
                                <option value="CONVERTED">CONVERTED</option>
                                <option value="NOT_INTERESTED">NOT_INTERESTED</option>
                              </select>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
