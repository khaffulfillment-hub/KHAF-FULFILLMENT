import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

function ServiceCard({ title, description, cta, imageUrl, url }) {
  return (
    <Card className="mt-6 hover:shadow-xl hover:scale-105 transition duration-300 ease-in-out neon-glow-card">
      <CardHeader color="blue-gray" className="relative h-56">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={`${title} icon`}
            className="h-full w-full object-cover"
          />
        )}
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="green" className="mb-2 text-neon-green">
          {title}
        </Typography>
        <Typography className="text-cream leading-relaxed">
          {description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <a href={url} target="_blank" rel="noopener noreferrer">
          <Button
            size="sm"
            variant="text"
            className="flex items-center gap-2 text-neon-green font-semibold hover:underline"
          >
            {cta} &rarr;
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}

export default ServiceCard;
