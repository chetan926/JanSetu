import React, { useMemo, useState } from "react";
import {
  Search,
  Eye,
  CheckCircle2,
  Clock3,
  XCircle,
  ShieldCheck,
  User,
  Building2,
  FileText,
  Activity,
  ChevronDown,
  X,
} from "lucide-react";

type ApplicationStatus =
  | "Approved"
  | "Pending"
  | "Verification"
  | "Rejected";

type Application = {
  id: string;
  citizen: string;
  citizenId: string;
  service: string;
  department: string;
  status: ApplicationStatus;
  submitted: string;
  income: string;
  education: string;
  identity: string;
  property: string;
};

const applications: Application[] = [
  {
    id: "APP-2026-00124",
    citizen: "Ravi Kumar",
    citizenId: "C1001",
    service: "Education Scholarship",
    department: "Education",
    status: "Approved",
    submitted: "06 Sep 2026",
    income: "₹1,80,000",
    education: "ACTIVE",
    identity: "VERIFIED",
    property: "VERIFIED",
  },
  {
    id: "APP-2026-00125",
    citizen: "Priya Sharma",
    citizenId: "C1002",
    service: "Housing Assistance",
    department: "Housing",
    status: "Pending",
    submitted: "06 Sep 2026",
    income: "₹2,40,000",
    education: "VERIFIED",
    identity: "VERIFIED",
    property: "PENDING",
  },
  {
    id: "APP-2026-00126",
    citizen: "Arjun Rao",
    citizenId: "C1003",
    service: "Employment Assistance",
    department: "Employment",
    status: "Verification",
    submitted: "05 Sep 2026",
    income: "₹1,50,000",
    education: "ACTIVE",
    identity: "VERIFIED",
    property: "PENDING",
  },
  {
    id: "APP-2026-00127",
    citizen: "Sneha Reddy",
    citizenId: "C1004",
    service: "Education Scholarship",
    department: "Education",
    status: "Approved",
    submitted: "05 Sep 2026",
    income: "₹1,20,000",
    education: "ACTIVE",
    identity: "VERIFIED",
    property: "VERIFIED",
  },
  {
    id: "APP-2026-00128",
    citizen: "Kiran Patel",
    citizenId: "C1005",
    service: "Housing Assistance",
    department: "Housing",
    status: "Rejected",
    submitted: "04 Sep 2026",
    income: "₹4,20,000",
    education: "VERIFIED",
    identity: "VERIFIED",
    property: "VERIFIED",
  },
  {
    id: "APP-2026-00129",
    citizen: "Ananya Singh",
    citizenId: "C1006",
    service: "Employment Assistance",
    department: "Employment",
    status: "Pending",
    submitted: "04 Sep 2026",
    income: "₹1,70,000",
    education: "ACTIVE",
    identity: "VERIFIED",
    property: "VERIFIED",
  },
];

