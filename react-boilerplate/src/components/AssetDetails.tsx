import React, { useState } from "react";

const AssetDetails = ({ selectedAsset }: any) => {
  const [tokenID, setTokenID] = useState<string>("");
  const [duration, setDuration] = useState<number>();
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);
  const [custodyChain, setCustodyChain] = useState<string[] | null>(null);

  const generateAccessToken = async () => {
    try {
      const response = await fetch(`http://localhost:3001/generate-access-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tokenID, duration }),
      });
      const data = await response.json();
      if (data.success) {
        setGeneratedToken(data.accessToken);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error generating access token", error);
    }
  };

  const fetchCustodyChain = async () => {
    try {
      const response = await fetch(`http://localhost:3001/get-custody-chain?tokenID=${tokenID}`);
      const data = await response.json();
      if (data.success) {
        setCustodyChain(data.custodyChain);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error fetching custody chain", error);
    }
  };

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
      <hr />
      
      {/* Generate Access Token */}
      <h1 className="text-center">Generate Access Token</h1>
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          generateAccessToken();
        }} 
        className="grid grid-cols-3 gap-3 text-sm"
      >
        <input
          type="text"
          value={tokenID}
          onChange={(e) => setTokenID(e.target.value)}
          placeholder="Token ID"
          className="bg-transparent outline-none border border-teal-800 p-2"
          required
        />
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          placeholder="Duration (in secs)"
          className="bg-transparent outline-none border border-teal-800 p-2"
          required
        />
        <button 
          type="submit"
          className="text-center rounded bg-teal-700 p-2"
        >
          Generate
        </button>
      </form>
      
      {generatedToken && (
        <div className="text-center mt-4">
          <p><strong>Generated Token:</strong></p>
          <p className="text-sm text-slate-400">{generatedToken}</p>
        </div>
      )}
      
      <hr />
      
      {/* Get Access Token */}
      <h1 className="text-center">Get Access Token</h1>
      <form action="submit" className="grid grid-cols-2 gap-3 text-sm">
        <input type="button" value="Get Access Token" className="text-center rounded bg-teal-700 p-2" />
        <input type="text" value="XUr3457472230495748384854589" className="bg-transparent outline-none text-slate-400 border border-teal-800 p-2" disabled/>
      </form>
      
      <hr />
      
      {/* Revoke Access */}
      <h1 className="text-center">Revoke Access</h1>
      <form action="submit" className="grid grid-cols-3 gap-3 text-sm">
        <input type="text" placeholder="Input Token ID" className="bg-transparent outline-none border border-teal-800 p-2 col-span-2" />
        <input type="button" value="Revoke Access" className="text-center rounded bg-teal-700 p-2" />
      </form>
      
      <hr />

      {/* Get Custody Chain */}
      <h1 className="text-center">Get Custody Chain</h1>
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          fetchCustodyChain();
        }} 
        className="grid grid-cols-2 gap-3 text-sm"
      >
        <input
          type="text"
          value={tokenID}
          onChange={(e) => setTokenID(e.target.value)}
          placeholder="Token ID"
          className="bg-transparent outline-none border border-teal-800 p-2 col-span-1"
          required
        />
        <button 
          type="submit"
          className="text-center rounded bg-teal-700 p-2 col-span-1"
        >
          Get Custody Chain
        </button>
      </form>
      
      {custodyChain && custodyChain.length > 0 && (
        <div className="text-center mt-4">
          <h2 className="font-semibold">Custody Chain:</h2>
          <ul className="list-disc list-inside text-left">
            {custodyChain.map((address, index) => (
              <li key={index} className="text-sm text-slate-400">{address}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AssetDetails;
