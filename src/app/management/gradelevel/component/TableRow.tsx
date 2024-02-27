// TableRow.jsx
import React, { Fragment } from "react";
import { BiEdit } from "react-icons/bi";
import { TbTrash } from "react-icons/tb";

function TableRow({
  item,
  index,
  clickToSelect,
  checkedList,
  setEditModalActive,
  setDeleteModalActive,
  pageOfData,
  searchTerm,
}) {
  const matchesSearchTerm = item.GradeID.toLowerCase().includes(
    searchTerm.toLowerCase()
  );

  if (!matchesSearchTerm) {
    return null; // Do not render if it doesn't match the search term
  }

  return (
    <tr className="relative h-[60px] border-b bg-[#FFF] hover:bg-cyan-50 hover:text-cyan-600 even:bg-slate-50 cursor-pointer">
      <th>
        <input
          className="cursor-pointer"
          type="checkbox"
          name="itemdata"
          onChange={() => clickToSelect(item.GradeID)}
          checked={checkedList.includes(item.GradeID)}
        />
      </th>
      {["GradeID", "Year", "Number", "ProgramID"].map((key) => (
        <td
          key={key}
          className="px-6 whitespace-nowrap select-none"
          onClick={() => clickToSelect(item.GradeID)}
        >
          {key === "ProgramID" && !item[key] ? "ไม่มีข้อมูล" : item[key]}
        </td>
      ))}
      {checkedList.length < 1 && (
        <td className="flex gap-5 px-6 whitespace-nowrap select-none absolute right-0 top-5">
          <BiEdit
            className="fill-[#A16207]"
            size={18}
            onClick={() => {
              setEditModalActive(true), clickToSelect(item.GradeID);
            }}
          />
          <TbTrash
            className="text-red-500"
            size={18}
            onClick={() => {
              setDeleteModalActive(true), clickToSelect(item.GradeID);
            }}
          />
        </td>
      )}
    </tr>
  );
}

export default TableRow;
