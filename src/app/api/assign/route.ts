import prisma from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"
import { teachers_responsibility, semester } from "@prisma/client"
import { subjectCreditValues } from "@/models/credit-value"

export async function GET(request: NextRequest) {
  // localhost:3000/api/assign?TeacherID=1&Semester=SEMESTER_1&AcademicYear=2566
  try {
    const TeacherID = parseInt(request.nextUrl.searchParams.get("TeacherID"))
    const AcademicYear = parseInt(request.nextUrl.searchParams.get("AcademicYear"))
    const Semester = semester[request.nextUrl.searchParams.get("Semester")]
    const data: teachers_responsibility[] = await prisma.teachers_responsibility.findMany({
      where: {
        TeacherID: TeacherID,
        AcademicYear: AcademicYear,
        Semester: Semester,
      },
      include: {
        subject: true,
        gradelevel: true,
        teacher: true,
      },
    })


    const results = data.map((resp) => { return { ...resp, SubjectName: resp.subject.SubjectName, Credit: resp.subject.Credit } })
    return NextResponse.json(results)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  // body: {  TeacherID, GradeID, SubjectCode, AcademicYear, Semester, TeachHour}
  try {
    const body = await request.json()
    const results = []

    // Retrieve existing responsibilities from the database
    const existingResponsibilities = await prisma.teachers_responsibility.findMany({
      where: {
        TeacherID: body.TeacherID,
        AcademicYear: body.AcademicYear,
        Semester: body.Semester,
      },
      include: {
        subject: true,
      },
    })

    return NextResponse.json({ status: "success", results: results })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error }, { status: 500 })
  }
}

