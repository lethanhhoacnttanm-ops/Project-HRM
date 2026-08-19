import React from "react";
import ProcessTable from "./tables/ProcessTable.jsx";
import EligibilityTable from "./tables/EligibilityTable.jsx";
import HistoryTable from "./tables/HistoryTable.jsx";

export default function PromotionTable({ activeTab, dataPromotions, pageSize, pagination, pageNumber, setPageNumber, onSubmitUpdatePromotion}) {
  return (
    <div className="bg-white border border-slate-200 rounded-b-xl border-t-0 p-4 dark:bg-gray-900 dark:border-gray-800">
      {activeTab === "process" && <ProcessTable dataPromotion={dataPromotions} pageSize={pageSize} pagination={pagination} pageNumber={pageNumber} setPageNumber={setPageNumber} onSubmitUpdatePromotion={onSubmitUpdatePromotion}/>}
      {activeTab === "eligibility" && <EligibilityTable dataPromotion={dataPromotions} pageSize={pageSize} pagination={pagination} pageNumber={pageNumber} setPageNumber={setPageNumber} onSubmitUpdatePromotion={onSubmitUpdatePromotion}/>}
      {activeTab === "history" && <HistoryTable dataPromotion={dataPromotions} pageSize={pageSize} pagination={pagination} pageNumber={pageNumber} setPageNumber={setPageNumber} onSubmitUpdatePromotion={onSubmitUpdatePromotion}/>}
    </div>
  );
}