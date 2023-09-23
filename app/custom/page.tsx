"use client"; // Marquez cette ligne comme un Client Component
import Trend from './trend';

export default function Trendy() {
  return (
    <div className="flex flex-col p-12 items-start">
      <Trend></Trend>
    </div>
  );
}
