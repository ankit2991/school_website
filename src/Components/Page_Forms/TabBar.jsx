import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";

function TabBar({ tabs = [], defaultTab = 0, style = "" }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Handle swipe gestures
  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setActiveTab((prev) => (prev < tabs.length - 1 ? prev + 1 : prev)),
    onSwipedRight: () =>
      setActiveTab((prev) => (prev > 0 ? prev - 1 : prev)),
    trackMouse: true, // also works with mouse drag
  });

  return (
    <div className={`w-full ${style}`}>
      {/* Tab Buttons */}
      <div className="flex border-b border-gray-300 mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex-1 text-center px-2 py-2 font-medium transition-colors duration-200 ${
              activeTab === index
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content (swipeable area) */}
      <div {...handlers} className="p-2 min-h-[200px]">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
}

export default TabBar;
