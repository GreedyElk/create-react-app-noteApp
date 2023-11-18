import React from "react"
import { useState } from 'react'
import CreateNote from './Note'

export default function Modal(props, onClick){

    /*let date = props.modalProps.date
    date = `| ${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`*/

    let titleElement = (title) => title =! '' ? (<p className='noteTitle'>
        | <input id="title" defaultValue={title} onChange={props.onChange}></input>
    </p>) : '';

    return(
        <>
            <div className="modalBody" onClick = {props.onClick}></div>
            <div className='modal'>
                <p>| Chosen note</p>
                <div className='note'>

                    {titleElement(props.modalProps.title)}
                    <p className='noteText'>
                        <textarea id="text" defaultValue={props.modalProps.text} onChange={props.onChange}></textarea>
                    </p>

                    <div className='noteDate'>{props.modalProps.date}</div>
                </div>
                {props.children}
            </div>
        </>)
}