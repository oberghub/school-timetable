import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import PrimaryButton from "@/components/elements/static/PrimaryButton";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { gradelevel } from "@prisma/client";
import api from "@/libs/axios";
type props = {
  closeModal: any;
  deleteData: any;
  clearCheckList: any;
  dataAmount: number;
  openSnackBar: any;
  checkedList: any;
  mutate: Function;
};

function ConfirmDeleteModal({
  closeModal,
  deleteData,
  dataAmount,
  clearCheckList,
  openSnackBar,
  checkedList,
  mutate,
}: props) {
  const confirmed = () => {
    removeMultiData(deleteData, checkedList);
    closeModal();
  };
  const cancel = () => {
    if (dataAmount === 1) {
      clearCheckList();
    }
    closeModal();
  };
  const removeMultiData = async (data: gradelevel[], checkedList) => {
    const deleteData = data
      .filter((item, index) => checkedList.includes(index))
      .map((item) => item.GradeID);
    try {
      const response = await api.delete("/gradeLevel", {
        data: deleteData,
      });
      if (response.status === 200) {
        mutate();
        openSnackBar("DELETE");
      }
      console.log(response);
      clearCheckList();
    } catch (err) {
      console.log(err);
    }
  };
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
            <p className="text-lg select-none font-bold">
              คุณต้องการลบข้อมูลที่เลือกทั้งหมด {dataAmount} รายการใช่หรือไม่
            </p>
          </div>
          <span className="w-full flex gap-3 justify-end h-11">
            <PrimaryButton
              handleClick={cancel}
              title={"ยกเลิก"}
              color={"danger"}
              Icon={<CloseIcon />}
            />
            <PrimaryButton
              handleClick={confirmed}
              title={"ยืนยัน"}
              color={"success"}
              Icon={<CheckIcon />}
            />
          </span>
        </div>
      </div>
    </>
  );
}
export default ConfirmDeleteModal;
