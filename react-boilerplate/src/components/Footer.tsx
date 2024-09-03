import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { Link } from "react-router-dom"
// import Link from "next/link"

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/druxamb" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/druxamb" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/druxamb" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/druxamb" },
]

const contactInfo = [
  { icon: Mail, content: "contact@certifynft.com" },
  { icon: Phone, content: "+1 (555) 123-4567" },
  { icon: MapPin, content: "123 Blockchain Ave, Crypto City, CC 12345" },
]

export default function Footer() {
  return (
    <footer className="mt-44 text-primary-foreground bg-teal-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-start">
          <div>
            <h2 className="text-2xl font-bold mb-4">crossCheck</h2>
            <p className="mb-4">Securing academic achievements on the blockchain, one certificate at a time.</p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-secondary transition-colors"
                  aria-label={`Follow us on ${link.name}`}
                >
                  <link.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <nav>
              <ul className="space-y-2">
                <li><Link to="#" className="hover:text-secondary transition-colors">Home</Link></li>
                <li><Link to="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
                <li><Link to="/features" className="hover:text-secondary transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-secondary transition-colors">Pricing</Link></li>
                <li><Link to="/contact" className="hover:text-secondary transition-colors">Contact</Link></li>
              </ul>
            </nav>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-center">
                  <info.icon className="h-5 w-5 mr-2" />
                  <span>{info.content}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-foreground/10 text-center">
          <p>&copy; {new Date().getFullYear()} crossCheck. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}