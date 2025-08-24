import React from "react";

const Service = ({ data = {} }) => {
  const {
    img,
    reviewIcon,
    locationIcon,
    reviewNo,
    totalReviews,
    heading,
    location,
    button,
    buttonUrl,
  } = data;

  return (
    <tr className="border-t text-sm">
      {[img, reviewIcon, locationIcon].map((src, i) => (
        <td key={i} className="px-3 py-2">
          <img
            src=''
            alt=""
            className="w-8 h-8 rounded object-cover"
          />
        </td>
      ))}
      <td className="px-3 py-2">{reviewNo}</td>
      <td className="px-3 py-2">{totalReviews}</td>
      <td className="px-3 py-2">{heading}</td>
      <td className="px-3 py-2">{location}</td>
      <td className="px-3 py-2">{button}</td>
      <td className="px-3 py-2 text-black-500 italic">{buttonUrl}</td>
      <td className="px-3 py-2 flex items-center gap-2">
        <img
          src=''
          alt="Edit"
          className="w-4 h-4 cursor-pointer"
        />
        <img
          src=""
          alt="Delete"
          className="w-4 h-4 cursor-pointer"
        />
      </td>
    </tr>
  );
};

export default Service;
