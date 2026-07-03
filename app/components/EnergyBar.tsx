"use client";
export default function EnergyBar({ value }: { value: number }) {
  return (
    <div className="w-full bg-gray-800 rounded-full h-4 mb-2 overflow-hidden">
      <div 
        className="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full transition-all duration-1000"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}