import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, Edit2, Trash2, Image as ImageIcon, Calendar, Upload, X, 
  Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon, 
  AlignLeft, AlignCenter, AlignRight, ArrowRight 
} from 'lucide-react';
import AdminSidebar from './Sidebar';

const BlogManager = ({ setIsAdminLoggedIn }) => {
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  // Ref for the contentEditable div
  const editorRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    date: '',
    imageUrl: '',
  });

  // Initial Sample Data (Optional: Used if DB is empty)
  const sampleData = [
    {
      id: 1,
      title: "The Importance of Sanskrit in Modern Education",
      author: "Alden Fletcher",
      content: "Discovering how ancient wisdom can shape contemporary learning...",
      date: "October 24, 2024",
      imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1000"
    }
  ];

  // 1. Fetch from "DB" (LocalStorage) on load
  useEffect(() => {
    const saved = localStorage.getItem('blogs');
    if (saved) {
      const parsedData = JSON.parse(saved);
      // Only set if there is data, otherwise you might want to start fresh or use samples
      setBlogs(parsedData.length > 0 ? parsedData : sampleData);
    } else {
      setBlogs(sampleData);
    }
  }, []);

  // 2. Sync to "DB" (LocalStorage) whenever 'blogs' state changes
  useEffect(() => {
    localStorage.setItem('blogs', JSON.stringify(blogs));
  }, [blogs]);

  // Sync formData content to editor when editing starts
  useEffect(() => {
    if (showForm && editorRef.current) {
      editorRef.current.innerHTML = formData.content;
    }
  }, [showForm, editId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      // Update existing blog
      setBlogs(blogs.map(b => b.id === editId ? { ...formData, id: editId } : b));
      setEditId(null);
    } else {
      // Create new blog
      const newBlog = {
        ...formData,
        id: Date.now(), // Simple unique ID
        date: formData.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      };
      setBlogs([...blogs, newBlog]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({ title: '', author: '', content: '', date: '', imageUrl: '' });
    setImagePreview(null);
    setShowForm(false);
    setEditId(null);
    if (editorRef.current) editorRef.current.innerHTML = '';
  };

  const handleEdit = (blog) => {
    setFormData(blog);
    setImagePreview(blog.imageUrl);
    setEditId(blog.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      setBlogs(blogs.filter(b => b.id !== id));
    }
  };

  // --- Rich Text Editor Functions ---
  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
      setFormData({ ...formData, content: editorRef.current.innerHTML });
    }
  };

  const handleLink = () => {
    const url = prompt('Enter URL:');
    if (url) execCommand('createLink', url);
  };

  const handleImageEmbed = () => {
    const url = prompt('Enter Image URL:');
    if (url) execCommand('insertImage', url);
  };

  const ToolbarBtn = ({ onClick, icon: Icon, title }) => (
    <button 
      type="button" 
      onClick={(e) => { e.preventDefault(); onClick(); }}
      className="p-2 text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors"
      title={title}
    >
      <Icon size={18} strokeWidth={2} />
    </button>
  );

  const Divider = () => <div className="w-px h-6 bg-slate-300 mx-1 self-center opacity-50" />;

  return (
    <div className="flex font-sans bg-[#FDFBF7] min-h-screen">
      <AdminSidebar setIsAdminLoggedIn={setIsAdminLoggedIn} />
      
      <div className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-4xl font-serif font-bold text-slate-900">Articles & News</h1>
              <p className="text-slate-500 mt-2">Manage your latest publications</p>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowForm(!showForm);
              }}
              className="bg-[#561C24] hover:bg-[#3d141a] cursor-pointer text-white font-medium py-2.5 px-6 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-orange-600/20"
            >
              {showForm ? <X size={20} /> : <Plus size={20} />}
              {showForm ? 'Cancel' : 'Add New Article'}
            </button>
          </div>

          {/* Add/Edit Form */}
          {showForm && (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8 mb-12 animate-fade-in">
              <h2 className="text-2xl cursor-pointer font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                {editId ? <Edit2 size={24} className="text-orange-500" /> : <Plus size={24} className="text-orange-500" />}
                {editId ? 'Edit Article' : 'Create Article'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Left Column */}
                  <div className="space-y-5">
                    <div>
                      <label className="block text-slate-700 font-semibold text-sm mb-2">Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 placeholder-slate-400"
                        placeholder="Article Title"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                        <label className="block text-slate-700 font-semibold text-sm mb-2">Author</label>
                        <input
                            type="text"
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            required
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-orange-500 placeholder-slate-400"
                            placeholder="Author Name"
                        />
                        </div>
                    </div>

                    <div>
                        <label className="block text-slate-700 font-semibold text-sm mb-2">Publish Date</label>
                        <input
                            type="text"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-orange-500 placeholder-slate-400"
                            placeholder="e.g. October 24, 2024"
                        />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-5">
                    <div>
                        <label className="block text-slate-700 font-semibold text-sm mb-2">Cover Image</label>
                        <div className="flex items-center gap-4">
                            <label className="flex-1 cursor-pointer bg-slate-50 border border-dashed border-slate-300 hover:border-orange-500 rounded-lg p-3 flex items-center justify-center gap-2 transition-colors group">
                                <Upload size={20} className="text-slate-400 group-hover:text-orange-500" />
                                <span className="text-slate-500 group-hover:text-orange-500 font-medium">Upload Image</span>
                                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                            </label>
                            {imagePreview && (
                                <div className="w-20 h-16 bg-slate-100 rounded-lg overflow-hidden shrink-0 shadow-sm border border-slate-200">
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Rich Text Editor Area */}
                    <div>
                      <label className="block text-slate-700 font-semibold text-sm mb-2">Content</label>
                      <div className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-orange-500 focus-within:border-orange-500">
                         {/* Toolbar */}
                         <div className="flex flex-wrap items-center p-2 gap-1 border-b border-slate-200 bg-white">
                            <ToolbarBtn onClick={() => execCommand('bold')} icon={Bold} title="Bold" />
                            <ToolbarBtn onClick={() => execCommand('italic')} icon={Italic} title="Italic" />
                            <ToolbarBtn onClick={() => execCommand('underline')} icon={Underline} title="Underline" />
                            <Divider />
                            <ToolbarBtn onClick={() => execCommand('insertUnorderedList')} icon={List} title="Unordered List" />
                            <ToolbarBtn onClick={() => execCommand('insertOrderedList')} icon={ListOrdered} title="Ordered List" />
                            <Divider />
                            <ToolbarBtn onClick={handleImageEmbed} icon={ImageIcon} title="Insert Image" />
                            <ToolbarBtn onClick={handleLink} icon={LinkIcon} title="Insert Link" />
                            <Divider />
                            <ToolbarBtn onClick={() => execCommand('justifyLeft')} icon={AlignLeft} title="Align Left" />
                            <ToolbarBtn onClick={() => execCommand('justifyCenter')} icon={AlignCenter} title="Align Center" />
                            <ToolbarBtn onClick={() => execCommand('justifyRight')} icon={AlignRight} title="Align Right" />
                         </div>

                         {/* Editor */}
                         <div 
                           ref={editorRef}
                           contentEditable
                           onInput={(e) => setFormData({ ...formData, content: e.currentTarget.innerHTML })}
                           className="w-full min-h-[200px] px-4 py-3 bg-white text-slate-800 font-sans text-sm leading-relaxed overflow-y-auto prose prose-slate max-w-none focus:outline-none"
                         />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="bg-orange-600 cursor-pointer hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg shadow-orange-600/20"
                  >
                    {editId ? 'Update Article' : 'Publish Article'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Blog List Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.length === 0 && (
              <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                <p className="text-slate-500">No blog posts added yet.</p>
              </div>
            )}

            {blogs.map((blog) => (
              <div 
                key={blog.id} 
                className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden border border-slate-100"
              >
                 {/* Admin Controls */}
                 <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30">
                  <button 
                    onClick={() => handleEdit(blog)}
                    className="bg-white text-slate-700 cursor-pointer hover:text-orange-600 p-2 rounded-full shadow-lg transition-transform hover:scale-110"
                    title="Edit"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(blog.id)}
                    className="bg-white text-slate-700 cursor-pointer hover:text-red-600 p-2 rounded-full shadow-lg transition-transform hover:scale-110"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Image Section */}
                <div className="h-60 overflow-hidden relative">
                  {blog.imageUrl ? (
                    <img 
                      src={blog.imageUrl} 
                      alt={blog.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                        <ImageIcon size={40} />
                    </div>
                  )}
                </div>

                {/* Content Container */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={14} className="text-orange-600" />
                    <span className="text-orange-600 text-xs font-semibold tracking-wide uppercase">{blog.date}</span>
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-slate-900 leading-tight mb-3 group-hover:text-orange-700 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <div 
                    className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1"
                    // Display preview of content, stripping HTML tags just for safety in preview
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />

                  <div className="mt-auto">
                    <button className="inline-flex cursor-pointer items-center gap-2 text-orange-600 font-bold text-sm hover:gap-3 transition-all group/link">
                        Read More
                        <ArrowRight size={16} className="transition-transform" />
                    </button>
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

export default BlogManager;