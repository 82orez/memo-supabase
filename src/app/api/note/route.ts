import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const res = await prisma.note.create({
    data: {
      title: "note1",
      content: "hello world1",
    },
  });
  return Response.json("ok!");
}
