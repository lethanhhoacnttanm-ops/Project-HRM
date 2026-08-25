import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';


const DepartmentBarChart = ({ dataDepartment, dataEmployee }) => {

  const departmentCountMap = {};

  dataEmployee.forEach(emp => {
    
    const deptName = emp.department?.name || 'Khác';
    
    if (!departmentCountMap[deptName]) {
      departmentCountMap[deptName] = 0;
    }
    departmentCountMap[deptName] += 1;
  });

  const chartData = Object.keys(departmentCountMap).map(name => ({
    name: name,
    employees: departmentCountMap[name]
  }));

  return (                                                                                                
    <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs">
      <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 mb-4">
        Phân bố theo phòng ban
      </h3>
      {console.log(dataDepartment)}
{console.log(dataEmployee)}
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barSize={28}>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
            />

            <Tooltip
              cursor={{ fill: 'transparent' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-slate-900 text-white text-xs px-3 py-1.5 rounded-xl shadow-lg">
                      <span className="font-bold">{payload[0].payload.name}</span>: {payload[0].value} nhân viên
                    </div>
                  );
                }
                return null;
              }}
            />

            <Bar
              dataKey="employees"
              fill="#6366f1"
              radius={[12, 12, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DepartmentBarChart;