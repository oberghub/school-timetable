import Image from "next/image";
import React, { useState } from "react";
import TextField from "@/components/elements/input/field/TextField";
import { AiOutlineClose } from "react-icons/ai";
import Dropdown from "@/components/elements/input/selected_input/Dropdown";
import MiniButton from "@/components/elements/static/MiniButton";
type props = {
  closeModal: any;
  addData: any;
};
function AddModalForm({ closeModal, addData }: props) {
  const [teachers, setTeachers] = useState<teacher[]>([
    {
      Prefix: "",
      Firstname: "",
      Lastname: "",
      Department: "",
    },
  ]);
  const addList = () => {
    let struct: teacher = {
      Prefix: "",
      Firstname: "",
      Lastname: "",
      Department: "",
    };
    setTeachers(() => [...teachers, struct]);
  };
  const handleSubmit = () => {
    addData(teachers);
    closeModal();
  };
  const cancel = () => {
    closeModal()
  }
  return (
    <>
      <div
        style={{ backgroundColor: "rgba(0,0,0,0.75" }}
        className="z-40 flex w-full h-screen items-center justify-center fixed left-0 top-0"
      >
        <div
          className={`relative flex flex-col w-fit ${
            teachers.length > 5 ? "h-[700px]" : "h-auto"
          } overflow-y-scroll overflow-x-hidden p-12 gap-10 bg-white rounded`}
        >
          {/* Content */}
          <div className="flex w-full h-auto justify-between items-center">
            <p className="text-lg select-none">เพิ่มรายชื่อครู</p>
            <AiOutlineClose className="cursor-pointer" onClick={closeModal} />
          </div>
          <MiniButton
            title="เพิ่มรายการ"
            titleColor="#000000"
            buttonColor="#FFFFFF"
            border={true}
            hoverable={true}
            borderColor="#222222"
            handleClick={addList}
          />
          {/* inputfield */}
          <div className="flex flex-col-reverse gap-3">
            {teachers.map((teacher, index) => (
              <React.Fragment key={`AddData${index + 1}`}>
                <div className="flex flex-row gap-3">
                  <div className="flex flex-col items-center justify-center mr-5">
                    <p className="text-sm font-bold">รายการที่</p>
                    <p>{index + 1}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold">
                      คำนำหน้าชื่อ (Prefix):
                    </label>
                    <Dropdown
                      data={["นาย", "นาง", "นางสาว"]}
                      renderItem={({ data }): JSX.Element => (
                        <li className="w-full">{data}</li>
                      )}
                      width={150}
                      height={40}
                      currentValue={teacher.Prefix}
                      placeHolder={"ตัวเลือก"}
                      handleChange={(value: string) => {
                        setTeachers(() =>
                          teachers.map((item, ind) =>
                            index === ind ? { ...item, Prefix: value } : item
                          )
                        );
                      }}
                    />
                  </div>
                  <TextField
                    width="auto"
                    height="auto"
                    placeHolder="ex. อเนก"
                    label="ชื่อ (Firstname) :"
                    value={teacher.Firstname}
                    handleChange={(e: any) => {
                      let value: string = e.target.value;
                      setTeachers(() =>
                        teachers.map((item, ind) =>
                          index === ind ? { ...item, Firstname: value } : item
                        )
                      );
                    }}
                  />
                  <TextField
                    width="auto"
                    height="auto"
                    placeHolder="ex. ประสงค์"
                    label="นามสกุล (Lastname) :"
                    value={teacher.Lastname}
                    handleChange={(e: any) => {
                      let value: string = e.target.value;
                      setTeachers(() =>
                        teachers.map((item, ind) =>
                          index === ind ? { ...item, Lastname: value } : item
                        )
                      );
                    }}
                  />
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold">
                      กลุ่มสาระ (Department):
                    </label>
                    <Dropdown
                      data={[
                        "คณิตศาสตร์",
                        "วิทยาศาสตร์",
                        "ภาษาไทย",
                        "ภาษาต่างประเทศ",
                        "การงานอาชีพและเทคโนโลยี",
                        "ศิลปะ",
                        "สังคมศึกษา ศาสนา และวัฒนธรรม",
                        "สุขศึกษาและพลศึกษา",
                      ]}
                      renderItem={({ data }): JSX.Element => (
                        <li className="w-full">{data}</li>
                      )}
                      width={150}
                      height={40}
                      currentValue={teacher.Department}
                      placeHolder={"ตัวเลือก"}
                      handleChange={(value: string) => {
                        setTeachers(() =>
                          teachers.map((item, ind) =>
                            index === ind
                              ? { ...item, Department: value }
                              : item
                          )
                        );
                      }}
                    />
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
          <span className="w-full flex justify-end mt-5 gap-3">
            <button
              className=" w-[100px] bg-red-500 hover:bg-red-600 duration-500 text-white py-2 px-4 rounded"
              onClick={() => cancel()}
            >
              ยกเลิก
            </button>
            <button
              className=" w-[100px] bg-green-500 hover:bg-green-600 duration-500 text-white py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              ยืนยัน
            </button>
          </span>
        </div>
      </div>
    </>
  );
}

export default AddModalForm;
