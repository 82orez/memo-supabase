"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import NewNote from "@/components/New-note";
import { useEffect, useState } from "react";
import NoteViewer from "@/components/Note-viewer";
import EmptyNote from "@/components/Empty-note";

const notes = [
  { id: 1, title: "Note 1", content: "Note 내용 1" },
  { id: 2, title: "Note 2", content: "Note 내용 2" },
  { id: 3, title: "Note 3", content: "Note 내용 3" },
  { id: 4, title: "Note 4", content: "Note 내용 4" },
  { id: 5, title: "Note 5", content: "Note 내용 5" },
];

// note 속성의 타입 정의
interface Note {
  id: number;
  title: string;
  content: string;
}

export default function Ui() {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [activeNoteId, setActiveNoteId] = useState<number | null>(null);

  return (
    <main className={"h-screen w-full flex flex-col"}>
      <Header />
      <div className={"grow border-8 border-amber-300 relative"}>
        <Sidebar activeNoteId={activeNoteId} setActiveNoteId={setActiveNoteId} setIsCreating={setIsCreating} notes={notes} />
        {isCreating ? (
          <NewNote setIsCreating={setIsCreating} />
        ) : activeNoteId ? (
          <NoteViewer note={notes.find((note) => note.id === activeNoteId) as Note} />
        ) : (
          <EmptyNote />
        )}
      </div>
    </main>
  );
}
