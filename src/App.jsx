import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import CreateNote from './Note'
import Modal from './Modal'

function App() {

  function init(){        /*creates value for notes for the first time*/
    return(
      (JSON.parse(localStorage.getItem('localNotes')) == null) ? [] : JSON.parse(localStorage.getItem('localNotes'))
    )
  }

  const [notes, setNotes] = useState(init())  /*for Notes*/
  const [id, setId] = useState(0)

  const [showModal, setShowModal] = useState(false) /*for Modal*/
  const [curId, setCurId] = useState(0)

  localStorage.setItem('localNotes', JSON.stringify(notes)) /*updates localStorage*/

  function genDate(){
    let noteDate = new Date
    return (`| ${noteDate.getDate()}.${noteDate.getMonth()}.${noteDate.getFullYear()} ${noteDate.getHours()}:${noteDate.getMinutes()}`)
  }

  function addToList(){
    setNotes([...notes, {
      noteID : `${id}`,
      title : (document.getElementById('inputTitle')).value,
      text : (document.getElementById('inputText')).value,
      date : genDate()
    }]);
    setId(id + 1)
  }
  function popFromList(idOfNote){

    const indexOfObject = notes.findIndex(object => {return object.noteID == idOfNote})

    if(indexOfObject == -1){
      return
    }
    setNotes([...notes.slice(0, indexOfObject), ...notes.slice(indexOfObject + 1)])

  }
  
  /*Modal functions*/

  function openModal(num){    /*Open/close functionality*/
    setCurId(num)
    setShowModal(true);
  }
  function closeModal(){
    setShowModal(false)
    setCurId(undefined)
  }

  let titleValue = 42         /*Changing note functionality*/
  let textValue = 42

  function changeValue(e){
    if(e.target.id == 'title'){
      titleValue = e.target.value;
    }else if(e.target.id == 'text')
      textValue = e.target.value;
  }

  function changeNote(){
    const indexOfObject = notes.findIndex(object => {return object.noteID == curId})

    let updtdNotes = notes;

    if(titleValue !== 42){updtdNotes[indexOfObject].title = titleValue};
    if((textValue !== 42) && (textValue != '')){updtdNotes[indexOfObject].text = textValue}else if(textValue == ''){
      alert("I wouldn't save changes to note. I cannot find text at all!")
    }
    updtdNotes[indexOfObject].date = genDate();

    setNotes([...updtdNotes])
    
    titleValue = 42
    textValue = 42
  }
  

  return (
    <>
      {showModal ? (<Modal modalProps = {notes.find(item => item.noteID == curId)} onClick={()=>closeModal()} onChange ={(e)=>changeValue(e)}>
        <button id='buttonChange' onClick={()=>changeNote()}>Commit changes</button>
      </Modal>) : (undefined)}

      <div id='formBasic'>

        <div id='inputContainer'>
          <input id='inputTitle' type='text' placeholder='Type your title'></input>
          <textarea id='inputText' placeholder='Type your note'></textarea>
        </div>

        <button id='buttonAdd' onClick={()=>addToList()}>Add</button>

      </div>

      <div id='containerNotes'>

        {notes.map((element)=>{
          return(
          <CreateNote data = {element} onClick={()=>{openModal(element.noteID)}}>
            <button className = 'deleteButton' onClick={()=>popFromList(element.noteID)}>Delete</button>

          </CreateNote>)
        })}

      </div>
    </>
  )
}

export default App
