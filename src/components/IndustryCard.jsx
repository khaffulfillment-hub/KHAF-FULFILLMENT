import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { motion } from 'framer-motion';

function IndustryCard({ name, imageUrl, url , description }) {
  return (
    <motion.div whileHover={{ y: -10 }}>
      <Card className="w-full h-full flex flex-col bg-white/60 backdrop-blur-lg border border-white/30 shadow-xl rounded-2xl overflow-hidden">
        <CardHeader shadow={false} floated={false} className="h-52">
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody className="flex-grow text-center">
          <Typography variant="h5" color="blue-gray" className="mb-2 font-bold">
            {name}
          </Typography>
          <Typography color="gray" className="font-normal opacity-80">
            {description}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <a href={url} target="_blank" rel="noopener noreferrer">
          <Button
            ripple={false}
            fullWidth={true}
            className="bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
          >
            Learn More
          </Button>
          </a>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default IndustryCard;
