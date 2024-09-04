import { Wallet, Camera, Lock, Share2, Search, BarChart } from "lucide-react"
// import { Button } from "@/components/ui/button"

const features = [
    {
      icon: Wallet,
      title: "Wallet Integration",
      description: "Securely connect your digital wallet to manage your NFT assets with ease."
    },
    {
      icon: Camera,
      title: "NFT Minting",
      description: "Transform your assets into unique, verifiable NFTs on the blockchain."
    },
    {
      icon: Lock,
      title: "Encrypted Storage",
      description: "Your assets are encrypted and stored securely on decentralized networks."
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: " Transfer custody of the asset as needed, with every transaction recorded on the blockchain."
    },
    {
      icon: Search,
      title: "Instant Verification",
      description: "Allow third parties to verify your assets instantly without intermediaries."
    },
    {
      icon: BarChart,
      title: "Achievement Tracking",
      description: "Monitor your Nft assets progress and showcase your growing list of achievements."
    }
  ]

const FeatureOverview = () => {
  return (
    <section id="#FEATURE" className="py-44 bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4">
        <h2 className="text-6xl font-bold text-center mb-8">Comprehensive Feature Set</h2>
        <p className="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Our platform offers a robust set of features designed to secure, manage, and share your assets achievements with ease.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 rounded-lg transition-all duration-300 hover:bg-primary/5">
              <div className="flex-shrink-0">
                <feature.icon className="h-6 w-6 text-teal-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          {/* <Button size="lg"> */}
            <button className=" border p-5 rounded-full hover:bg-primary">
                Explore All Features
            </button>
          {/* </Button> */}
        </div>
      </div>
    </section>
  )
}

export default FeatureOverview;