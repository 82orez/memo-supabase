import { PiFilePlusFill } from "react-icons/pi";

export default function Sidebar({ activeNoteId, setActiveNoteId, setIsCreating, notes }) {
  return (
    <aside className={"absolute top-0 left-0 bottom-0 w-1/4 bg-gray-50 overflow-y-auto"}>
      <div className={"border-b-4 h-10 flex justify-center items-center"}>Sidebar</div>

      <button className={"w-full flex items-center gap-1 p-2 font-bold"} onClick={() => setIsCreating(true)}>
        <PiFilePlusFill className={"text-3xl text-amber-500"} />
        <div>Add New note</div>
      </button>

      <ul className={"flex flex-col gap-2"}>
        {notes.map((note) => (
          <li
            key={note.id}
            className={"mt-2"}
            onClick={() => {
              setIsCreating(false);
              setActiveNoteId(note.id);
            }}>
            <button className={`${activeNoteId === note.id ? "font-bold" : ""}`}>{note.title}</button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
