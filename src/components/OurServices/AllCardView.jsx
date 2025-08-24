import React from "react";
import dummyData from "../../dummyData";
import CardRow from "../../CardRow";

const AllCardView = () => {
  return (
    <div className="p-6 min-h-screen bg-white max-w-screen-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-blue-600">Services Card View</h2>
        <button className="bg-blue-600 text-white px-5 py-2 rounded">Save</button>
      </div>

      <div className="overflow-hidden">
        <table className="w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              {[
                "img",
                "Review Icon",
                "Location Icon",
                "Review No.",
                "Total Reviews",
                "Heading",
                "Location",
                "Button",
                "Button URL",
                "Action",
              ].map((header) => (
                <th key={header} className="border px-3 py-2 text-left font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dummyData.map((item, idx) => (
              <CardRow key={idx} data={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCardView;
