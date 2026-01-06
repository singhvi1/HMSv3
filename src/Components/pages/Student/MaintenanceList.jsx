import { useEffect, useState } from "react";
import {
  Wrench, Filter, Clock, CheckCircle, AlertCircle, MapPin,
  ChevronDown, ChevronUp, Plus, Calendar
} from "lucide-react";
import { maintenanceMockData } from "../../../../data";
import BackButton from "../../common/ui/Backbutton";
import Button from "../../common/ui/Button";
import { useNavigate } from "react-router-dom";
import AccordionItem from "../../common/AccordionItem";

// Status Configuration maps
const statusConfig = {
  pending: { color: "bg-amber-100 text-amber-700 border-amber-200", icon: Clock, label: "Pending" },
  in_progress: { color: "bg-blue-100 text-blue-700 border-blue-200", icon: Wrench, label: "In Progress" },
  resolved: { color: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle, label: "Resolved" },
  rejected: { color: "bg-red-100 text-red-700 border-red-200", icon: AlertCircle, label: "Rejected" }
};

const MaintenanceList = () => {
  const [filter, setFilter] = useState("all");
  const [data] = useState(maintenanceMockData);
  const [activeId, setActiveId] = useState(null);
  const navigate = useNavigate();

  const getAllIssues = async () => {
    // console.log("fds")
  }
  useEffect(() => { getAllIssues() }, [])



  const toggleAccordion = (id) => {
    setActiveId(prev => (prev === id ? null : id));
  };

  const filteredData = filter === "all"
    ? data
    : data.filter((item) => item.status === filter);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">

      {/* 1. Top Navigation & Header */}
      <BackButton />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Issue Tracker</h2>
            <p className="text-sm text-slate-500">Manage hostel maintenance requests</p>
          </div>
        </div>
        <Button
          variant="success"
          onClick={() => navigate("create")}
          className="flex items-center gap-2 shadow-lg shadow-indigo-100 p-3"
        >
          + Raise Request
        </Button>
      </div>

      {/* 2. Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-gray-100">
        <div className="flex items-center gap-2 pr-2 border-r border-gray-200 mr-2">
          <Filter size={16} className="text-indigo-500" />
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Filter</span>
        </div>
        {["all", "pending", "in_progress", "resolved"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${filter === s
              ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200"
              : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
          >
            {s === "all" ? "All" : statusConfig[s]?.label || s}
          </button>
        ))}
      </div>

      {/* 3. Issues List */}
      <div className="space-y-4">
        {filteredData.length > 0 ? (
          filteredData.map((item) => {
            const config = statusConfig[item.status];
            const StatusIcon = config.icon;

            return (
              <AccordionItem
                key={item._id}
                isOpen={activeId === item._id}
                onToggle={() => toggleAccordion(item._id)}
                icon={StatusIcon}
                title={
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span className="font-mono bg-gray-100 px-1.5 rounded">
                        #{item._id.slice(-6).toUpperCase()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                }
                rightSlot={
                  <span
                    className={`hidden sm:inline-flex px-3 py-1 text-xs font-bold rounded-full border ${config.color}`}
                  >
                    {config.label}
                  </span>
                }
              >
                {/* Accordion Body */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-3 mt-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border rounded-lg text-xs font-bold text-gray-600">
                    <MapPin size={14} className="text-indigo-500" />
                    Room {item.block}-{item.room_number}
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border rounded-lg text-xs font-bold text-gray-600">
                    <Wrench size={14} className="text-indigo-500" />
                    {item.category}
                  </div>
                </div>

                {item.staff_remark && (
                  <div className="mt-4 bg-indigo-50 border border-indigo-100 rounded-lg p-3">
                    <p className="text-xs font-bold text-indigo-900 uppercase mb-1">
                      Staff Response
                    </p>
                    <p className="text-sm text-indigo-800">
                      {item.staff_remark}
                    </p>
                  </div>
                )}
              </AccordionItem>
            );
          })
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};


const MaintenanceCard = ({ item, isOpen, onToggle }) => {
  const config = statusConfig[item.status] || statusConfig.pending;
  const StatusIcon = config.icon;

  return (
    <div className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'shadow-md border-indigo-200 ring-1 ring-indigo-50' : 'shadow-sm border-gray-200 hover:border-indigo-200'}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between p-5 text-left bg-white"
      >
        <div className="flex gap-4">
          {/* Status Icon Box */}
          <div className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${config.color}`}>
            <StatusIcon size={18} />
          </div>

          <div>
            <h3 className="font-bold text-gray-900 text-base leading-tight">
              {item.title}
            </h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
              <span className="text-xs font-mono text-gray-400 bg-gray-50 px-1.5 rounded">
                #{item._id.slice(-6).toUpperCase()}
              </span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar size={12} /> {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {isOpen ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
      </button>

      {/* Expandable Body */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="px-5 pb-6 pt-0 ml-[3.5rem]">
          <div className="space-y-4">
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs font-bold text-gray-600">
                <MapPin size={14} className="text-indigo-500" />
                Room {item.block}-{item.room_number}
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs font-bold text-gray-600">
                <Wrench size={14} className="text-indigo-500" />
                {item.category}
              </div>
            </div>

            {item.staff_remark && (
              <div className="mt-3 bg-indigo-50/50 border border-indigo-100 rounded-lg p-3">
                <p className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-1">Staff Response</p>
                <p className="text-sm text-indigo-800">{item.staff_remark}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const EmptyState = () => (
  <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
    <Wrench className="mx-auto h-12 w-12 text-gray-300 mb-3" />
    <h3 className="text-lg font-medium text-gray-900">No requests found</h3>
    <p className="text-gray-500 text-sm">Try adjusting your filters or raise a new request.</p>
  </div>
);

export default MaintenanceList;