// src/components/Pricing.jsx
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  List,
  ListItem,
  Button,
  ListItemPrefix,
} from "@material-tailwind/react";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
// Import all three forms and the Modal component
import Modal from './Modal';
import GetAQuoteForm from './GetAQuoteForm';

const tiers = [
  {
    scale: "SMALL SCALE (100-500 UNITS)",
    price: "$0.75",
    features: ["Receiving & Inspection", "FNSKU Labeling", "Box Label", "Forwarding"],
  },
  {
    scale: "MEDIUM SCALE (500-1000 UNITS)",
    price: "$0.65",
    features: ["Receiving & Inspection", "FNSKU Labeling", "Box Label", "Forwarding"],
  },
  {
    scale: "LARGE SCALE (ABOVE 1000 UNITS)",
    price: "$0.60",
    features: ["Receiving & Inspection", "FNSKU Labeling", "Box Label", "Forwarding"],
  },
];

const fbm = {
  scale: "KHAF FULFILLMENT BY MERCHANT (FBM)",
  price: "$2.25",
  features: ["Receiving & Inspection", "Labeling", "Box Label", "Forwarding"],
};

export default function Pricing() {
  const [activeModal, setActiveModal] = useState(null); // State to manage which modal is open: 'quote', 'partner', 'track', or null

  return (
    <section id="pricing" className="bg-green-50 py-16 px-6 md:px-12 pt-24">
      <Typography variant="h2" className="text-center font-bold mb-6 text-green-900">
        Our Competitive Pricing
      </Typography>

      <Typography variant="h4" className="text-center font-bold mb-12 text-green-800">
        KHAF FULFILLMENT BY AMAZON
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto mb-16 justify-items-center">
        {tiers.map((tier) => (
          <Card
            key={tier.scale}
            shadow={true}
            color="white"
            className="w-full rounded-3xl bg-white hover:scale-105 transition-transform duration-300 ease-in-out shadow-md hover:shadow-lg hover:shadow-green-400/40 cursor-pointer"
          >
            <CardHeader
              variant="gradient"
              color="green"
              className="rounded-3xl pt-6 pb-10 text-center bg-gradient-to-r from-green-150 to-green-200 text-white"
            >
              <Typography variant="h6" className="font-extrabold text-green-800">
                {tier.scale}
              </Typography>
            </CardHeader>
            <CardBody className="text-center">
              <Typography variant="h2" color="green" className="font-bold mb-6 text-green-700">
                {tier.price}
              </Typography>
              <List>
                {tier.features.map((feature) => (
                  <ListItem key={feature} className="flex items-center gap-3 px-0 py-2">
                    <ListItemPrefix>
                      <CheckIcon className="w-5 h-5 text-green-500" />
                    </ListItemPrefix>
                    <Typography className="text-green-800">{feature}</Typography>
                  </ListItem>
                ))}
              </List>
            </CardBody>
            <CardFooter className="pt-0 text-center">
              <Button
                variant="gradient"
                onClick={() => setActiveModal('quote')} // Call toggleForm when button is clicked
                className="
                px-6 py-3 font-semibold rounded-full
                bg-gradient-to-r from-green-300 to-green-500 text-white
                transition-all duration-300 ease-in-out
                hover:bg-gradient-to-r hover:from-green-300 hover:to-green-500 hover:text-white
                hover:scale-105 hover:shadow-lg"
              >
                Choose Plan
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Typography variant="h4" className="text-center font-bold mb-8 text-green-800">
        KHAF FULFILLMENT BY MERCHANT (EBM)
      </Typography>

      <div className="flex justify-center">
        <Card
          shadow={true}
          color="white"
          className="bg-white w-full max-w-md rounded-3xl text-green-900 hover:scale-105 transition-transform duration-300 ease-in-out shadow-md hover:shadow-lg hover:shadow-green-400/40 cursor-pointer"
        >
          <CardHeader
            variant="gradient"
            color="green"
            className="rounded-3xl pt-6 pb-10 text-center bg-gradient-to-r from-green-150 to-green-200 text-white"
          >
            <Typography variant="h6" className="font-extrabold text-green-800">
              {fbm.scale}
            </Typography>
          </CardHeader>
          <CardBody className="text-center">
            <Typography variant="h2" color="green" className="font-bold mb-6 text-green-700">
              {fbm.price}
            </Typography>
            <List>
              {fbm.features.map((feature) => (
                <ListItem key={feature} className="flex items-center gap-3 px-0 py-2">
                  <ListItemPrefix>
                    <CheckIcon className="w-5 h-5 text-green-500" />
                  </ListItemPrefix>
                  <Typography className="text-green-800">{feature}</Typography>
                </ListItem>
              ))}
            </List>
          </CardBody>
          <CardFooter className="pt-0 text-center">
            <Button
              onClick={() => setActiveModal('quote')}
              className="
              px-6 py-3 font-semibold rounded-full
              bg-gradient-to-r from-green-300 to-green-500 text-white
              transition-all duration-300 ease-in-out
              hover:bg-gradient-to-r hover:from-green-300 hover:to-green-500 hover:text-white
              hover:scale-105 hover:shadow-lg"
            >
              Choose Plan
            </Button>
          </CardFooter>
        </Card>
      </div>
      {/* Modal for "Get a Quote" */}
      <Modal isOpen={activeModal === 'quote'} onClose={() => setActiveModal(null)}>
        <GetAQuoteForm />
      </Modal>
    </section>
    
  );
}
