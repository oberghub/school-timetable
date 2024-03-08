"use client"
import { useParams, usePathname, useRouter } from 'next/navigation';
import React, {useEffect, useRef, useState} from 'react'
import TimeSlot from './component/Timeslot';
import SelectTeacher from './component/SelectTeacher';
import { fetcher } from '@/libs/axios';
import { dayOfWeekTextColor } from '@/models/dayofWeek-textColor';
import { dayOfWeekColor } from '@/models/dayofweek-color';
import { dayOfWeekThai } from '@/models/dayofweek-thai';
import useSWR from 'swr';
import Loading from '@/app/loading';
import PrimaryButton from '@/components/elements/static/PrimaryButton';
import { ExportTeacherTable } from '../all-timeslot/functions/ExportTeacherTable';
import { useReactToPrint } from 'react-to-print';
type Props = {}

function page({}: Props) {
  // TODO: เช็คคาบพัก
  const params = useParams();
  const [semester, academicYear] = (params.semesterAndyear as string).split(
    "-",
  ); //from "1-2566" to ["1", "2566"]
  const [searchTeacherID, setSearchTeacherID] = useState(1)
  const [timeSlotData, setTimeSlotData] = useState({
    AllData: [], //ใช้กับตารางด้านล่าง
    SlotAmount: [],
    StartTime: { Hours: 8, Minutes: 30 },
    Duration: 50,
    DayOfWeek: [],
    BreakSlot: [],
  });
  const fetchTimeSlot = useSWR(
    () =>
      `/timeslot?AcademicYear=` +
      academicYear +
      `&Semester=SEMESTER_` +
      semester,
    fetcher,
    { revalidateOnFocus: false },
  );
  function fetchTimeslotData() {
    if (!fetchTimeSlot.isValidating) {
      let data = fetchTimeSlot.data;
      let dayofweek = data
        .map((day) => day.DayOfWeek)
        .filter(
          (item, index) =>
            data.map((day) => day.DayOfWeek).indexOf(item) === index,
        )
        .map((item) => ({
          Day: dayOfWeekThai[item],
          TextColor: dayOfWeekTextColor[item],
          BgColor: dayOfWeekColor[item],
        })); //filter เอาตัวซ้ำออก ['MON', 'MON', 'TUE', 'TUE'] => ['MON', 'TUE'] แล้วก็ map เป็นชุดข้อมูล object
      let breakTime = data
        .filter(
          (item) =>
            (item.Breaktime == "BREAK_BOTH" ||
              item.Breaktime == "BREAK_JUNIOR" ||
              item.Breaktime == "BREAK_SENIOR") &&
            item.DayOfWeek == "MON", //filter ข้อมูลตัวอย่างเป้นวันจันทร์ เพราะข้อมูลเหมือนกันหมด
        )
        .map((item) => ({
          TimeslotID: item.TimeslotID,
          Breaktime: item.Breaktime,
          SlotNumber: parseInt(item.TimeslotID.substring(10)),
        })); //เงื่อนไขที่ใส่คือเอาคาบพักออกมา
        let slotAmount = data
        .filter((item) => item.DayOfWeek == "MON") //filter ข้อมูลตัวอย่างเป้นวันจันทร์ เพราะข้อมูลเหมือนกันหมด
        .map((item, index) => index + 1); //ใช้สำหรับ map หัวตารางในเว็บ จะ map จาก data เป็น number of array => [1, 2, 3, 4, 5, 6, 7]
      let startTime = {
        Hours: new Date(data[0].StartTime).getHours() - 7, //พอแปลงมันเอาเวลาของ indo เลย -7 กลับไป
        Minutes: new Date(data[0].StartTime).getMinutes(),
      };
      let duration = getMinutes(
        new Date(data[0].EndTime).getTime() -
          new Date(data[0].StartTime).getTime(),
      ); //เอาเวลาจบลบเริ่มจะได้ duration
      setTimeSlotData(() => ({
        AllData: data.map((data) => ({ ...data, subject: {} })),
        SlotAmount: slotAmount,
        StartTime: startTime,
        Duration: duration,
        DayOfWeek: dayofweek,
        BreakSlot: breakTime,
      }));
    }
  }
  useEffect(() => {
    if (!fetchTimeSlot.isLoading) {
      fetchTimeslotData();
    }
  }, [fetchTimeSlot.isLoading]);
  //convert millisec to min
  const getMinutes = (milliseconds: number) => {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    return minutes;
  };
  const addHours = (time: Date, hours: number): Date => {
    //set เวลาด้วยการบวกตาม duration และคูณ hours ถ้าจะให้ skip ไปหลายชั่วโมง
    time.setMinutes(time.getMinutes() + timeSlotData.Duration * hours);
    return time;
  };
  const mapTime = () => {
    let map = [
      ...timeSlotData.SlotAmount.map((hour, index) => {
        //สร้าง format เวลา ตัวอย่าง => 2023-07-27T17:24:52.897Z
        let timeFormat = `0${timeSlotData.StartTime.Hours}:${
          timeSlotData.StartTime.Minutes == 0
            ? "00"
            : timeSlotData.StartTime.Minutes
        }`;
        //แยก เวลาเริ่มกับเวลาจบไว้ตัวแปรละอัน
        const timeStart = new Date(`2024-03-14T${timeFormat}:00.000Z`);
        const timeEnd = new Date(`2024-03-14T${timeFormat}:00.000Z`);
        //นำไปใส่ใน function addHours เพื่อกำหนดเวลาเริ่ม-จบ
        let start = addHours(timeStart, (index+1) - 1); //เวลาเริ่มใส่ hours-1 เพราะคาบแรกไม่ต้องการให้บวกเวลา
        let end = addHours(timeEnd, index+1); //จะต้องมากกว่า start ตาม duration ที่กำหนดไว้
        //แปลงจาก 2023-07-27T17:24:52.897Z เป็น 17:24 โดยใช้ slice
        return {
          Start: start.toISOString().slice(11, 16),
          End: end.toISOString().slice(11, 16),
        };
      }),
    ];
    return map;
  };
  const setTeacherID = (id: number) => {
    setSearchTeacherID(id)
  }
  const fetchTeacherDatabyID = useSWR(
    //ข้อมูลหลักที่ fetch มาจาก api
    () => `/teacher?TeacherID=` + searchTeacherID,
    fetcher
  );
  const ref = useRef<HTMLDivElement>();
  const generatePDF = useReactToPrint({
    content : () => ref.current,
    documentTitle : "ตารางสอน",
    // onAfterPrint : () => alert("เรียบร้อย")
  })
  const [isPDFExport, setIsPDFExport] = useState(false)
  const ExportToPDF = () => {
    setIsPDFExport(true)
    setTimeout(() => {
      generatePDF()
      setIsPDFExport(false)
    }, 1)
  }
  return (
    <>
      <div className='flex flex-col gap-3'>
        {fetchTeacherDatabyID.isLoading || fetchTimeSlot.isLoading ? <Loading /> :
        <>
        <SelectTeacher setTeacherID={setTeacherID} currentTeacher={fetchTeacherDatabyID.data} />
        <div className='flex w-full gap-3 justify-end'>
          <PrimaryButton handleClick={() => ExportTeacherTable(timeSlotData, [fetchTeacherDatabyID.data], semester, academicYear)} title={'นำออกเป็น Excel'} color={''} Icon={undefined} reverseIcon={false} isDisabled={false} />
          <PrimaryButton handleClick={ExportToPDF} title={'นำออกเป็น PDF'} color={''} Icon={undefined} reverseIcon={false} isDisabled={false} />
        </div>
        <TimeSlot timeSlotData={timeSlotData} timeMap={mapTime()}/>
        <div ref={ref} className='p-10 flex flex-col items-center justify-center mt-5' style={{display : isPDFExport ? 'flex' : 'none'}}>
        <div className='flex gap-10 mb-10'>
            <p>ตารางสอน {`${fetchTeacherDatabyID.data.Prefix}${fetchTeacherDatabyID.data.Firstname} ${fetchTeacherDatabyID.data.Lastname}`}</p>
            <p>ภาคเรียนที่ {`${semester}/${academicYear}`}</p>
          </div>
          <TimeSlot timeSlotData={timeSlotData} timeMap={mapTime()}/>
          <div className='flex gap-2 mt-10'>
            <p>ลงชื่อ..............................รองผอ.วิชาการ</p>
            <p>ลงชื่อ..............................ผู้อำนวยการ</p>
          </div>
        </div>
        </>
        }
      </div>
    </>
  )
}

export default page