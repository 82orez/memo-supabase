"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import NewNote from "@/components/New-note";
import { useEffect, useState } from "react";
import NoteViewer from "@/components/Note-viewer";
import EmptyNote from "@/components/Empty-note";
import axios from "axios";

// note 속성의 타입 정의
interface Note {
  id: number;
  title: string;
  content: string;
}

export default function Ui() {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [activeNoteId, setActiveNoteId] = useState<number | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);

  const getNoteList = async () => {
    try {
      const res = await axios("/api/note");
      const result = await res.data;
      setNotes(result);
      return "getNoteList rendered";
    } catch (e) {
      console.error("Error Loading page:", e);
    }
  };

  useEffect(() => {
    getNoteList()
      .then((msg) => console.log(msg))
      .catch((e) => console.error(e));
  }, []);

  return (
    <main className={"h-screen w-full flex flex-col"}>
      <Header />
      <div className={"grow border-8 border-amber-300 relative"}>
        <Sidebar activeNoteId={activeNoteId} setActiveNoteId={setActiveNoteId} setIsCreating={setIsCreating} notes={notes} />
        {isCreating ? (
          <NewNote setIsCreating={setIsCreating} getNoteList={getNoteList} setActiveNoteId={setActiveNoteId} />
        ) : activeNoteId ? (
          <NoteViewer note={notes.find((note) => note.id === activeNoteId) as Note} getNoteList={getNoteList} setActiveNoteId={setActiveNoteId} />
        ) : (
          <EmptyNote />
        )}
      </div>
    </main>
  );
}
