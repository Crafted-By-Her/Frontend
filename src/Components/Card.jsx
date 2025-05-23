import React from 'react'

const Card = ({ icon, label, value, bgColor, textColor }) => {
  return (
    <div className="bg-white rounded-lg shadow px-4 py-3 flex items-center gap-3 mb-8 w-72">
    <div className={`rounded-full p-2 ${bgColor}`}>{icon}</div>
    <div>
      <div className={`text-lg font-medium ${textColor}`}>{label}</div>
      <div className="text-xl text-center font-semibold text-gray-800">
        {value}
      </div>
    </div>
  </div>
  )
}

export default Card