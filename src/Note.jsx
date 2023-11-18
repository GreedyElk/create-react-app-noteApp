import { useState } from 'react'
import Modal from './Modal'

export default function CreateNote(props, onClick){

    /*let date = props.data.date
    date = `| ${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`*/

    let titleElement = (title) => title =! '' ? <p className='noteTitle'>{'| '+ title}</p> : '';

    if(! props.data.text){return}

    return(
        <>
            <div className='note'>
                <div className='noteForClick' id = {props.data.noteID} onClick={props.onClick}>

                    {titleElement(props.data.title)}
                    <p className='noteText'>{props.data.text}</p>

                    <div className='noteDate'>{props.data.date}</div>
                </div>
                {props.children}
            </div>

        </>
    )
}