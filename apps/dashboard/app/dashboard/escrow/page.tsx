import { getMyEscrows } from "@pacto/api";
import { formatKoreanDate, formatPoint, getSettlementStatusView } from "@pacto/utils";

export default async function EscrowPage() {
  const escrows = await getMyEscrows();

  return (
    <>
      <header className="topbar">
        <div>
          <p className="eyebrow">Escrow</p>
          <h1>정산 원장</h1>
        </div>
      </header>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>에스크로 내역</h2>
            <p>잠긴 금액과 정산 완료 금액을 분리해서 확인합니다.</p>
          </div>
          <span>{escrows.length}건</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>원장 ID</th>
                <th>캠페인</th>
                <th>금액</th>
                <th>상태</th>
                <th>생성일</th>
              </tr>
            </thead>
            <tbody>
              {escrows.map((escrow) => {
                const statusView = getSettlementStatusView(escrow.status);

                return (
                  <tr key={escrow.id}>
                    <td>#{escrow.id}</td>
                    <td>캠페인 #{escrow.campaignId}</td>
                    <td>{formatPoint(escrow.amount)}</td>
                    <td>
                      <span className={`status-badge ${statusView.tone}`}>{statusView.label}</span>
                    </td>
                    <td>{formatKoreanDate(escrow.createdAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
