/* eslint-disable react/prop-types */
export default function NoteForm({ addNote, newNote, setNewnote }) {
  return (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={setNewnote} />
      <button type="submit">Save</button>
    </form>
  )
}
