import React, { useState } from 'react';

interface AssetFormProps {
  onSubmit: (assetData: { assetName: string; assetType: string; image: File; details: Record<string, string> }) => void;
}

const AssetForm: React.FC<AssetFormProps> = ({ onSubmit }) => {
  const [assetName, setAssetName] = useState('');
  const [assetType, setAssetType] = useState('Certificate'); // Default value
  const [details, setDetails] = useState<Record<string, string>>({ description: '' });
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (image) {
      onSubmit({ assetName, assetType, image, details });
    } else {
      alert("Please upload an image.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          id="assetName"
          type="text"
          value={assetName}
          placeholder="Asset Name"
          onChange={(e) => setAssetName(e.target.value)}
          className="mt-1 p-2 bg-teal-700 placeholder:text-teal-300 block w-full rounded-md outline-none shadow-sm"
          required
        />
      </div>

      <div>
        <select
          id="assetType"
          value={assetType}
          onChange={(e) => setAssetType(e.target.value)}
          className="mt-1 p-2 bg-teal-700 placeholder:text-teal-300 block w-full rounded-md outline-none shadow-sm"
          required
        >
          <option value="Certificate">Certificate</option>
          <option value="DigitalStamp">DigitalStamp</option>
          <option value="TradeDocument">TradeDocument</option>
          <option value="Firearm">Firearm</option>
          <option value="PetroleumBatch">PetroleumBatch</option>
        </select>
      </div>

      <div>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          className="mt-1 p-2 bg-teal-700 placeholder:text-teal-300 block w-full rounded-md outline-none shadow-sm"
          required
        />
      </div>

      <div>
        <textarea
          id="description"
          value={details.description}
          placeholder="Asset Description"
          onChange={(e) => setDetails({ ...details, description: e.target.value })}
          className="mt-1 p-2 bg-teal-700 placeholder:text-teal-300 block w-full rounded-md outline-none shadow-sm"
          required
        />
      </div>

      <button type="submit" className="mt-4 p-2 w-full border border-teal-500">
        Submit {assetType}
      </button>
    </form>
  );
};

export default AssetForm;
