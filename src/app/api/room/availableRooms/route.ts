import prisma from "@/libs/prisma"
import type { room } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    // localhost:3000/api/room/availableRooms?TimeslotID=1
    const TimeslotID = request.nextUrl.searchParams.get("TimeslotID")
    try {
        const data: room[] = await prisma.room.findMany({
            where: {
                class_schedule: {
                    every: {
                        NOT: {
                            TimeslotID: TimeslotID
                        }
                    }

                }
            },
            orderBy: {
                RoomName: "asc",
            },
        })
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }
}