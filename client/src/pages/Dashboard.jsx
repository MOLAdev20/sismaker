import Layout from "../AdminLayout";
import StatCard from "../components/StatCard";

const Dashboard = () => {
  return (
    <Layout>
      <main className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold">Employee Overview</h1>
            <p className="mt-1 text-sm text-slate-600">
              Template layout: cards, table, and responsive containers.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50">
              Export CSV
            </button>
            <button className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800">
              Add Employee
            </button>
          </div>
        </div>

        {/* Stats cards */}
        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Employees" value="128" hint="+4 this week" />
          <StatCard title="Active" value="120" hint="93.7%" />
          <StatCard title="Inactive" value="8" hint="Needs review" />
          <StatCard title="Departments" value="6" hint="Engineering leads" />
        </section>

        {/* Two-column area */}
        <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Main panel */}
          <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white">
            <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold">Employees</div>
                <div className="text-xs text-slate-500">
                  List layout + filters (template)
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <input
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200 sm:w-64"
                  placeholder="Search name / email / ID..."
                />
                <div className="flex gap-2">
                  <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm">
                    <option>Status: All</option>
                    <option>ACTIVE</option>
                    <option>INACTIVE</option>
                  </select>
                  <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm">
                    <option>Dept: All</option>
                    <option>Engineering</option>
                    <option>HR</option>
                    <option>Sales</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto p-4">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-200 text-slate-600">
                  <tr>
                    <th className="py-2 pr-4">Employee ID</th>
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Department</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2 pr-0">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      employeeId: "EMP001",
                      name: "Budi Santoso",
                      dept: "Engineering",
                      status: "ACTIVE",
                    },
                    {
                      employeeId: "EMP002",
                      name: "Siti Aminah",
                      dept: "HR",
                      status: "INACTIVE",
                    },
                    {
                      employeeId: "EMP003",
                      name: "Andi Pratama",
                      dept: "Sales",
                      status: "ACTIVE",
                    },
                  ].map((e) => (
                    <tr
                      key={e.employeeId}
                      className="border-b border-slate-100"
                    >
                      <td className="py-3 pr-4 font-mono text-xs text-slate-700">
                        {e.employeeId}
                      </td>
                      <td className="py-3 pr-4">
                        <div className="font-medium">{e.name}</div>
                        <div className="text-xs text-slate-500">
                          {e.name.toLowerCase().replace(" ", ".")}@example.com
                        </div>
                      </td>
                      <td className="py-3 pr-4">{e.dept}</td>
                      <td className="py-3 pr-4">
                        <StatusPill status={e.status} />
                      </td>
                      <td className="py-3 pr-0">
                        <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs hover:bg-slate-50">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination placeholder */}
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm text-slate-600">
                  Page 1 of 10 • 20 per page
                </span>
                <div className="flex gap-2">
                  <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50">
                    Prev
                  </button>
                  <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Side panel */}
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="text-sm font-semibold">Quick actions</div>
              <div className="mt-3 grid grid-cols-1 gap-2">
                <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50">
                  Create Department
                </button>
                <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50">
                  Invite HR User
                </button>
                <button className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800">
                  Add Employee
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="text-sm font-semibold">Recent activity</div>
              <ul className="mt-3 space-y-3 text-sm text-slate-700">
                <li className="flex gap-3">
                  <Dot />
                  <div>
                    <div className="font-medium">EMP003 created</div>
                    <div className="text-xs text-slate-500">2 hours ago</div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Dot />
                  <div>
                    <div className="font-medium">EMP002 deactivated</div>
                    <div className="text-xs text-slate-500">Yesterday</div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Dot />
                  <div>
                    <div className="font-medium">HR invited</div>
                    <div className="text-xs text-slate-500">2 days ago</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

function StatusPill({ status }) {
  const isActive = status === "ACTIVE";
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        isActive
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-700",
      ].join(" ")}
    >
      {status}
    </span>
  );
}

function Dot() {
  return <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-slate-300" />;
}

export default Dashboard;
