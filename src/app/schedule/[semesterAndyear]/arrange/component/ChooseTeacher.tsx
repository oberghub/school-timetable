"use client";
import Dropdown from "@/components/elements/input/selected_input/Dropdown";
import React, { useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useTeacherData } from "@/app/_hooks/teacherData";
import type { teacher } from "@prisma/client";
import useSWR from "swr";
import { fetcher } from "@/libs/axios";
import Loading from "@/app/loading";
import { useClassData } from "@/app/_hooks/classData";

import { Select } from '@mui/base/Select';
import { Option } from '@mui/base/Option';


function ChooseTeacher() {
  const router = useRouter();
  const pathName = usePathname();
  const params = useParams();
  const [semester, academicYear] = (params.semesterAndyear as string).split(
    "-"
  ); //from "1-2566" to ["1", "2566"]

  const [teacher, setTeacher] = useState<teacher>(); //ข้อมูลของคุณครูที่เลือกเป็น object
  const [teacherLabel, setTeacherLabel] = useState<string>(""); //ใช้ตอนเลือก dropdown แล้วให้แสดงข้อมูลที่เลือก
  const [teacherFilterData, setTeacherFilterData] = useState<teacher[]>([]); //ข้อมูลสำหรับ filter ค้นหาชื่อแล้วค่อย set ลง data ที่นำไปแสดง
  const teacherData = useTeacherData();
  const responsibilityData = useSWR(
    () =>
      `/assign?TeacherID=` +
      teacher.TeacherID +
      `&Semester=SEMESTER_` +
      semester +
      `&AcademicYear=` +
      academicYear,
    fetcher
  );

  const [teachHour, setTeachHour] = useState<number>(0);
  useEffect(() => {
    if (responsibilityData.data) {
      let map = responsibilityData.data.map((item) => item.TeachHour);
      let sumTeachHour = map.length == 0 ? [0] : map;
      let res = sumTeachHour.reduce((prev, curr) => prev + curr);
      setTeachHour(() => res);
    }
  }, [responsibilityData.data]);
  useEffect(() => {
    if (teacherData.data) {
      setTeacherFilterData(teacherData.data);
    }
  }, [teacherData.isLoading]);

  const searchHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    // search คำที่พิมพ์ในช่องค้นหา
    const text = event.target.value;
    const newData = teacherData.data.filter((item) => {
      const itemData = `${item.Firstname} ${item.Lastname} ${item.Department}`;
      const textData = text.toLowerCase();
      return itemData.toLowerCase().indexOf(textData) > -1;
    });
    setTeacherFilterData(newData);
  };

  return (
    <>
      {responsibilityData.isLoading ? (
        <Loading />
      ) : (
        <div className="relative flex flex-col gap-3">
          {/* เลือกครู */}
          <div className="flex w-full h-fit justify-between p-4 items-center border border-[#EDEEF3]">
            <div className="flex items-center gap-4">
              <p
                className="text-md"
                onClick={() => console.log(responsibilityData.data)}
              >
                เลือกคุณครู
              </p>
            </div>
            <div className="flex flex-row justify-between gap-3">
              <Dropdown
                data={teacherFilterData}
                renderItem={({ data }) => (
                  <li className="w-full text-sm">
                    {data.Firstname} {data.Lastname} - {data.Department}
                  </li>
                )}
                width={400}
                height="40"
                currentValue={teacherLabel}
                handleChange={(data: any) => {
                  setTeacher(data);
                  setTeacherLabel(
                    `${data.Firstname} ${data.Lastname} - ${data.Department}`
                  );
                }}
                placeHolder="เลือกคุณครู"
                useSearchBar={true}
                searchFunciton={searchHandle}
              />
            </div>
          </div>
          {!responsibilityData.data ? null : (
            <>
              <div className="flex w-full h-[55px] justify-between p-4 items-center border border-[#EDEEF3]">
                <div className="flex items-center gap-4">
                  <p className="text-md">ชื่อ - นามสกุล</p>
                </div>
                <p className="text-md text-gray-500">
                  {teacher.Firstname} {teacher.Lastname}
                </p>
              </div>
              <div className="flex w-full h-[55px] justify-between p-4 items-center border border-[#EDEEF3]">
                <div className="flex items-center gap-4">
                  <p className="text-md">กลุ่มสาระการเรียนรู้</p>
                </div>
                <p className="text-md text-gray-500">{teacher.Department}</p>
              </div>
              <div className="flex w-full h-[55px] justify-between p-4 items-center border border-[#EDEEF3]">
                <div className="flex items-center gap-4">
                  <p className="text-md">ชั่วโมงที่สอนต่อสัปดาห์</p>
                </div>
                <p className="text-md text-gray-500">
                  {teachHour === 0 ? `ไม่มีข้อมูล` : `${teachHour} คาบ`}
                </p>
              </div>
              <div
                onClick={() => {
                  router.push(
                    `${pathName}/teacher-arrange?TeacherID=${teacher.TeacherID}`
                  );
                }}
                className="flex w-[150px] absolute right-0 bottom-[-70px] h-[55px] justify-between p-4 text-cyan-500 items-center border border-cyan-200 cursor-pointer bg-cyan-50 hover:bg-cyan-100 duration-300"
              >
                <div className="flex items-center gap-4">
                  <p className="text-md">ไปต่อ</p>
                </div>
                <MdArrowForwardIos className="cursor-pointer" />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default ChooseTeacher;
