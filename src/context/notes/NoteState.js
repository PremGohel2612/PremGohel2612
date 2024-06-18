import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "616700a1bbf52abfc7d74aa92",
            "user": "666fc98c067b1255cf672447",
            "title": "My Title",
            "description": "2nd Note",
            "tag": "personal",
            "date": "2024-06-17T10:04:11.416Z",
            "__v": 0
        },
        {
            "_id": "66721190ab488304bbaacf534",
            "user": "666fc98c067b1255cf672447",
            "title": "My Title",
            "description": "3rd Note",
            "tag": "personal",
            "date": "2024-06-18T05:20:10.434Z",
            "__v": 0
        },
        {
            "_id": "663700a1bbf52abfc7d74aa92",
            "user": "666fc98c067b1255cf672447",
            "title": "My Title",
            "description": "2nd Note",
            "tag": "personal",
            "date": "2024-06-17T10:04:11.416Z",
            "__v": 0
        },
        {
            "_id": "66711940ab488304bbaacf534",
            "user": "666fc98c067b1255cf672447",
            "title": "My Title",
            "description": "3rd Note",
            "tag": "personal",
            "date": "2024-06-18T05:20:10.434Z",
            "__v": 0
        },
        {
            "_id": "66700a1bb5f52abfc7d74aa92",
            "user": "666fc98c067b1255cf672447",
            "title": "My Title",
            "description": "2nd Note",
            "tag": "personal",
            "date": "2024-06-17T10:04:11.416Z",
            "__v": 0
        },
        {
            "_id": "6671190a6b488304bbaacf534",
            "user": "666fc98c067b1255cf672447",
            "title": "My Title",
            "description": "3rd Note",
            "tag": "personal",
            "date": "2024-06-18T05:20:10.434Z",
            "__v": 0
        },
        {
            "_id": "66700a1bb7f52abfc7d74aa92",
            "user": "666fc98c067b1255cf672447",
            "title": "My Title",
            "description": "2nd Note",
            "tag": "personal",
            "date": "2024-06-17T10:04:11.416Z",
            "__v": 0
        },
        {
            "_id": "6671190ab4888304bbaacf534",
            "user": "666fc98c067b1255cf672447",
            "title": "My Title",
            "description": "3rd Note",
            "tag": "personal",
            "date": "2024-06-18T05:20:10.434Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesInitial)
    return (
        <noteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;