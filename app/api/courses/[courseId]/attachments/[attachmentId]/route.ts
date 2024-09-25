import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; attachmentId: string } }
) {
  try {
    const { userId } = auth();

    // Check if user is authenticated
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if the authenticated user is the owner of the course
    const courseOwner = await db.course.findFirst({
      where: {
        id: params.courseId,
        userId: userId, // Ensure the user is the owner of the course
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Delete the attachment by its id
    const attachment = await db.attachment.delete({
      where: {
        id: params.attachmentId, // Attachment ID is the unique key for deletion
      },
    });

    // If the attachment was successfully deleted
    return NextResponse.json(attachment);
  } catch (error) {
    console.error("Error deleting attachment:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
