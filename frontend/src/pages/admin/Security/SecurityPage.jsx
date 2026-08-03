import React, { useState } from "react";

import SecurityHealthCard from "../../../components/admin/Security/SecurityHealthCard.jsx";
import SecurityStatsGrid from "../../../components/admin/Security/SecurityStatsGrid.jsx";
import SecurityPoliciesCard from "../../../components/admin/Security/SecurityPoliciesCard.jsx";
import SessionManagementTable from "../../../components/admin/Security/SessionManagementTable.jsx";
import AuditLogsTable from "../../../components/admin/Security/AuditLogsTable.jsx";
import SecurityModal from "../../../components/admin/Security/SecurityModal.jsx";

export default function SecurityPage() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "success", 
    targetSession: null,
  });

  const handleOpenSuccessModal = () => {
    setModalState({ isOpen: true, mode: "success", targetSession: null });
  };

  const handleRevokeSession = (session) => {
    setModalState({ isOpen: true, mode: "revoke", targetSession: session });
  };

  const handleRevokeAll = () => {
    setModalState({ isOpen: true, mode: "revoke", targetSession: null });
  };

  return (
    <div className="space-y-6 p-2">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Quản lý Bảo mật
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <SecurityHealthCard />
        </div>

        <div className="lg:col-span-2">
          <SecurityStatsGrid />
        </div>
      </div>

      <SecurityPoliciesCard onSave={handleOpenSuccessModal} />

      <SessionManagementTable
        onRevokeSession={handleRevokeSession}
        onRevokeAll={handleRevokeAll}
      />

      <AuditLogsTable />

      <SecurityModal
        isOpen={modalState.isOpen}
        onClose={() =>
          setModalState({ isOpen: false, mode: "success", targetSession: null })
        }
        mode={modalState.mode}
        targetSession={modalState.targetSession}
      />
    </div>
  );
}