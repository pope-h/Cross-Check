import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const LandingPage: React.FC = () => (
  <div className="text-center mt-16">
    <div className="bg-background container mb-28 pt-16 mx-auto flex items-center justify-between">
      <div className="mx-10">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          <div className="space-y-6 text-start">
            <h1 className="text-6xl font-extrabold tracking-tight lg:text-7xlt text-foreground">
              Secure Your Academic Achievements on the Blockchain
            </h1>
            <p className="text-xl text-muted-foreground">
              Transform your graduate certificates into verifiable NFTs,
              ensuring the authenticity and permanence of your academic
              accomplishments.
            </p>
            <div className="flex space-x-4">
              <Link to="/dashboard">
                <button className="flex items-center rounded-full border border-white p-5 bg-black">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
              <button className="flex items-center px-8 rounded-full  hover:border border-black p-5 bg-white text-black">
                Learn more
              </button>
            </div>
          </div>
          <div className="border h-[600px]">
            {/* <Image
                src="/assets/metaverse.jpg"
                alt="Graduate with blockchain certificate"
                className="relative w-full z-10 rounded-lg shadow-xl"
                width={600}
                height={600}
              /> */}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LandingPage;
