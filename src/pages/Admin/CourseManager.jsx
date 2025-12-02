import React, { useState, useEffect, useRef } from 'react';
import {
  Plus, Edit2, Trash2, Image as ImageIcon, User, Upload, X,
  Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon,
  AlignLeft, AlignCenter, AlignRight, Loader, // Changed Loader2 to Loader
  Clock, BookOpen, Star, Users
} from 'lucide-react';
import AdminSidebar from './Sidebar';

// --- Firebase Imports ---
import { db, storage } from '../../firebase'; 
import { 
  collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const CourseManager = ({ setIsAdminLoggedIn }) => {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Image handling
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // Ref for the contentEditable div
  const editorRef = useRef(null);
  
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

  // 1. REAL-TIME FETCH (Sorted in Client-side to prevent Index Errors)
  useEffect(() => {
    const coursesRef = collection(db, "courses");
    
    const unsubscribe = onSnapshot(coursesRef, (snapshot) => {
      const coursesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Sort by createdAt desc (Newest first) safely in JS
      coursesData.sort((a, b) => {
        const dateA = a.createdAt?.seconds || 0;
        const dateB = b.createdAt?.seconds || 0;
        return dateB - dateA;
      });

      setCourses(coursesData);
      setLoading(false);
    }, (error) => {
        console.error("Error fetching courses:", error);
        setLoading(false);
    });

    return () => unsubscribe();
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
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToStorage = async (file) => {
    if (!file) return null;
    const storageRef = ref(storage, `course_images/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  // 2. ADD OR UPDATE COURSE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const finalDescription = editorRef.current ? editorRef.current.innerHTML : formData.description;
      let finalImageUrl = formData.imageUrl;

      if (imageFile) {
        finalImageUrl = await uploadImageToStorage(imageFile);
      }

      const courseData = { 
        ...formData, 
        description: finalDescription,
        imageUrl: finalImageUrl,
        createdAt: serverTimestamp()
      };

      if (editId) {
        const courseDoc = doc(db, "courses", editId);
        await updateDoc(courseDoc, courseData);
      } else {
        await addDoc(collection(db, "courses"), courseData);
      }
      resetForm();
    } catch (error) {
      console.error("Error saving course:", error);
      alert("Failed to save course. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ 
      title: '', description: '', category: 'Sanskrit', level: 'Beginner', 
      duration: '', students: 0, rating: 0, lessons: 0, price: '', imageUrl: '' 
    });
    setImagePreview(null);
    setImageFile(null);
    setShowForm(false);
    setEditId(null);
    if (editorRef.current) editorRef.current.innerHTML = '';
  };

  const handleEdit = (course) => {
    setFormData(course);
    setImagePreview(course.imageUrl);
    setImageFile(null);
    setEditId(course.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await deleteDoc(doc(db, "courses", id));
      } catch (error) {
        console.error("Error deleting course:", error);
        alert("Failed to delete course.");
      }
    }
  };

  // --- Rich Text Editor Tools ---
  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
      setFormData(prev => ({ ...prev, description: editorRef.current.innerHTML }));
    }
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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-serif font-bold text-[#561C24]">Course Management</h1>
              <p className="text-slate-500 mt-1">Manage your educational content</p>
            </div>
            <button
              onClick={() => { resetForm(); setShowForm(!showForm); }}
              className="bg-[#561C24] hover:bg-[#3d141a] text-white font-semibold py-2.5 px-6 rounded-lg transition-all flex items-center gap-2 shadow-lg cursor-pointer"
            >
              {showForm ? <X size={20} /> : <Plus size={20} />}
              {showForm ? 'Cancel' : 'Add Course'}
            </button>
          </div>

          {/* Add/Edit Form */}
          {showForm && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-xl p-8 mb-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                {editId ? <Edit2 size={24} className="text-[#561C24]" /> : <Plus size={24} className="text-[#561C24]" />}
                {editId ? 'Edit Course' : 'Add New Course'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-700 font-medium text-sm mb-2">Course Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:border-orange-500 outline-none"
                        placeholder="e.g. Introduction to Sanskrit"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-700 font-medium text-sm mb-2">Category</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 outline-none"
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
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 outline-none"
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
                           <input type="text" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none" placeholder="$49" />
                        </div>
                        <div>
                           <label className="block text-slate-700 font-medium text-sm mb-2">Lessons</label>
                           <input type="number" value={formData.lessons} onChange={(e) => setFormData({ ...formData, lessons: Number(e.target.value) })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none" placeholder="24" />
                        </div>
                        <div>
                           <label className="block text-slate-700 font-medium text-sm mb-2">Duration</label>
                           <input type="text" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none" placeholder="8 weeks" />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-slate-700 font-medium text-sm mb-2">Students</label>
                           <input type="number" value={formData.students} onChange={(e) => setFormData({ ...formData, students: Number(e.target.value) })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none" placeholder="1234" />
                        </div>
                        <div>
                           <label className="block text-slate-700 font-medium text-sm mb-2">Rating</label>
                           <input type="number" step="0.1" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none" placeholder="4.8" />
                        </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-700 font-medium text-sm mb-2">Cover Image</label>
                      <div className="flex items-center gap-4">
                        <label className="flex-1 cursor-pointer bg-slate-50 border border-dashed border-slate-300 hover:border-orange-500 rounded-lg p-3 flex items-center justify-center gap-2 transition-colors">
                          <Upload size={20} className="text-slate-400" />
                          <span className="text-slate-500 font-medium">Upload Image</span>
                          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                        </label>
                        {imagePreview && (
                          <div className="w-20 h-16 bg-slate-100 rounded overflow-hidden shrink-0 border border-slate-200">
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Rich Text Editor */}
                    <div>
                      <label className="block text-slate-700 font-medium text-sm mb-2">Description</label>
                      <div className="bg-slate-50 border border-slate-200 rounded-t-lg border-b-0">
                        <div className="flex flex-wrap items-center p-2 gap-1 bg-white">
                          <ToolbarBtn onClick={() => execCommand('bold')} icon={Bold} title="Bold" />
                          <ToolbarBtn onClick={() => execCommand('italic')} icon={Italic} title="Italic" />
                          <ToolbarBtn onClick={() => execCommand('underline')} icon={Underline} title="Underline" />
                          <Divider />
                          <ToolbarBtn onClick={() => execCommand('insertUnorderedList')} icon={List} title="List" />
                          <ToolbarBtn onClick={() => execCommand('insertOrderedList')} icon={ListOrdered} title="Ordered" />
                        </div>
                      </div>
                      <div
                        ref={editorRef}
                        contentEditable
                        onInput={(e) => setFormData({ ...formData, description: e.currentTarget.innerHTML })}
                        className="w-full min-h-[150px] px-4 py-3 bg-white border border-slate-200 rounded-b-lg text-slate-800 focus:outline-none focus:border-orange-500 overflow-y-auto"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg flex items-center gap-2"
                  >
                    {loading && <Loader className="animate-spin" size={20} />}
                    {editId ? 'Update Course' : 'Create Course'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Loading State */}
          {loading && (
             <div className="flex justify-center items-center py-20">
               <Loader className="w-12 h-12 text-[#561C24] animate-spin" />
             </div>
          )}

          {/* Course Grid (Matching Public UI) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {!loading && courses.length === 0 && (
              <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                <p className="text-slate-500">No courses found. Add a new course to get started.</p>
              </div>
            )}

            {!loading && courses.map((course) => (
              <article 
                key={course.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col h-full relative group border border-slate-100"
              >
                {/* ADMIN OVERLAY */}
                <div className="absolute top-16 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30">
                  <button onClick={() => handleEdit(course)} className="bg-white/90 p-2 rounded-full shadow-md hover:text-blue-600">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(course.id)} className="bg-white/90 p-2 rounded-full shadow-md hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Course Image */}
                <div className="relative h-64 overflow-hidden shrink-0 bg-slate-200">
                  <img
                    src={course.imageUrl || "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop"}
                    alt={course.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-[#561C24] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                    {course.level}
                  </div>
                  <div className="absolute top-4 left-4 bg-white text-[#561C24] px-3 py-1 rounded-full text-sm font-bold shadow-md">
                    {course.price}
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-[#E8D8C4] text-[#561C24] rounded-full text-xs font-semibold">
                          {course.category}
                      </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-[#561C24] transition-colors line-clamp-2">
                    {course.title}
                  </h3>

                  <div 
                      className="text-gray-600 mb-4 leading-relaxed line-clamp-2 text-sm"
                      dangerouslySetInnerHTML={{ __html: course.description }}
                  />

                  <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-gray-100 mt-auto">
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Clock className="w-3 h-3 text-[#561C24]" />
                      <span className="truncate">{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <BookOpen className="w-3 h-3 text-[#561C24]" />
                      <span className="truncate">{course.lessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Users className="w-3 h-3 text-[#561C24]" />
                      <span className="truncate">{course.students}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-gray-900">{course.rating}</span>
                      <span className="text-sm text-gray-500">({course.students})</span>
                    </div>
                    <button className="px-5 py-2 bg-[#561C24] text-white rounded-lg font-semibold hover:bg-[#6D2932] transition-colors text-sm">
                      Enroll Now
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseManager;