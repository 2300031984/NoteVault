// components/NoteList.jsx
import React from 'react';
import NoteItem from './NoteItem';
import '../styles/NoteList.css';

const NoteList = ({ notes, onEdit, onDelete }) => {
  if (notes.length === 0) {
    return (
      <div className="note-list-empty">
        <p>No notes yet. Create your first note above!</p>
      </div>
    );
  }

  return (
    <div className="note-list">
      <h2>Your Notes ({notes.length})</h2>
      <div className="notes-grid">
        {notes.map(note => (
          <NoteItem
            key={note.id}
            note={note}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default NoteList;