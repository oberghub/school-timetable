"use client";
import SubjectTable from "@/app/management/subject/component/SubjectTable";
import { useSubjectData } from "../../_hooks/subjectData";
import Loading from "@/app/loading";

function SubjectManage() {
  const { data, isLoading, error, mutate } = useSubjectData();
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <SubjectTable
        tableHead={["รหัสวิชา", "ชื่อวิชา", "หน่วยกิต", "สาระการเรียนรู้", ""]}
        tableData={data}
        mutate={mutate}
      />
      )}
    </>
  );
}

export default SubjectManage;
