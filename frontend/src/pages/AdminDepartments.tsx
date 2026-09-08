import React, { useMemo, useState } from 'react';
import {
  Building2,
  Search,
  Plus,
  Settings,
  Eye,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock3,
  Server,
  Users,
  RefreshCw,
} from 'lucide-react';

type Department = {
  id: string;
  name: string;
  code: string;
  system: string;
  apiStatus: 'Operational' | 'Degraded' | 'Offline';
  services: number;
  lastSync: string;
  endpoint: string;
  records: string;
};

const departments: Department[] = [
  {
    id: 'D001',
    name: 'Income Department',
    code: 'INCOME',
    system: 'Income Verification System',
    apiStatus: 'Operational',
    services: 4,
    lastSync: '2 min ago',
    endpoint: '/mock/income',
    records: '2.4M',
  },
  {
    id: 'D002',
    name: 'Education Department',
    code: 'EDU',
    system: 'Education Records System',
    apiStatus: 'Operational',
    services: 6,
    lastSync: '1 min ago',
    endpoint: '/mock/education',
    records: '4.8M',
  },
  {
    id: 'D003',
    name: 'Property Department',
    code: 'PROPERTY',
    system: 'Property Registry System',
    apiStatus: 'Operational',
    services: 3,
    lastSync: '4 min ago',
    endpoint: '/mock/property',
    records: '1.7M',
  },
  {
    id: 'D004',
    name: 'Identity Department',
    code: 'IDENTITY',
    system: 'Identity Verification System',
    apiStatus: 'Operational',
    services: 5,
    lastSync: '1 min ago',
    endpoint: '/mock/identity',
    records: '8.2M',
  },
];

const statusStyles = {
  Operational: {
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
    icon: CheckCircle2,
  },
  Degraded: {
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
    icon: AlertTriangle,
  },
  Offline: {
    badge: 'bg-red-50 text-red-700 border-red-200',
    dot: 'bg-red-500',
    icon: AlertTriangle,
  },
};

