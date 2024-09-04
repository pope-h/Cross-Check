import React from "react";

const AssetDetails = ({selectedAsset}: any) => {
  return (
    <div className="grid gap-2">
      <h2 className="font-semibold text-xl mb-4">
        Asset Details - {selectedAsset.assetName}
      </h2>
      <img
        src={selectedAsset.imageUrl}
        alt={selectedAsset.assetName}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <p>
        <strong>Type:</strong> {selectedAsset.assetType}
      </p>
      <p>
        <strong>Description:</strong> {selectedAsset.description}
      </p>
      {/* Generate Access TOken  */}
      <form action="submit" className="grid grid-cols-2 gap-3 text-sm">
        <input type="text" placeholder="transfer asset" className="bg-transparent outline-none border border-green-800 p-2" />
        <input type="button" value="Generate Access Token" className="text-center rounded bg-teal-700 p-2" />
      </form>

      {/* Get Access Token  */}
      <form action="submit" className="grid grid-cols-2 gap-3 text-sm">
        <input type="button" value="Get Access Token" className="text-center rounded bg-teal-700 p-2" />
        <input type="button" value="XUr3457472230495748384854589" className="bg-transparent outline-none text-slate-400 border border-green-800 p-2" disabled/>
      </form>

      {/* Revoke Access  */}
      <form action="submit" className="grid grid-cols-3 gap-3 text-sm">
        <input type="text" placeholder="your asset details" className="bg-transparent outline-none border border-green-800 p-2 col-span-2" />
        <input type="button" value="Revoke Access" className="text-center rounded bg-teal-700 p-2" />
      </form>
    </div>
  );
};

export default AssetDetails;
