"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import NewNote from "@/components/New-note";
import { useEffect, useState } from "react";
import NoteViewer from "@/components/Note-viewer";
import EmptyNote from "@/components/Empty-note";

// note 속성의 타입 정의
interface Note {
  id: number;
  title: string;
  content: string;
}

export default function Ui() {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [activeNoteId, setActiveNoteId] = useState<number | null>(null);
  const [noteList, setNoteList] = useState<Note[]>([]);

  const getNoteList = async () => {
    try {
      const res = await fetch("/api/note");
      return await res.json();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getNoteList()
      .then((data) => setNoteList(data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <main className={"h-screen w-full flex flex-col"}>
      <Header />
      <div className={"grow border-8 border-amber-300 relative"}>
        <Sidebar activeNoteId={activeNoteId} setActiveNoteId={setActiveNoteId} setIsCreating={setIsCreating} notes={noteList} />
        {isCreating ? (
          <NewNote setIsCreating={setIsCreating} getNoteList={getNoteList} setNoteList={setNoteList} />
        ) : activeNoteId ? (
          <NoteViewer note={noteList.find((note) => note.id === activeNoteId) as Note} />
        ) : (
          <EmptyNote />
        )}
      </div>
    </main>
  );
}
