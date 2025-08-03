import { motion } from "framer-motion";

interface HeatmapProps {
  data: { date: string; count: number }[];
}

export default function Heatmap({ data }: HeatmapProps) {
  const getIntensityColor = (count: number) => {
    if (count === 0) return 'bg-gray-700';
    if (count === 1) return 'bg-calistheniq-orange/40';
    if (count === 2) return 'bg-calistheniq-orange/70';
    return 'bg-calistheniq-emerald';
  };

  const weeks: { date: string; count: number }[][] = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-full">
        {/* Month labels */}
        <div className="flex mb-2 text-xs text-gray-400">
          {monthLabels.map((month, index) => (
            <div key={month} className="flex-1 text-center">
              {month}
            </div>
          ))}
        </div>
        
        <div className="flex">
          {/* Day labels */}
          <div className="flex flex-col mr-2 text-xs text-gray-400">
            {dayLabels.map((day, index) => (
              <div key={day} className="h-3 mb-1 flex items-center">
                {index % 2 === 0 ? day : ''}
              </div>
            ))}
          </div>
          
          {/* Heatmap grid */}
          <div className="flex space-x-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col space-y-1">
                {week.map((day, dayIndex) => (
                  <motion.div
                    key={day.date}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (weekIndex * 7 + dayIndex) * 0.01 }}
                    className={`w-3 h-3 rounded-sm ${getIntensityColor(day.count)} hover:ring-2 hover:ring-calistheniq-orange cursor-pointer transition-all`}
                    title={`${day.date}: ${day.count} workout${day.count !== 1 ? 's' : ''}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
