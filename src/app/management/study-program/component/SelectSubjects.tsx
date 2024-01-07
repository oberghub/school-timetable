import SearchBar from "@/components/elements/input/field/SearchBar";
import MiniButton from "@/components/elements/static/MiniButton";
import React, { Fragment } from "react";
import { BsInfo } from "react-icons/bs";

type Props = {
  data: any;
  subjectSelected: any;
  addSubjectFunction: any;
  removeSubjectFunction: any;
  searchHandleSubject: any;
  searchTextSubject: string;
  required:boolean;
};

function SelectSubjects(props: Props) {
  return (
    <>
      <div className="flex flex-col gap-5 justify-between w-full">
        <div className="flex justify-between items-center relative">
          <div className="text-sm flex gap-1 items-center">
            <p>เลือกวิชา</p>
            <p className="text-red-500">*</p>
            {props.required ? (
            <div className="ml-3 flex gap-2 px-2 py-1 w-fit items-center bg-red-100 rounded">
              <BsInfo className="bg-red-500 rounded-full fill-white" />
              <p className="text-red-500 text-sm">ต้องการ</p>
            </div>
            ) : null}
          </div>
          <SearchBar
            width={276}
            height={45}
            placeHolder="ค้นหารายวิชา"
            handleChange={props.searchHandleSubject}
          />
          <div
            className={`${
              props.searchTextSubject.length == 0 ? "hidden" : null
            } absolute right-0 top-11 flex flex-col w-[276px] h-fit bg-white drop-shadow-sm border`}
          >
            <div className="w-full flex flex-col gap-1">
              {props.data
                .filter((item) => !props.subjectSelected.includes(item))
                .map((item) => (
                  <Fragment
                    key={`searchteacher${item.TeacherID} ${item.Firstname}`}
                  >
                    <li
                      onClick={() => props.addSubjectFunction(item)}
                      className="flex h-[60px] items-center hover:bg-cyan-100 hover:text-cyan-600 p-3 cursor-pointer duration-300"
                    >
                      <p className="text-sm">
                        {item.Firstname} {item.Lastname} - {item.Department}
                      </p>
                    </li>
                  </Fragment>
                ))}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 justify-end">
          {props.subjectSelected.map((item, index) => (
            <Fragment key={`teacherSelected${item.TeacherID}`}>
              <MiniButton
                handleClick={() => props.removeSubjectFunction(index)}
                isSelected={true}
                title={`${item.Firstname} - ${item.Department}`}
                border={true}
                buttonColor={""}
                titleColor={""}
                width={""}
                height={""}
                borderColor={""}
                hoverable={false}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
}

export default SelectSubjects;