const statusConfig = {
  Approved: {
    icon: CheckCircle2,
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  Pending: {
    icon: Clock3,
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  Verification: {
    icon: ShieldCheck,
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  Rejected: {
    icon: XCircle,
    className: "bg-red-50 text-red-700 border-red-200",
  },
};

export const AdminApplications: React.FC = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.id.toLowerCase().includes(search.toLowerCase()) ||
        app.citizen.toLowerCase().includes(search.toLowerCase()) ||
        app.service.toLowerCase().includes(search.toLowerCase()) ||
        app.department.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || app.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const stats = [
    {
      title: "Total Applications",
      value: "1,248",
      icon: FileText,
      description: "All registered applications",
      className: "text-blue-700 bg-blue-50",
    },
    {
      title: "Pending",
      value: "184",
      icon: Clock3,
      description: "Awaiting processing",
      className: "text-amber-700 bg-amber-50",
    },
    {
      title: "Approved",
      value: "936",
      icon: CheckCircle2,
      description: "Successfully approved",
      className: "text-emerald-700 bg-emerald-50",
    },
    {
      title: "Rejected",
      value: "87",
      icon: XCircle,
      description: "Applications rejected",
      className: "text-red-700 bg-red-50",
    },
    {
      title: "Verification",
      value: "41",
      icon: ShieldCheck,
      description: "Currently being verified",
      className: "text-purple-700 bg-purple-50",
    },
  ];

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <section>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-700 mb-2">
              <Activity size={16} />
              APPLICATION MANAGEMENT
            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Government Applications
            </h1>

            <p className="mt-2 text-slate-600 max-w-3xl">
              Monitor, search and inspect citizen applications processed
              through the CIVOGATE interoperability layer.
            </p>
          </div>

          <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
              Demo Environment
            </p>
            <p className="text-sm text-blue-900 mt-1">
              Data shown is simulated for SIH presentation.
            </p>
          </div>
        </div>
      </section>

      {/* STAT CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>

                  <p className="text-3xl font-bold text-slate-900 mt-2">
                    {stat.value}
                  </p>
                </div>

                <div className={`p-3 rounded-xl ${stat.className}`}>
                  <Icon size={20} />
                </div>
              </div>

              <p className="text-xs text-slate-500 mt-3">
                {stat.description}
              </p>
            </div>
          );
        })}
      </section>

      {/* SEARCH + FILTER */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="p-5 border-b border-slate-200">
          <div className="flex flex-col lg:flex-row gap-4">

            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search application ID, citizen, service or department..."
                className="w-full h-12 rounded-xl border border-slate-300 bg-slate-50 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-12 min-w-[190px] appearance-none rounded-xl border border-slate-300 bg-slate-50 px-4 pr-10 text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
              >
                <option value="All">All Statuses</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Verification">Verification</option>
                <option value="Rejected">Rejected</option>
              </select>

              <ChevronDown
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"
              />
            </div>

          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Application
                </th>

                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Citizen
                </th>

                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Service
                </th>

                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Department
                </th>

                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Status
                </th>

                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Submitted
                </th>

                <th className="text-right px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredApplications.map((app) => {
                const config = statusConfig[app.status];
                const StatusIcon = config.icon;

                return (
                  <tr
                    key={app.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-5">
                      <p className="font-semibold text-slate-900">
                        {app.id}
                      </p>

                      <p className="text-xs text-slate-500 mt-1">
                        Cross-department workflow
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center">
                          <User size={17} className="text-slate-500" />
                        </div>

                        <div>
                          <p className="font-medium text-slate-900">
                            {app.citizen}
                          </p>

                          <p className="text-xs text-slate-500">
                            {app.citizenId}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <p className="font-medium text-slate-800">
                        {app.service}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-slate-700">
                        <Building2 size={15} />
                        {app.department}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${config.className}`}
                      >
                        <StatusIcon size={14} />
                        {app.status}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-600">
                      {app.submitted}
                    </td>

                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() => setSelectedApplication(app)}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                      >
                        <Eye size={16} />
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredApplications.length === 0 && (
            <div className="py-16 text-center">
              <Search className="mx-auto text-slate-300" size={36} />

              <p className="mt-3 font-semibold text-slate-700">
                No applications found
              </p>

              <p className="text-sm text-slate-500 mt-1">
                Try changing your search or status filter.
              </p>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-slate-200 text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-800">
            {filteredApplications.length}
          </span>{" "}
          demo applications
        </div>
      </section>

      {/* APPLICATION DETAIL MODAL */}
      {selectedApplication && (
        <div className="fixed inset-0 z-[100] bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl">

            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-blue-700 uppercase tracking-wide">
                  Application Details
                </p>

                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  {selectedApplication.id}
                </h2>
              </div>

              <button
                onClick={() => setSelectedApplication(null)}
                className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200"
              >
                <X size={19} />
              </button>
            </div>

            <div className="p-6 space-y-7">

              {/* Citizen + Service */}
              <div className="grid md:grid-cols-2 gap-5">

                <div className="rounded-2xl border border-slate-200 p-5">
                  <p className="text-xs font-bold text-slate-500 uppercase">
                    Citizen
                  </p>

                  <p className="text-xl font-bold text-slate-900 mt-2">
                    {selectedApplication.citizen}
                  </p>

                  <p className="text-sm text-slate-500 mt-1">
                    Citizen ID: {selectedApplication.citizenId}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <p className="text-xs font-bold text-slate-500 uppercase">
                    Requested Service
                  </p>

                  <p className="text-xl font-bold text-slate-900 mt-2">
                    {selectedApplication.service}
                  </p>

                  <p className="text-sm text-slate-500 mt-1">
                    Department: {selectedApplication.department}
                  </p>
                </div>

              </div>

              {/* Status */}
              <div className="rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase">
                      Current Status
                    </p>

                    <p className="text-lg font-bold text-slate-900 mt-1">
                      {selectedApplication.status}
                    </p>
                  </div>

                  {(() => {
                    const config =
                      statusConfig[selectedApplication.status];

                    const Icon = config.icon;

                    return (
                      <span
                        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${config.className}`}
                      >
                        <Icon size={17} />
                        {selectedApplication.status}
                      </span>
                    );
                  })()}
                </div>
              </div>

              {/* Verification */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck size={20} className="text-blue-700" />

                  <h3 className="text-lg font-bold text-slate-900">
                    Verification Summary
                  </h3>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

                  {[
                    ["Identity", selectedApplication.identity],
                    ["Income", selectedApplication.income],
                    ["Education", selectedApplication.education],
                    ["Property", selectedApplication.property],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-xl border border-slate-200 p-4"
                    >
                      <p className="text-xs font-semibold text-slate-500">
                        {label}
                      </p>

                      <p className="mt-2 font-bold text-slate-900">
                        {value}
                      </p>

                      {value === "VERIFIED" ||
                      value === "ACTIVE" ? (
                        <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-700">
                          <CheckCircle2 size={13} />
                          Verified
                        </div>
                      ) : (
                        <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-amber-700">
                          <Clock3 size={13} />
                          Pending
                        </div>
                      )}
                    </div>
                  ))}

                </div>
              </div>

              {/* Interoperability Trace */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Activity size={20} className="text-blue-700" />

                  <h3 className="text-lg font-bold text-slate-900">
                    Interoperability Request Trace
                  </h3>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                  {[
                    ["01", "Citizen authenticated", "Identity"],
                    ["02", "Consent verified", "CIVOGATE Consent Manager"],
                    ["03", "Income data retrieved", "Income API"],
                    ["04", "Education data retrieved", "Education API"],
                    ["05", "Schema transformed", "Interoperability Engine"],
                    ["06", "Canonical data created", "Canonical Data Model"],
                    ["07", "Eligibility evaluated", "Eligibility Engine"],
                    ["08", "Application submitted", "Service Department"],
                  ].map(([number, title, system], index) => (
                    <div
                      key={number}
                      className="flex gap-4"
                    >
                      <div className="flex flex-col items-center">
                        <div className="h-9 w-9 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs font-bold">
                          {number}
                        </div>

                        {index < 7 && (
                          <div className="w-px h-8 bg-blue-200" />
                        )}
                      </div>

                      <div className="pb-5">
                        <p className="font-semibold text-slate-900">
                          {title}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                          {system}
                        </p>
                      </div>
                    </div>
                  ))}

                </div>
              </div>

              {/* Audit */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <div className="flex gap-3">
                  <CheckCircle2
                    size={21}
                    className="text-emerald-700 mt-0.5"
                  />

                  <div>
                    <p className="font-bold text-emerald-900">
                      Audit Trail Available
                    </p>

                    <p className="text-sm text-emerald-800 mt-1">
                      Every verification request, transformation,
                      eligibility decision and application action is
                      recorded for traceability.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminApplications;