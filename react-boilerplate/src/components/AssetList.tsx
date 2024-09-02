import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';

interface AssetListProps {
  assets: Array<{ assetType: string; assetId: string; approvalStatus?: boolean }>;
  onMint: (asset: { assetType: string; assetId: string }) => void;
}

const AssetList: React.FC<AssetListProps> = ({ assets, onMint }) => {
  return (
    <div>
      {assets.map((asset, index) => (
        <Card key={index}>
          <CardHeader title={`${asset.assetType} ID: ${asset.assetId}`} />
          <CardContent>
            {asset.assetType === 'Certificate' && (
              <p>Status: {asset.approvalStatus ? 'Approved' : 'Pending'}</p>
            )}
            {(asset.assetType !== 'Certificate' || asset.approvalStatus) && (
              <Button onClick={() => onMint(asset)} className="mt-2">
                Mint NFT
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AssetList;