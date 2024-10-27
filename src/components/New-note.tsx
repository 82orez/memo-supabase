"use client";

import { useState } from "react";

export default function NewNote({ setIsCreating, getNoteList, setActiveNoteId }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onSave = async () => {
    if (!title || !content) {
      alert("Please input a title & content");
      return;
    }

    // supabase 부분
    const res = await fetch("/api/note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });

    const result = await res.json();
    // console.log(result.message);

    const addedNotes = await getNoteList();
    // await getNoteList();
    console.log("Post succeed!", addedNotes);
    setActiveNoteId(result.id);
    setIsCreating(false);
  };

  return (
    <div className={"w-3/4 absolute top-0 bottom-0 right-0 bg-amber-100 flex flex-col gap-2 p-4"}>
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

      <button className={"py-3 hover:bg-rose-400 hover:text-white rounded-full font-bold text-xl"} onClick={() => onSave()}>
        Save
      </button>
    </div>
  );
}
