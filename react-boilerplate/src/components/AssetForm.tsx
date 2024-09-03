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
    <form onSubmit={handleSubmit} className=''>
      <div className=''>
        {/* <label htmlFor="assetId">Asset ID</label> */}
        <input
          id="assetId"
          type="text"
          value={assetId}
          placeholder='Asset ID'
          onChange={(e) => setAssetId(e.target.value)}
          className="mt-1 p-2 bg-green-700 placeholder:text-green-300 block w-full rounded-md outline-none shadow-sm"
          required
        />
      </div>
      {/* Add more fields based on asset type */}
      <button type="submit" className="mt-4 p-2 w-full border border-green-500">Submit {assetType}</button>
    </form>
  );
};

export default AssetForm;