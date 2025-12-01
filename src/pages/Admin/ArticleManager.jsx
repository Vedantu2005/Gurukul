import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit2, Trash2, BookOpen, FileText, 
  Save, X, Star, Hash, Bookmark 
} from 'lucide-react';
import { 
  collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy 
} from 'firebase/firestore';
import { db } from '../../firebase'; 
import AdminSidebar from './Sidebar';

const ArticleManager = ({ setIsAdminLoggedIn }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    publication: '',
    year: '',
    type: 'Journal',
    details: '',
    impactFactor: '',
    isbn: '',
    category: 'Main', // 'Main' for main list, 'Ergo' for Ergo Magazine section
    highlight: false
  });

  const types = ["Journal", "Book Chapter", "Article", "International", "Conference"];
  const categories = ["Main", "Ergo"];

  // 1. Fetch Data
  useEffect(() => {
    const q = query(collection(db, 'articles'), orderBy('year', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setArticles(fetchedData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateDoc(doc(db, 'articles', editId), formData);
      } else {
        await addDoc(collection(db, 'articles'), {
          ...formData,
          createdAt: new Date().toISOString()
        });
      }
      resetForm();
    } catch (error) {
      console.error("Error saving article:", error);
      alert("Failed to save article.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this article?')) {
      try {
        await deleteDoc(doc(db, 'articles', id));
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      publication: item.publication || '',
      year: item.year,
      type: item.type || 'Journal',
      details: item.details || '',
      impactFactor: item.impactFactor || '',
      isbn: item.isbn || '',
      category: item.category || 'Main',
      highlight: item.highlight || false
    });
    setEditId(item.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setFormData({
      title: '', publication: '', year: '', type: 'Journal', 
      details: '', impactFactor: '', isbn: '', category: 'Main', highlight: false
    });
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div className="flex font-sans bg-[#FDFBF7] min-h-screen">
      <AdminSidebar setIsAdminLoggedIn={setIsAdminLoggedIn} />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-bold text-[#561C24]">Article Publications</h1>
              <p className="text-slate-500 mt-2">Manage journals, book chapters, and magazine articles</p>
            </div>
            <button
              onClick={() => { resetForm(); setShowForm(!showForm); }}
              className="bg-[#561C24] text-white px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#3d141a] transition-all shadow-lg"
            >
              {showForm ? <X size={20} /> : <Plus size={20} />}
              {showForm ? 'Cancel' : 'Add Article'}
            </button>
          </div>

          {showForm && (
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 mb-12 animate-fade-in">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="col-span-2">
                    <label className="block text-slate-700 font-semibold text-sm mb-2">Title</label>
                    <input
                      className="w-full px-4 py-3 border rounded-lg focus:border-[#561C24] outline-none"
                      placeholder="Article Title"
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      required
                    />
                  </div>

                  {/* Publication */}
                  <div className="col-span-2">
                    <label className="block text-slate-700 font-semibold text-sm mb-2">Publication / Journal Name</label>
                    <input
                      className="w-full px-4 py-3 border rounded-lg focus:border-[#561C24] outline-none"
                      placeholder="e.g. International Journal of Research"
                      value={formData.publication}
                      onChange={e => setFormData({...formData, publication: e.target.value})}
                    />
                  </div>

                  {/* Year & Type */}
                  <div>
                    <label className="block text-slate-700 font-semibold text-sm mb-2">Year</label>
                    <input
                      className="w-full px-4 py-3 border rounded-lg focus:border-[#561C24] outline-none"
                      placeholder="e.g. 2017"
                      value={formData.year}
                      onChange={e => setFormData({...formData, year: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold text-sm mb-2">Type</label>
                    <select
                      className="w-full px-4 py-3 border rounded-lg focus:border-[#561C24] outline-none bg-white"
                      value={formData.type}
                      onChange={e => setFormData({...formData, type: e.target.value})}
                    >
                      {types.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  {/* Details & Category */}
                  <div>
                    <label className="block text-slate-700 font-semibold text-sm mb-2">Volume/Issue Details</label>
                    <input
                      className="w-full px-4 py-3 border rounded-lg focus:border-[#561C24] outline-none"
                      placeholder="Vol 2, Issue 10, pp 492–497"
                      value={formData.details}
                      onChange={e => setFormData({...formData, details: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold text-sm mb-2">Section Category</label>
                    <select
                      className="w-full px-4 py-3 border rounded-lg focus:border-[#561C24] outline-none bg-white"
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="Main">Main Publications List</option>
                      <option value="Ergo">Ergo Magazine (Bottom Section)</option>
                    </select>
                  </div>

                  {/* Impact Factor & ISBN */}
                  <div>
                    <label className="block text-slate-700 font-semibold text-sm mb-2">Impact Factor</label>
                    <input
                      className="w-full px-4 py-3 border rounded-lg focus:border-[#561C24] outline-none"
                      placeholder="e.g. 5.742"
                      value={formData.impactFactor}
                      onChange={e => setFormData({...formData, impactFactor: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold text-sm mb-2">ISBN / ISSN</label>
                    <input
                      className="w-full px-4 py-3 border rounded-lg focus:border-[#561C24] outline-none"
                      placeholder="e.g. 978-1-5136-1658-2"
                      value={formData.isbn}
                      onChange={e => setFormData({...formData, isbn: e.target.value})}
                    />
                  </div>

                  {/* Highlight */}
                  <div className="col-span-2 flex items-center gap-3 pt-2">
                    <input 
                      type="checkbox" 
                      id="highlight"
                      checked={formData.highlight} 
                      onChange={e => setFormData({...formData, highlight: e.target.checked})}
                      className="w-5 h-5 accent-[#561C24]"
                    />
                    <label htmlFor="highlight" className="text-slate-700 font-medium cursor-pointer">Highlight this article (Featured)</label>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button type="submit" className="bg-[#561C24] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#3d141a] transition-all shadow-md">
                    {editId ? 'Update Article' : 'Save Article'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* List Display */}
          <div className="space-y-4">
            {articles.length === 0 && !loading && (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300 text-slate-500">
                No articles found. Add one to get started.
              </div>
            )}

            {articles.map((item) => (
              <div 
                key={item.id} 
                className={`bg-white p-6 rounded-xl border relative group hover:shadow-lg transition-all
                  ${item.highlight ? 'border-l-4 border-l-[#D4AF37] border-slate-200' : 'border-slate-200 hover:border-[#561C24]'}
                `}
              >
                <div className="absolute top-4 right-4 hidden group-hover:flex gap-2">
                  <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"><Edit2 size={18}/></button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"><Trash2 size={18}/></button>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${item.category === 'Ergo' ? 'bg-purple-100 text-purple-600' : 'bg-[#F9F5F1] text-[#561C24]'}`}>
                    {item.category === 'Ergo' ? <Bookmark size={24} /> : (item.type === 'Book Chapter' ? <BookOpen size={24}/> : <FileText size={24}/>)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">{item.year}</span>
                      <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded uppercase">{item.type}</span>
                      {item.category === 'Ergo' && <span className="text-xs font-bold bg-purple-100 text-purple-600 px-2 py-1 rounded">Ergo Magazine</span>}
                    </div>
                    
                    <h3 className="font-bold text-lg text-slate-800 leading-tight mb-1 pr-12">{item.title}</h3>
                    {item.publication && <p className="text-sm text-slate-600 italic">{item.publication}</p>}
                    
                    <div className="flex gap-4 mt-2 text-xs text-slate-500 font-mono">
                      {item.impactFactor && <span>Impact: {item.impactFactor}</span>}
                      {item.isbn && <span>ISBN: {item.isbn}</span>}
                    </div>
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

export default ArticleManager;