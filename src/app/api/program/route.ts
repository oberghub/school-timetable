import prisma from "@/libs/prisma"
import type { gradelevel, program, subject } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  // query: { ProgramID }
  const Year = parseInt(request.nextUrl.searchParams.get("Year"))
  try {
    const data: program[] = await prisma.program.findMany({
      where: {
        gradelevel: {
          every: {
            Year: Year,
          },
        }
      },
      orderBy: {
        ProgramID: "asc",
      },
      include: {
        gradelevel: true,
        subject: {
          orderBy: {
            SubjectCode: "asc",
          },
        },
      },
    })

    return NextResponse.json(data)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  // body: { ProgramName, gradelevel: [{ GradeID }], subject: [{ SubjectCode }] }
  try {
    const body = await request.json()
    const isExist = await prisma.program.findUnique({
      where: {
        ProgramName: body.ProgramName,
      },
    })

    if (isExist) {
      throw new Error("Program already exist")
    }

    const data = await prisma.program.create({
      data: {
        ProgramName: body.ProgramName,
        Semester: body.Semester,
        gradelevel: {
          connect: body.gradelevel.map((element: gradelevel) => {
            return {
              GradeID: element.GradeID,
            }
          }),
        },
        subject: {
          connect: body.subject.map((element: subject) => {
            return {
              SubjectCode: element.SubjectCode,
            }
          }),
        },
      },
    })

    return NextResponse.json(data)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  // body: { ProgramID }
  try {
    const body = await request.json()
    const data = await prisma.program.delete({
      where: {
        ProgramID: body.ProgramID,
      },
    })
    return NextResponse.json(data)
  } catch (error) {
    console.log(error)
    return NextResponse.error()
  }
}

export async function PUT(request: NextRequest) {
  // body: { ProgramID, ProgramName, gradelevel: [{ GradeID }], subject: [{ SubjectCode }] }
  try {
    const body = await request.json()
    const data = await prisma.program.update({
      where: {
        ProgramID: body.ProgramID,
      },
      data: {
        ProgramName: body.ProgramName,
        gradelevel: {
          set: [],
          connect: body.gradelevel.map((element: gradelevel) => {
            return {
              GradeID: element.GradeID,
            }
          }),
        },
        subject: {
          set: [],
          connect: body.subject.map((element: subject) => {
            return {
              SubjectCode: element.SubjectCode,
            }
          }),
        },

      }
    })

    return NextResponse.json(data)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
