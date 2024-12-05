import { perPageLimit } from "@/utils/config";
import React from "react";

interface ITotalPage {
  page: number;
  total: number;
}

const TotalPageTable: React.FC<ITotalPage> = ({ page, total }) => {
  return (
    <div className="text-sm text-slate-400">
      <b className="mx-1">
        {(page - 1) * perPageLimit + 1}-{Math.min(page * perPageLimit, total)}
      </b>
      از {total}
    </div>
  );
};

export default TotalPageTable;
