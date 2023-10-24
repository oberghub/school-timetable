import React, { useState } from "react";
import TextField from "@/components/elements/input/field/TextField";
import { AiOutlineClose } from "react-icons/ai";
import MiniButton from "@/components/elements/static/MiniButton";
import NumberField from "@/components/elements/input/field/NumberField";
type props = {
  closeModal: any;
  addData: any;
};
function AddModalForm({ closeModal, addData }: props) {
  const [rooms, setRooms] = useState<rooms[]>([
    {
      RoomName: "",
      Building: "",
      Floor: null,
    },
  ]);
  const addList = () => {
    let struct: rooms = {
      RoomName: "",
      Building: "",
      Floor: null,
    };
    setRooms(() => [...rooms, struct]);
  };
  const handleSubmit = () => {
    addData(rooms);
    closeModal();
  };
  const cancel = () => {
    closeModal()
  }
  return (
    <>
      <div
        style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
        className="z-40 flex w-full h-screen items-center justify-center fixed left-0 top-0"
      >
        <div
          className={`relative flex flex-col w-fit ${
            rooms.length > 5 ? "h-[700px]" : "h-auto"
          } overflow-y-scroll overflow-x-hidden p-12 gap-10 bg-white rounded`}
        >
          {/* Content */}
          <div className="flex w-full h-auto justify-between items-center">
            <p className="text-lg select-none">เพิ่มห้องเรียน</p>
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
            {rooms.map((room, index) => (
              <React.Fragment key={`AddData${index + 1}`}>
                <div className="flex flex-row gap-3">
                  <div className="flex flex-col items-center justify-center mr-5">
                    <p className="text-sm font-bold">รายการที่</p>
                    <p>{index + 1}</p>
                  </div>
                  <TextField
                  width="auto"
                  height="auto"
                  label={`ชื่อห้อง (RoomName):`}
                  placeHolder="ex. คอม1"
                  value={room.RoomName}
                  handleChange={(e: any) => {
                    let value:string = e.target.value;
                    setRooms(() =>
                      rooms.map((item, ind) =>
                        index === ind ? { ...item, RoomName: value } : item
                      )
                    );
                  }}
                />
                <TextField
                  width="auto"
                  height="auto"
                  placeHolder="ex. 3"
                  label={`อาคาร (Building):`}
                  value={room.Building}
                  handleChange={(e: any) => {
                    let value:string = e.target.value;
                    setRooms(() =>
                      rooms.map((item, ind) =>
                        index === ind ? { ...item, Building: value } : item
                      )
                    );
                  }}
                />
                <NumberField
                  width="auto"
                  height="auto"
                  label={`ชั้น (Floor):`}
                  placeHolder="ex. 5"
                  value={room.Floor}
                  handleChange={(e: any) => {
                    let value:number = e.target.value;
                    setRooms(() =>
                      rooms.map((item, ind) =>
                        index === ind ? { ...item, Floor: value } : item
                      )
                    );
                  }}
                />
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