"use client"
import Dropdown from "@/components/elements/input/selected_input/Dropdown";
import PrimaryButton from "@/components/elements/static/PrimaryButton";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {};

function SelectYearAndSemester (props: Props) {
  const router = useRouter();
  const [year, setYear] = useState(2566);
  const [semester, setSemester] = useState(1);
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex justify-start items-center border-b py-4">
        <h1 className="text-lg font-bold">เลือกปีการศึกษาและภาคเรียน</h1>
      </div>
      <div className="flex justify-between">
        <p>เลือกปีการศึกษา</p>
        <Dropdown
          data={[2566, 2567, 2568, 2569]}
          renderItem={({ data }): JSX.Element => (
            <li className="w-full text-sm">{data}</li>
          )}
          width={400}
          height={40}
          currentValue={year}
          placeHolder="เลือกปีการศึกษา"
          handleChange={(value:number) => {
            setYear(() => value)
          }}
        />
      </div>
      <div className="flex justify-between">
        <p>เลือกภาคเรียน</p>
        <Dropdown
          data={[1, 2]}
          renderItem={({ data }): JSX.Element => (
            <li className="w-full text-sm">{data}</li>
          )}
          width={400}
          height={40}
          currentValue={semester}
          placeHolder="เลือกภาคเรียน"
          handleChange={(value:number) => {
            setSemester(() => value)
          }}
        />
      </div>
      <div className="flex justify-end items-center">
        <PrimaryButton handleClick={() => {router.replace(`/schedule/${semester}-${year}`)}} title={"ยืนยัน"} color={""} Icon={undefined} reverseIcon={false} />
      </div>
    </div>
  );
};
export default SelectYearAndSemester;