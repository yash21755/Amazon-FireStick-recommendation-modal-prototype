import React from "react";

const RowSection = ({ title, items, onItemClick }) => {
  return (
    <div className="space-y-3 ml-5">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {items.map((item, index) => (
          <div
            key={item.id || `${item.title}-${index}`}
            className="min-w-[220px] bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer"
            onClick={() => onItemClick && onItemClick(item)}
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-80 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/alt_poster.png";
              }}
            />
            <div className="p-2">
              <h3 className="text-sm font-semibold truncate">{item.title}</h3>
              {item.rating && (
                <p className="text-xs text-yellow-400">IMDb: {item.rating}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RowSection;
