"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function NoteViewer({ note, getNoteList }) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [isEditing, setIsEditing] = useState(false);

  const onEdit = async () => {
    try {
      const res = await axios.put("/api/note", {
        id: note.id,
        title: title,
        content: content,
      });
      const result = res.data;
      console.log("Edit succeed!", result);

      setIsEditing(false);
      getNoteList();
    } catch (e) {
      console.error("Error saving note:", e);
      alert("Failed to edit note. Please try again.");
    }
  };

  const ondelete = async () => {};

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
    setIsEditing(false);
  }, [note]);

  return (
    <div className={"w-3/4 absolute top-0 bottom-0 right-0 bg-amber-100 flex flex-col gap-2 p-4"}>
      {isEditing ? (
        <>
          <input
            type={"text"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={"border-8 rounded-md text-xl p-2 grow"}
            placeholder={"Input Title"}
          />

          <textarea
            value={content}
            placeholder={"Textarea"}
            onChange={(e) => setContent(e.target.value)}
            className={"grow-[25] border-8 rounded-md p-4"}
          />
        </>
      ) : (
        <>
          <div className={"text-xl p-2 grow"}>{title}</div>
          <div className={"grow-[25] border-8 rounded-md p-4"}>{content}</div>
        </>
      )}

      <div className={"flex justify-around"}>
        {isEditing ? (
          <>
            <button className={"p-3 hover:bg-green-300 hover:text-white rounded-xl font-bold text-xl"} onClick={onEdit}>
              Save
            </button>
            <button className={"p-3 hover:bg-rose-400 hover:text-white rounded-xl font-bold text-xl"}>Del</button>
          </>
        ) : (
          <button className={"p-3 hover:bg-rose-400 hover:text-white rounded-xl font-bold text-xl"} onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
