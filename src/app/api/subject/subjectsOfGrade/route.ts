import prisma from "@/libs/prisma"
import { type subject } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    // localhost:3000/api/subject/subjectsOfGrade?GradeID=101
    const GradeID = request.nextUrl.searchParams.get("GradeID")
    try {

        const data: subject[] = await prisma.subject.findMany({
            where: {
                program: {
                    gradelevel: {
                        some: {
                            GradeID: GradeID
                        }
                    }
                }
            },
            orderBy: {
                SubjectCode: "asc",
            },
        })
        return NextResponse.json(data)
    } catch (error) {
        console.log(error)
        return NextResponse.json(error.message, { status: 500 })
    }
}