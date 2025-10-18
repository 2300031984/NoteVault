// components/NoteForm.jsx
import React, { useState, useEffect } from 'react';
import '../styles/NoteForm.css';

const NoteForm = ({ onSubmit, editingNote, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  useEffect(() => {
    if (editingNote) {
      setFormData({
        title: editingNote.title,
        content: editingNote.content
      });
    } else {
      setFormData({
        title: '',
        content: ''
      });
    }
  }, [editingNote]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.content.trim()) {
      onSubmit(formData);
      if (!editingNote) {
        setFormData({ title: '', content: '' });
      }
    }
  };

  return (
    <div className="note-form-container">
      <h2>{editingNote ? 'Edit Note' : 'Create New Note'}</h2>
      <form onSubmit={handleSubmit} className="note-form">
        <div className="form-group">
          <input
            type="text"
            name="title"
            placeholder="Note title"
            value={formData.title}
            onChange={handleChange}
            required
            className="title-input"
          />
        </div>
        
        <div className="form-group">
          <textarea
            name="content"
            placeholder="Note content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="6"
            className="content-textarea"
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-button">
            {editingNote ? 'Update Note' : 'Create Note'}
          </button>
          {editingNote && (
            <button 
              type="button" 
              onClick={onCancel}
              className="cancel-button"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NoteForm;