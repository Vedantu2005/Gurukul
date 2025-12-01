import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit2, Trash2, Calendar, MapPin, 
  BookOpen, Hash, Star, X, Save, FileText 
} from 'lucide-react';
import { 
  collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy 
} from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust path based on your folder structure
import AdminSidebar from './Sidebar';

const ResearchManager = ({ setIsAdminLoggedIn }) => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    conf: '',
    loc: '',
    date: '',
    type: 'Paper',
    isbn: '',
    highlight: false
  });

  const types = ["Paper", "Doctoral", "Presentation", "Poster", "Journal", "Book Chapter"];

  // --- Real-time Fetch from Firestore ---
  useEffect(() => {
    const q = query(collection(db, 'researchPapers'), orderBy('date', 'desc')); // Optional: sort by date if format allows, otherwise remove orderBy
    
    // Fallback query if date format (string) causes sorting issues
    // const q = collection(db, 'researchPapers'); 

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPapers = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPapers(fetchedPapers);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching papers:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // --- Form Handlers ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // Update existing
        const paperRef = doc(db, 'researchPapers', editId);
        await updateDoc(paperRef, formData);
      } else {
        // Create new
        await addDoc(collection(db, 'researchPapers'), {
          ...formData,
          createdAt: new Date()
        });
      }
      resetForm();
    } catch (error) {
      console.error("Error saving paper:", error);
      alert("Failed to save research paper.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this research paper?')) {
      try {
        await deleteDoc(doc(db, 'researchPapers', id));
      } catch (error) {
        console.error("Error deleting paper:", error);
      }
    }
  };

  const handleEdit = (paper) => {
    setFormData({
      title: paper.title,
      conf: paper.conf,
      loc: paper.loc,
      date: paper.date,
      type: paper.type,
      isbn: paper.isbn || '',
      highlight: paper.highlight || false
    });
    setEditId(paper.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      conf: '',
      loc: '',
      date: '',
      type: 'Paper',
      isbn: '',
      highlight: false
    });
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div className="flex font-sans bg-[#FDFBF7] min-h-screen">
      <AdminSidebar setIsAdminLoggedIn={setIsAdminLoggedIn} />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-4xl font-serif font-bold text-slate-900">Research & Publications</h1>
              <p className="text-slate-500 mt-2">Manage your academic contributions</p>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowForm(!showForm);
              }}
              className="bg-[#561C24] hover:bg-[#3d141a] text-white font-medium py-2.5 px-6 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-[#561C24]/20 cursor-pointer"
            >
              {showForm ? <X size={20} /> : <Plus size={20} />}
              {showForm ? 'Cancel' : 'Add New Paper'}
            </button>
          </div>

          {/* Form Section */}
          {showForm && (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8 mb-12 animate-fade-in">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                {editId ? <Edit2 size={24} className="text-[#561C24]" /> : <Plus size={24} className="text-[#561C24]" />}
                {editId ? 'Edit Research Paper' : 'Add Research Paper'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Full Width Title */}
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-slate-700 font-semibold text-sm mb-2">Paper Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-[#561C24] focus:outline-none"
                      placeholder="Enter the full title of the research paper"
                    />
                  </div>

                  {/* Conference / Publication Name */}
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-slate-700 font-semibold text-sm mb-2">Conference / Publication</label>
                    <input
                      type="text"
                      value={formData.conf}
                      onChange={(e) => setFormData({ ...formData, conf: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-[#561C24] focus:outline-none"
                      placeholder="e.g. International Conference on Marketing"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-slate-700 font-semibold text-sm mb-2">Location / Institute</label>
                    <div className="relative">
                      <MapPin size={18} className="absolute left-3 top-3.5 text-slate-400" />
                      <input
                        type="text"
                        value={formData.loc}
                        onChange={(e) => setFormData({ ...formData, loc: e.target.value })}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-[#561C24] focus:outline-none"
                        placeholder="e.g. IIM Bangalore"
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-slate-700 font-semibold text-sm mb-2">Date / Year</label>
                    <div className="relative">
                      <Calendar size={18} className="absolute left-3 top-3.5 text-slate-400" />
                      <input
                        type="text"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-[#561C24] focus:outline-none"
                        placeholder="e.g. April 2015"
                      />
                    </div>
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block text-slate-700 font-semibold text-sm mb-2">Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-[#561C24] focus:outline-none"
                    >
                      {types.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  {/* ISBN (Optional) */}
                  <div>
                    <label className="block text-slate-700 font-semibold text-sm mb-2">ISBN (Optional)</label>
                    <div className="relative">
                      <Hash size={18} className="absolute left-3 top-3.5 text-slate-400" />
                      <input
                        type="text"
                        value={formData.isbn}
                        onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-[#561C24] focus:outline-none"
                        placeholder="e.g. 978-1-63041-998-1"
                      />
                    </div>
                  </div>

                  {/* Highlight Checkbox */}
                  <div className="flex items-center gap-3 pt-6">
                    <div 
                      onClick={() => setFormData({ ...formData, highlight: !formData.highlight })}
                      className={`w-6 h-6 rounded border cursor-pointer flex items-center justify-center transition-colors ${formData.highlight ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-slate-300 bg-white'}`}
                    >
                      {formData.highlight && <Star size={14} className="text-white fill-current" />}
                    </div>
                    <label className="text-slate-700 font-semibold text-sm cursor-pointer select-none" onClick={() => setFormData({ ...formData, highlight: !formData.highlight })}>
                      Highlight this paper (Featured)
                    </label>
                  </div>

                </div>

                <div className="pt-4 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-2.5 text-slate-600 font-semibold hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#561C24] hover:bg-[#3d141a] text-white font-bold py-2.5 px-8 rounded-lg transition-all flex items-center gap-2 shadow-lg"
                  >
                    <Save size={18} />
                    {editId ? 'Update Paper' : 'Save Paper'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Data List */}
          <div className="space-y-4">
            {papers.length === 0 && !loading && (
              <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
                <p className="text-slate-500">No research papers found.</p>
              </div>
            )}

            {papers.map((paper) => (
              <div 
                key={paper.id} 
                className={`bg-white p-6 rounded-xl border transition-all hover:shadow-lg flex flex-col md:flex-row gap-6 relative group
                  ${paper.highlight ? 'border-l-4 border-l-[#D4AF37] border-slate-200' : 'border-slate-200 hover:border-[#561C24]'}
                `}
              >
                {/* Admin Actions */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleEdit(paper)}
                    className="p-2 text-slate-400 hover:text-[#561C24] hover:bg-[#561C24]/5 rounded-full transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(paper.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Icon Column */}
                <div className="hidden md:flex flex-col items-center justify-center min-w-[60px]">
                   <div className={`p-3 rounded-full ${paper.highlight ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'bg-slate-100 text-slate-500'}`}>
                      {paper.highlight ? <Star size={24} className="fill-current" /> : <FileText size={24} />}
                   </div>
                </div>

                {/* Content Column */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-full">
                      {paper.type}
                    </span>
                    <span className="flex items-center text-xs font-semibold text-[#561C24]">
                      <Calendar size={14} className="mr-1" />
                      {paper.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight pr-16">
                    {paper.title}
                  </h3>

                  <div className="text-sm text-slate-600 space-y-1">
                    <div className="flex items-start gap-2">
                       <BookOpen size={16} className="mt-0.5 shrink-0 text-slate-400" />
                       <span>{paper.conf}</span>
                    </div>
                    <div className="flex items-start gap-2">
                       <MapPin size={16} className="mt-0.5 shrink-0 text-slate-400" />
                       <span>{paper.loc}</span>
                    </div>
                    {paper.isbn && (
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mt-2">
                        <Hash size={14} /> ISBN: {paper.isbn}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResearchManager;