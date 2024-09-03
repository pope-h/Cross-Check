
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import HowItWorks from "../components/HowItWorks";
import FeatureOverview from "../components/FeatureOverview";
import Modal from "../components/Modal";
import GetStarted from "../components/GetStarted";
import HeroImage from "../../public/hero-image.jpg"
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const LandingPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="text-center">
      <NavBar />
      <div className="bg-background container mb-28 pt-16 mx-auto flex items-center justify-between">
        <div className="mx-10">
          <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-12">
            <div className="space-y-6 text-start col-span-3">
              <h1 className="text-7xl font-extrabold tracking-tight lg:text-7xlt text-foreground">
                Secure Your Academic Achievements on the Blockchain
              </h1>
              <p className="text-xl text-muted-foreground">
                Transform your graduate certificates into verifiable NFTs,
                ensuring the authenticity and permanence of your academic
                accomplishments.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={openModal}
                  className="flex items-center rounded-full border border-white p-5 bg-green-500 hover:border-green-800 hover:text-green-800 hover:bg-white"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="flex items-center px-8 rounded-full hover:border-white hover:bg-green-500 hover:text-white border-green-900 p-5 bg-white text-green-800">
                  Learn more
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
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <GetStarted account={""} contract={undefined} setNotification={function (notification: { message: string; type: "error" | "success"; }): void {
          throw new Error("Function not implemented.");
        } } /> {/* Your Dashboard component */}
      </Modal>
      <Footer />
    </div>
  );
};

export default LandingPage;
