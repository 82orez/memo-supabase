import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Get all notes
export async function GET() {
  const notes = await prisma.note.findMany();
  return NextResponse.json(notes);
}

// Create a new note
export async function POST(request: Request) {
  const { title, content } = await request.json();

  const newNote = await prisma.note.create({
    data: {
      title,
      content,
    },
  });

  return NextResponse.json({ message: "Post succeed!" });
}

// Update a note by ID
export async function PUT(request: Request) {
  const { id, title, content } = await request.json();

  const updatedNote = await prisma.note.update({
    where: { id },
    data: { title, content },
  });

  return NextResponse.json(updatedNote);
}

// Delete a note by ID
export async function DELETE(request: Request) {
  const { id } = await request.json();

  await prisma.note.delete({
    where: { id },
  });

  return NextResponse.json({ message: "Note deleted successfully" });
}
