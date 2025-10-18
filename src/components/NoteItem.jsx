// components/NoteItem.jsx
import React from 'react';
import '../styles/NoteItem.css';

const NoteItem = ({ note, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="note-item">
      <div className="note-header">
        <h3 className="note-title">{note.title}</h3>
        <div className="note-actions">
          <button 
            onClick={() => onEdit(note)}
            className="edit-button"
            title="Edit note"
          >
            ✏️
          </button>
          <button 
            onClick={() => onDelete(note.id)}
            className="delete-button"
            title="Delete note"
          >
            🗑️
          </button>
        </div>
      </div>
      
      <div className="note-content">
        {note.content}
      </div>
      
      <div className="note-footer">
        <span className="note-date">
          Updated: {formatDate(note.updatedAt)}
        </span>
      </div>
    </div>
  );
};

export default NoteItem;