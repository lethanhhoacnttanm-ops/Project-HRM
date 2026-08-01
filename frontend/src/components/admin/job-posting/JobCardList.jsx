import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, MapPin, Clock, DollarSign, ArrowRight } from "lucide-react";

const JobCardList = ({ jobs = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="bg-white p-5 rounded-3xl border border-gray-100 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <Badge
                variant="outline"
                className={`rounded-md font-bold px-2.5 py-0.5 text-xs border-0 ${job.department === 'Business Analyst'
                    ? 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300'
                    : 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                  }`}
              >
                {job.department}
              </Badge>
              <Button className="text-gray-400 hover:text-indigo-600 cursor-pointer">
                <FileText className="text-lg" />
              </Button>
            </div>

            <h3 className="text-lg font-black text-gray-800 tracking-tight mb-2">{job.title}</h3>

            <div className="flex flex-wrap gap-3 text-[11px] text-gray-500 font-medium">
              <span className="flex items-center gap-1"><MapPin className="text-lg" /> {job.location}</span>
              <span className="flex items-center gap-1"><Clock className="text-lg" /> {job.type}</span>
              <span className="flex items-center gap-1"><DollarSign className="text-lg" /> {job.salary}</span>
            </div>

            <div className="mt-4 space-y-1">
              <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Yêu cầu chính</p>
              <ul className="text-xs text-gray-500 list-disc list-inside space-y-0.5">
                {job.requirements?.map((req, idx) => (
                  <li key={idx} className="truncate">{req}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
            <Button
              type="primary"
              icon={<ArrowRight />}
              onClick={() => navigate(`/admin-page/candidate-approval?jobId=${job.id}`)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold border-none h-9 flex-1"
            >
              Duyệt CV ({job.candidateCount || 0})
            </Button>

            <Button className="rounded-xl text-xs font-bold border-gray-200 text-gray-600 h-9">
              Refer
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobCardList;