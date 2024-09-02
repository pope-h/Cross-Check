import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const LandingPage: React.FC = () => (
  <div className="text-center mt-16">
    <h1 className="text-4xl font-bold">Welcome to AlphaVerify</h1>
    <p className="mt-4 text-lg">Secure and verify your assets with blockchain technology</p>
    <Link to="/dashboard">
      <Button className="mt-8">Get Started</Button>
    </Link>
  </div>
);

export default LandingPage;