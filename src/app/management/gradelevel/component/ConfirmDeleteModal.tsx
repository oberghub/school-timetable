import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';

type props = {
    closeModal: any;
    deleteData: any;
    clearCheckList:any;
    dataAmount: number;
}

function ConfirmDeleteModal ({ closeModal, deleteData, dataAmount, clearCheckList }: props) {
    const confirmed = () => {
      deleteData();
      closeModal();
    }
    const cancel = () => {
      if(dataAmount === 1){
        clearCheckList();
      }
      closeModal();
    }
  return (
    <>
      <div
        style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
        className="z-40 flex w-full h-screen items-center justify-center fixed left-0 top-0"
      >
        <div className="flex flex-col w-fit h-fit p-7 gap-10 bg-white rounded">
          {/* Content */}
          <div className="flex w-full h-auto justify-between items-center">
            <p className="text-lg select-none">ลบข้อมูล</p>
            <AiOutlineClose className="cursor-pointer" onClick={cancel} />
          </div>
          <div className="flex w-full h-auto justify-between items-center">
            <p className="text-lg select-none font-bold">คุณต้องการลบข้อมูลที่เลือกทั้งหมด {dataAmount} รายการใช่หรือไม่</p>
          </div>
          <span className="w-full flex gap-3 justify-end">
              <button className=" w-[100px] bg-red-500 hover:bg-red-600 duration-500 text-white py-2 px-4 rounded"
              onClick={() => cancel()}
              >
                ยกเลิก
              </button>
              <button className=" w-[100px] bg-gray-500 hover:bg-gray-600 duration-500 text-white py-2 px-4 rounded"
              onClick={() => confirmed()}
              >
                ยืนยัน
              </button>
          </span>
        </div>
      </div>
    </>
  )
}
export default ConfirmDeleteModal;