import React, { useState, useEffect, useRef } from 'react';
import {
  Plus, Edit2, Trash2, Image as ImageIcon, User, Upload, X,
  Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon,
  AlignLeft, AlignCenter, AlignRight, AlignJustify, Undo, Redo,
  Clock, BookOpen, Star 
} from 'lucide-react';
import AdminSidebar from './Sidebar';

// FIREBASE IMPORTS
import { db } from '../../firebase'; 
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const CourseManager = ({ setIsAdminLoggedIn }) => {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Ref for the contentEditable div
  const editorRef = useRef(null);
  
  // Reference to the 'courses' collection in Firestore
  const coursesCollectionRef = collection(db, "courses");

  const [formData, setFormData] = useState({
    title: '',
    description: '', 
    category: 'Sanskrit',
    level: 'Beginner',
    duration: '',
    students: 0,
    rating: 0,
    lessons: 0,
    price: '',
    imageUrl: '',
  });

  // 1. FETCH COURSES FROM FIREBASE
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const data = await getDocs(coursesCollectionRef);
      setCourses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Sync formData content to editor when editing starts
  useEffect(() => {
    if (showForm && editorRef.current) {
      editorRef.current.innerHTML = formData.description;
    }
  }, [showForm, editId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // WARNING: Firestore has a 1MB limit per document. 
      if (file.size > 1048576) { 
        alert("File is too big! Please use an image smaller than 1MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 2. ADD OR UPDATE COURSE IN FIREBASE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const finalDescription = editorRef.current ? editorRef.current.innerHTML : formData.description;
    const courseData = { ...formData, description: finalDescription };

    try {
      if (editId) {
        // Update existing document
        const courseDoc = doc(db, "courses", editId);
        await updateDoc(courseDoc, courseData);
        
        // Update local state
        setCourses(courses.map(c => c.id === editId ? { ...courseData, id: editId } : c));
      } else {
        // Add new document
        await addDoc(coursesCollectionRef, courseData);
        // Refresh list
        fetchCourses();
      }
      resetForm();
    } catch (error) {
      console.error("Error saving course:", error);
      alert("Failed to save course. Check console for details.");
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({ 
      title: '', description: '', category: 'Sanskrit', level: 'Beginner', 
      duration: '', students: 0, rating: 0, lessons: 0, price: '', imageUrl: '' 
    });
    setImagePreview(null);
    setShowForm(false);
    setEditId(null);
    if (editorRef.current) editorRef.current.innerHTML = '';
  };

  const handleEdit = (course) => {
    setFormData(course);
    setImagePreview(course.imageUrl);
    setEditId(course.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 3. DELETE COURSE FROM FIREBASE
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        const courseDoc = doc(db, "courses", id);
        await deleteDoc(courseDoc);
        setCourses(courses.filter(c => c.id !== id));
      } catch (error) {
        console.error("Error deleting course:", error);
        alert("Failed to delete course.");
      }
    }
  };

  // --- Rich Text Editor Functions ---
  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
      setFormData({ ...formData, description: editorRef.current.innerHTML });
    }
  };

  const ToolbarBtn = ({ onClick, icon: Icon, title }) => (
    <button
      type="button"
      onClick={(e) => { e.preventDefault(); onClick(); }}
      className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded transition-colors cursor-pointer"
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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-serif font-bold text-[#561C24]">Course Management</h1>
              <p className="text-slate-500 mt-1">Manage your educational content</p>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowForm(!showForm);
              }}
              disabled={loading}
              className="bg-[#561C24] hover:bg-[#3d141a] text-white font-semibold py-2.5 px-6 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-[#561C24]/20 cursor-pointer disabled:opacity-50"
            >
              {showForm ? <X size={20} /> : <Plus size={20} />}
              {showForm ? 'Cancel' : 'Add Course'}
            </button>
          </div>

          {loading && (
             <div className="text-center py-4 text-[#561C24] font-semibold animate-pulse">Processing Data...</div>
          )}

          {/* Add/Edit Form */}
          {showForm && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-xl p-8 mb-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                {editId ? <Edit2 size={24} className="text-[#561C24]" /> : <Plus size={24} className="text-[#561C24]" />}
                {editId ? 'Edit Course' : 'Add New Course'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-700 font-medium text-sm mb-2">Course Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-[#561C24]"
                        placeholder="e.g. Introduction to Sanskrit"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-700 font-medium text-sm mb-2">Category</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-[#561C24] cursor-pointer"
                        >
                          <option value="Sanskrit">Sanskrit</option>
                          <option value="Vedic Studies">Vedic Studies</option>
                          <option value="Yoga">Yoga</option>
                          <option value="Meditation">Meditation</option>
                          <option value="Ayurveda">Ayurveda</option>
                          <option value="Philosophy">Philosophy</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-700 font-medium text-sm mb-2">Level</label>
                        <select
                          value={formData.level}
                          onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-[#561C24] cursor-pointer"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                           <label className="block text-slate-700 font-medium text-sm mb-2">Price</label>
                           <input type="text" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900" placeholder="$49" />
                        </div>
                        <div>
                           <label className="block text-slate-700 font-medium text-sm mb-2">Lessons</label>
                           <input type="number" value={formData.lessons} onChange={(e) => setFormData({ ...formData, lessons: Number(e.target.value) })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900" placeholder="24" />
                        </div>
                        <div>
                           <label className="block text-slate-700 font-medium text-sm mb-2">Duration</label>
                           <input type="text" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900" placeholder="8 weeks" />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-slate-700 font-medium text-sm mb-2">Students Count</label>
                           <input type="number" value={formData.students} onChange={(e) => setFormData({ ...formData, students: Number(e.target.value) })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900" placeholder="1234" />
                        </div>
                        <div>
                           <label className="block text-slate-700 font-medium text-sm mb-2">Rating (0-5)</label>
                           <input type="number" step="0.1" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900" placeholder="4.8" />
                        </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-700 font-medium text-sm mb-2">Cover Image</label>
                      <div className="flex items-center gap-4">
                        <label className="flex-1 cursor-pointer bg-slate-50 border border-dashed border-slate-300 hover:border-[#561C24] rounded-lg p-3 flex items-center justify-center gap-2 transition-colors group">
                          <Upload size={20} className="text-slate-400 group-hover:text-[#561C24]" />
                          <span className="text-slate-500 group-hover:text-[#561C24]">Choose File</span>
                          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                        </label>
                        {imagePreview && (
                          <div className="w-20 h-16 bg-slate-100 rounded overflow-hidden shrink-0 border border-slate-200">
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-red-500 mt-1">Note: Images must be under 1MB.</p>
                    </div>

                    {/* Rich Text Editor Area */}
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <label className="block text-slate-700 font-medium text-sm">Description</label>
                      </div>

                      <div className="bg-slate-50 border border-slate-200 rounded-t-lg border-b-0">
                        <div className="flex flex-wrap items-center p-2 gap-1">
                          <ToolbarBtn onClick={() => execCommand('bold')} icon={Bold} title="Bold" />
                          <ToolbarBtn onClick={() => execCommand('italic')} icon={Italic} title="Italic" />
                          <ToolbarBtn onClick={() => execCommand('underline')} icon={Underline} title="Underline" />
                          <Divider />
                          <ToolbarBtn onClick={() => execCommand('insertUnorderedList')} icon={List} title="Unordered List" />
                          <ToolbarBtn onClick={() => execCommand('insertOrderedList')} icon={ListOrdered} title="Ordered List" />
                          <Divider />
                          <ToolbarBtn onClick={() => execCommand('justifyLeft')} icon={AlignLeft} title="Align Left" />
                          <ToolbarBtn onClick={() => execCommand('justifyCenter')} icon={AlignCenter} title="Align Center" />
                        </div>
                      </div>

                      <div
                        ref={editorRef}
                        contentEditable
                        onInput={(e) => setFormData({ ...formData, description: e.currentTarget.innerHTML })}
                        className="w-full min-h-[150px] px-4 py-3 bg-white border border-slate-200 rounded-b-lg text-slate-800 focus:outline-none focus:border-[#561C24] font-sans text-sm leading-relaxed overflow-y-auto cursor-text"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#561C24] hover:bg-[#3d141a] text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-[#561C24]/20 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : (editId ? 'Update Course' : 'Create Course')}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Course Grid - Matches the uploaded Image Design */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.length === 0 && !loading && (
              <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                <p className="text-slate-500">No courses available in Database.</p>
              </div>
            )}

            {courses.map((course) => (
              <div
                key={course.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-slate-100 relative"
              >
                 {/* Admin Action Buttons (Overlay) */}
                 <div className="absolute top-14 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30">
                  <button onClick={() => handleEdit(course)} className="bg-white/90 p-2 rounded-full shadow-md hover:text-blue-600 cursor-pointer"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(course.id)} className="bg-white/90 p-2 rounded-full shadow-md hover:text-red-600 cursor-pointer"><Trash2 size={16} /></button>
                </div>

                {/* Image Section with Overlays */}
                <div className="relative h-56 bg-slate-200">
                  {course.imageUrl ? (
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <ImageIcon size={40} />
                    </div>
                  )}
                  
                  {/* Price Tag (Top Left) */}
                  <div className="absolute top-4 left-4 bg-white text-slate-900 font-bold px-3 py-1 rounded-full text-sm shadow-md">
                     {course.price}
                  </div>

                  {/* Level Tag (Top Right) */}
                  <div className="absolute top-4 right-4 bg-[#561C24] text-white px-3 py-1 rounded-full text-xs font-medium shadow-md">
                     {course.level}
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6 flex flex-col flex-1">
                  
                  {/* Category Badge */}
                  <div className="mb-3">
                     <span className="bg-[#F5E6D3] text-[#8B4513] text-xs font-semibold px-3 py-1 rounded-full">
                        {course.category}
                     </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-slate-900 font-bold text-xl leading-snug mb-3">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <div className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                     <div dangerouslySetInnerHTML={{ __html: course.description }} />
                  </div>

                  {/* Meta Stats Row */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4 text-slate-500 text-xs">
                     <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        <span>{course.duration}</span>
                     </div>
                     <div className="flex items-center gap-1.5">
                        <BookOpen size={14} />
                        <span>{course.lessons} lessons</span>
                     </div>
                     <div className="flex items-center gap-1.5">
                        <User size={14} />
                        <span>{course.students}</span>
                     </div>
                  </div>

                  {/* Footer Row: Rating and Button */}
                  <div className="mt-auto flex items-center justify-between">
                     <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-slate-900 font-bold text-sm">{course.rating}</span>
                        <span className="text-slate-400 text-xs">({course.students})</span>
                     </div>
                     
                     <button className="bg-[#561C24] hover:bg-[#3d141a] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer">
                        Enroll Now
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

export default CourseManager;