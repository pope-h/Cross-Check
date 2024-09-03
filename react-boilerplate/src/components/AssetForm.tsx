import React, { useState } from 'react';

interface AssetFormProps {
  assetType: string;
  onSubmit: (assetData: { assetType: string; assetId: string; details: Record<string, string> }) => void;
}

const AssetForm: React.FC<AssetFormProps> = ({ assetType, onSubmit }) => {
  const [assetId, setAssetId] = useState('');
  const [details, setDetails] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ assetType, assetId, details });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="assetId">Asset ID</label>
        <input
          id="assetId"
          type="text"
          value={assetId}
          onChange={(e) => setAssetId(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300"
          required
        />
      </div>
      {/* Add more fields based on asset type */}
      <button type="submit" className="mt-4">Submit {assetType}</button>
    </form>
  );
};

export default AssetForm;