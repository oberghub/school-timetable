"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import {
  managementMenu,
  scheduleMenu,
  othersMenu,
} from "@/raw-data/menubar-data";
import arrow from "@/svg/arrow/arrowdown.svg";
function Menubar() {
  const [indexPoint, setIndexPoint] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <aside className="flex flex-col gap-8 w-[250px] h-screen px-5 py-8 bg-[#F1F3F9]">
        {/* management */}
        <div className="flex flex-col w-full h-fit border-b border-[#C8C9CD]">
          <p className="text-[#676E85] mb-2">การจัดการข้อมูล</p>
          {managementMenu.map((item, index) => (
            <React.Fragment key={item.id}>
              <Link href={item.link}
                className="flex items-center w-full gap-5 h-[45px] p-[10px] cursor-pointer text-[#000] hover:bg-slate-200 duration-300"
                style={{
                  marginBottom: index == managementMenu.length - 1 ? "10px" : 0,
                }}
              >
                <Image src={item.icon} alt="usericon" />
                <p className="text-md">{item.title}</p>
              </Link>
            </React.Fragment>
          ))}
        </div>
        {/* schedule */}
        <div className="flex flex-col w-full gap-2 h-fit border-b border-[#C8C9CD] select-none">
          <p className="text-[#676E85] mb-2">ตารางสอน</p>
          {scheduleMenu.map((item, index) => (
            <React.Fragment key={item.id}>
              <div className="w-full flex flex-col relative">
                <div
                  className="flex items-center justify-between w-full gap-5 h-[45px] p-[10px] cursor-pointer text-[#676E85] hover:bg-slate-200 duration-300"
                  onClick={() => {
                    setIndexPoint(index),
                      setIsOpen(index === indexPoint ? !isOpen : true);
                  }}
                >
                  <Image src={item.icon} alt="tablesetting" />
                  <div className="flex gap-5 justify-between w-full">
                    <p className="text-md">{item.title}</p>
                    <Image src={arrow} alt="arrowicon" />
                  </div>
                </div>
                {/* select semester */}
                <div
                  className={`flex flex-col items-end w-full duration-500 ease-out transition-transform
                    ${
                      indexPoint === index && isOpen
                        ? null
                        : "hidden"
                    }`}
                >
                  <div className="w-[165px] px-3 py-2 cursor-pointer hover:bg-slate-200 duration-300">
                    <p className="text-md text-[#676E85]">เทอม 1</p>
                  </div>
                  <div className="w-[165px] px-3 py-2 cursor-pointer hover:bg-slate-200 duration-300">
                    <p className="text-md text-[#676E85]">เทอม 2</p>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
          <div className="mb-[10px]"></div>
        </div>
        {/* others */}
        <div className="flex flex-col w-full h-fit border-b border-[#C8C9CD]">
          <p className="text-[#676E85] mb-2">อื่นๆ</p>
          {othersMenu.map((item, index) => (
            <React.Fragment key={item.id}>
              <div
                className="flex items-center w-full gap-5 h-[45px] p-[10px] cursor-pointer text-[#000] hover:bg-slate-200 duration-300"
                style={{
                  marginBottom: index == othersMenu.length - 1 ? "10px" : 0,
                }}
              >
                <Image src={item.icon} alt="printericon" />
                <p className="text-md">{item.title}</p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </aside>
    </>
  );
}

export default Menubar;
