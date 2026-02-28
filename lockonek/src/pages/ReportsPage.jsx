import { Topbar } from "../components/layout/Topbar";
import { Btn, StatCard, ChartBar } from "../components/ui";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { SectionTitle } from "../components/ui";

export const ReportsPage = ({ toast }) => (
  <div className="fade-up">
    <Topbar title="Reports & Analytics">
      <Btn onClick={() => toast("Exporting LMIS data...")}>📥 Export LMIS Data</Btn>
    </Topbar>
    <div style={{ padding: 28 }}>
      <div style={{ background: "var(--surface2)", borderRadius: "var(--rs)", padding: "14px 18px", fontSize: 13, color: "var(--muted)", marginBottom: 20 }}>
        📊 <strong style={{ color: "var(--text)" }}>Labor Market Information System (LMIS):</strong> Displays job demand metrics, supply indicators, application ratios, and placement outcomes for LGU planning and policy decisions.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, marginBottom: 22 }}>
        <StatCard icon="✅" value="68%" label="Placement Rate (YTD)" color="green" />
        <StatCard icon="⏳" value="14 days" label="Avg. Time-to-Match" color="amber" />
        <StatCard icon="📬" value="2,841" label="Total Applications (YTD)" color="blue" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
        <Card>
          <CardHeader><SectionTitle>Top Industries by Job Demand</SectionTitle></CardHeader>
          <CardBody>
            {[
              ["Government / LGU", 85, 180],
              ["Commerce & Trade", 70, 148, "#C8873A"],
              ["Agriculture", 60, 127, "#16A34A"],
              ["Healthcare", 45, 95, "#2563EB"],
              ["Food & Hospitality", 35, 74, "#EC4899"],
              ["Education", 28, 59, "#8B5CF6"],
            ].map(([l, p, v, c]) => <ChartBar key={l} label={l} pct={p} value={v} color={c} />)}
          </CardBody>
        </Card>
        <Card>
          <CardHeader><SectionTitle>Application Status Breakdown</SectionTitle></CardHeader>
          <CardBody>
            {[
              ["Confirmed / Placed", 68, 1932],
              ["Matched", 55, 1562, "#C8873A"],
              ["Endorsed", 45, 1278, "#2563EB"],
              ["Pending", 28, 794, "#F59E0B"],
              ["Declined", 12, 340, "#EF4444"],
            ].map(([l, p, v, c]) => <ChartBar key={l} label={l} pct={p} value={v} color={c} />)}
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader><SectionTitle>Monthly Placement Trend</SectionTitle></CardHeader>
        <CardBody>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 130 }}>
            {[
              ["Jan", 55, 82],
              ["Feb", 50, 74],
              ["Mar", 66, 98],
              ["Apr", 77, 115, "#2D5F3F"],
              ["May", 59, 88],
              ["Jun", 88, 132, "#C8873A"],
            ].map(([m, h, v, c]) => (
              <div key={m} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, flex: 1 }}>
                <div style={{ background: c || "var(--accent-l)", borderRadius: "6px 6px 0 0", width: "100%", height: `${h}%`, transition: "background .15s", cursor: "pointer" }}
                  onMouseEnter={(e) => (e.target.style.background = "var(--accent)")}
                  onMouseLeave={(e) => (e.target.style.background = c || "var(--accent-l)")}
                  title={`${m}: ${v} placements`} />
                <span style={{ fontSize: 11, color: "var(--muted)" }}>{m}</span>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  </div>
);
