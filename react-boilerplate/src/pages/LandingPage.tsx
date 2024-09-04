import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import HowItWorks from "../components/HowItWorks";
import FeatureOverview from "../components/FeatureOverview";
import Modal from "../components/Modal";
import GetStarted from "../components/GetStarted";
import HeroImage from "../../public/hero-image.jpg";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import AssetForm from "../components/AssetForm";

const LandingPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  function handleAssetSubmit(assetData: { assetName: string; assetType: string; image: File; }): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="text-center">
      <div className="bg-background container mb-28 pt-16 mx-auto flex items-center justify-between">
        <div className="mx-10">
          <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-12">
            <div className="space-y-6 text-start col-span-3">
              <h1 className="text-6xl font-extrabold tracking-tight lg:text-7xlt text-foreground">
              Authenticate and Trace Asset Ownership with Blockchain Technology
              </h1>
              <p className="text-xl text-muted-foreground">
              Building trust and transparency across industries through immutable digital verification.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={openModal}
                  className="flex items-center rounded-full border border-white p-5 bg-green-500 hover:border-green-800 hover:text-green-800 hover:bg-white"
                >
                  Create Asset
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="flex items-center px-8 rounded-full hover:border-white hover:bg-green-500 hover:text-white border-green-900 p-5 bg-white text-green-800">
                  <Link to={"/dashboard"}>Verify Asset</Link>
                </button>
              </div>
            </div>
            <div className="col-span-2">
              <img
                src={HeroImage}
                alt="Graduate with blockchain certificate"
                className="relative w-full z-10 rounded-lg shadow-xl"
                width={600}
                height={600}
              />
            </div>
          </div>
        </div>
      </div>
      <HowItWorks />
      <FeatureOverview />

      {/* Modal Implementation */}
        {/* Modal Implementation */}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="font-semibold text-xl mb-4">Create New Asset</h2>
        <AssetForm onSubmit={handleAssetSubmit} />
      </Modal>
      <Footer />
    </div>
  );
};

export default LandingPage;
