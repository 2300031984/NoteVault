// components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { notesAPI } from '../services/api';
import NoteForm from './NoteForm';
import NoteList from './NoteList';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { user, logout } = useAuth();

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setLoading(true);
      const response = await notesAPI.getAll();
      setNotes(response.data);
      setError('');
    } catch (error) {
      setError('Failed to load notes');
      console.error('Error loading notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (noteData) => {
    try {
      await notesAPI.create(noteData);
      await loadNotes();
    } catch (error) {
      setError('Failed to create note');
      console.error('Error creating note:', error);
    }
  };

  const handleUpdate = async (noteData) => {
    try {
      await notesAPI.update(editingNote.id, noteData);
      setEditingNote(null);
      await loadNotes();
    } catch (error) {
      setError('Failed to update note');
      console.error('Error updating note:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await notesAPI.delete(id);
        await loadNotes();
      } catch (error) {
        setError('Failed to delete note');
        console.error('Error deleting note:', error);
      }
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>SecureNote</h1>
          <div className="user-info">
            <span>Welcome, {user?.username}</span>
            <button onClick={logout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        {error && <div className="error-message">{error}</div>}
        
        <NoteForm 
          onSubmit={editingNote ? handleUpdate : handleCreate}
          editingNote={editingNote}
          onCancel={handleCancelEdit}
        />
        
        {loading ? (
          <div className="loading">Loading notes...</div>
        ) : (
          <NoteList 
            notes={notes}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;