import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Get all notes
export async function GET(request: Request) {
  const search = new URL(request.url).searchParams.get("search") || "";

  const notes = await prisma.note.findMany({
    where: {
      content: {
        contains: search,
        mode: "insensitive", // 대소문자 구분 없이 검색
      },
    },
  });

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

  return NextResponse.json(newNote);
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
