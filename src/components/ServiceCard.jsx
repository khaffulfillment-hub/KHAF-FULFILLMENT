import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

function ServiceCard({ title, description, cta, imageUrl }) {
  return (
    <Card className="mt-6 w-96 bg-charcoal border-2 border-teal-700 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out neon-glow-card">
      <CardHeader color="blue-gray" className="relative h-56">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={`${title} icon`}
            className="h-full w-[100%] object-cover" // Changed to object-cover to fill the container and remove gaps
          />
        )}
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="green" className="mb-2 text-neon-green"> {/* Changed color to green and added neon-green class */}
          {title}
        </Typography>
        <Typography className="text-cream leading-relaxed"> {/* Added text-cream class */}
          {description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          size="sm"
          variant="text"
          className="flex items-center gap-2 text-neon-green font-semibold hover:underline" // Adjusted button styling
          color="green" // Material Tailwind button color prop
        >
          {cta} &rarr;
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ServiceCard;