export const AdminDepartments: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredDepartments = useMemo(() => {
    return departments.filter((department) => {
      const matchesSearch =
        department.name.toLowerCase().includes(search.toLowerCase()) ||
        department.code.toLowerCase().includes(search.toLowerCase()) ||
        department.system.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        selectedStatus === 'All' ||
        department.apiStatus === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [search, selectedStatus]);

  const operationalCount = departments.filter(
    (d) => d.apiStatus === 'Operational'
  ).length;

  const totalServices = departments.reduce(
    (sum, department) => sum + department.services,
    0
  );

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 text-sm text-blue-600 font-semibold mb-2">
            <Building2 className="h-4 w-4" />
            Government Integration
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Department Management
          </h1>

          <p className="mt-2 text-slate-500 max-w-2xl">
            Manage government departments, connected systems, services and
            interoperability endpoints through CIVOGATE.
          </p>
        </div>

        <button
          onClick={() => alert('Add Department feature will be connected to the backend in the next phase.')}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F172A] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition"
        >
          <Plus className="h-4 w-4" />
          Add Department
        </button>
      </section>

      {/* KPI CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="h-11 w-11 rounded-xl bg-blue-50 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>

            <span className="text-xs font-semibold text-slate-400">
              REGISTERED
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-500">Total Departments</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">
            {departments.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="h-11 w-11 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Activity className="h-5 w-5 text-emerald-600" />
            </div>

            <span className="text-xs font-semibold text-emerald-600">
              LIVE
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-500">Operational APIs</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">
            {operationalCount}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="h-11 w-11 rounded-xl bg-amber-50 flex items-center justify-center">
              <Server className="h-5 w-5 text-amber-600" />
            </div>

            <span className="text-xs font-semibold text-slate-400">
              REGISTERED
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-500">Connected Services</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">
            {totalServices}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="h-11 w-11 rounded-xl bg-violet-50 flex items-center justify-center">
              <Users className="h-5 w-5 text-violet-600" />
            </div>

            <span className="text-xs font-semibold text-slate-400">
              DEMO DATA
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-500">
            Connected Records
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            17.1M
          </p>
        </div>

      </section>

      {/* SEARCH + FILTER */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

            <input
              type="text"
              placeholder="Search departments, systems or codes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Operational">Operational</option>
              <option value="Degraded">Degraded</option>
              <option value="Offline">Offline</option>
            </select>

            <button
              onClick={() => window.location.reload()}
              className="rounded-xl border border-slate-200 p-3 text-slate-600 hover:bg-slate-50 transition"
              title="Refresh"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>

        </div>

      </section>

      {/* DEPARTMENT CARDS */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        {filteredDepartments.map((department) => {
          const StatusIcon = statusStyles[department.apiStatus].icon;

          return (
            <div
              key={department.id}
              className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition"
            >

              {/* CARD HEADER */}
              <div className="p-6 border-b border-slate-100">

                <div className="flex items-start justify-between gap-4">

                  <div className="flex items-start gap-4">

                    <div className="h-12 w-12 rounded-xl bg-slate-900 flex items-center justify-center shrink-0">
                      <Building2 className="h-6 w-6 text-white" />
                    </div>

                    <div>
                      <h2 className="text-lg font-bold text-slate-900">
                        {department.name}
                      </h2>

                      <p className="text-sm text-slate-500 mt-1">
                        {department.system}
                      </p>

                      <span className="inline-block mt-2 rounded-md bg-slate-100 px-2 py-1 text-[11px] font-mono font-semibold text-slate-600">
                        {department.code}
                      </span>
                    </div>

                  </div>

                  <span
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                      statusStyles[department.apiStatus].badge
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        statusStyles[department.apiStatus].dot
                      }`}
                    />
                    {department.apiStatus}
                  </span>

                </div>

              </div>

              {/* DETAILS */}
              <div className="p-6">

                <div className="grid grid-cols-2 gap-4">

                  <div className="rounded-xl bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-slate-500 text-xs">
                      <Server className="h-4 w-4" />
                      Services
                    </div>

                    <p className="mt-2 text-xl font-bold text-slate-900">
                      {department.services}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-slate-500 text-xs">
                      <Users className="h-4 w-4" />
                      Records
                    </div>

                    <p className="mt-2 text-xl font-bold text-slate-900">
                      {department.records}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-slate-500 text-xs">
                      <Clock3 className="h-4 w-4" />
                      Last Sync
                    </div>

                    <p className="mt-2 text-sm font-semibold text-slate-800">
                      {department.lastSync}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-slate-500 text-xs">
                      <Activity className="h-4 w-4" />
                      Endpoint
                    </div>

                    <p className="mt-2 text-sm font-mono font-semibold text-slate-800">
                      {department.endpoint}
                    </p>
                  </div>

                </div>

                {/* ACTIONS */}
                <div className="mt-5 flex flex-col sm:flex-row gap-3">

                  <button
                    onClick={() =>
                      alert(
                        `${department.name}\n\nServices: ${department.services}\nAPI: ${department.endpoint}\nStatus: ${department.apiStatus}`
                      )
                    }
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    <Eye className="h-4 w-4" />
                    View Services
                  </button>

                  <button
                    onClick={() =>
                      alert(
                        `API configuration for ${department.name} will be connected to the backend in the next phase.`
                      )
                    }
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
                  >
                    <Settings className="h-4 w-4" />
                    Configure API
                  </button>

                </div>

              </div>

            </div>
          );
        })}

      </section>

      {/* EMPTY STATE */}
      {filteredDepartments.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <Building2 className="mx-auto h-10 w-10 text-slate-300" />

          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            No departments found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Try changing your search or status filter.
          </p>
        </div>
      )}

      {/* FOOTER INFO */}
      <section className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">

        <div className="flex items-start gap-3">

          <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
            <StatusIcon />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              CIVOGATE Department Integration
            </h3>

            <p className="mt-1 text-sm text-slate-600">
              Each department can connect through a reusable adapter and
              schema mapping without changing the CIVOGATE core
              interoperability engine.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
};

export default AdminDepartments;