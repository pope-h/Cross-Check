// src/components/AssetForm.tsx

import React, { useState } from 'react';

interface AssetFormProps {
  onSubmit: (assetData: { assetName: string; assetType: string; image: File }) => void;
}

const AssetForm: React.FC<AssetFormProps> = ({ onSubmit }) => {
  const [assetName, setAssetName] = useState<string>('');
  const [assetType, setAssetType] = useState<string>('Certificate');
  const [image, setImage] = useState<File | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (image) {
      onSubmit({ assetName, assetType, image });
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-200">Asset Name</label>
        <input
          type="text"
          value={assetName}
          onChange={(e) => setAssetName(e.target.value)}
          required
          className="w-full p-2 text-gray-900 bg-gray-200 rounded"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-200">Asset Type</label>
        <select
          value={assetType}
          onChange={(e) => setAssetType(e.target.value)}
          required
          className="w-full p-2 text-gray-900 bg-gray-200 rounded"
        >
          <option value="Certificate">Certificate</option>
          <option value="DigitalStamp">DigitalStamp</option>
          <option value="TradeDocument">TradeDocument</option>
          <option value="Firearm">Firearm</option>
          <option value="PetroleumBatch">PetroleumBatch</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-200">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          required
          className="w-full p-2 text-gray-900 bg-gray-200 rounded"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 mt-4 rounded bg-teal-600 text-white"
      >
        Submit Asset
      </button>
    </form>
  );
};

export default AssetForm;
