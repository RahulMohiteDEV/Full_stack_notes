import React from 'react'
import './index.css'
import axios from 'axios'
import { useState, useEffect } from 'react'


const App = () => {
 
  const [notes, setNotes] = useState([
    {
      title: 'My first note 1',
      description: 'This is the content of my first note.'
    },
     {
      title: 'My first note 2',
      description: 'This is the content of my second note.'
    }, {
      title: 'My first note 3',
      description: 'This is the content of my third note.'
    }, {
      title: 'My first note 4',
      description: 'This is the content of my fourth note.'
    }
  ])

  function fetchNotes(){
     axios.get('http://localhost:3000/notes')
   .then((res) => {
    setNotes(res.data.notes)
   })
  }

useEffect(() => {
   fetchNotes();
},[])

function handleSubmit(e){
  e.preventDefault();

  const {title, description} = e.target.elements;

  console.log(title.value, description.value);

  axios.post('http://localhost:3000/notes',{
    title: title.value,
    description:description.value
  })
   .then((res) => {
    console.log(res.data);
    fetchNotes();
   })
  
}

function handleDelete(noteId){
  axios.delete('http://localhost:3000/notes/'+noteId)
   .then(res => {
    console.log(res.data);
    fetchNotes();
   })

}

  return (
   
    <>
    <form className='create-form' onSubmit={handleSubmit}>
      <input name='title' type='text' placeholder='Title'/>
      <input name='description' type='text' placeholder='Description'/>
      <button>Create note</button>
      
    </form>


    <div className="notes">
      {notes.map((note) => {
     return (
      <div className="note">
        <h2>{note.title}</h2>
        <p>{note.description}</p>
        <div className="btn">
          <button onClick={() => {handleDelete(note._id)}}>Delete</button>
        <button>Update</button>
        </div>
      </div>
     )
 
      })}
     
    </div>
    </>
  )
}

export default App
