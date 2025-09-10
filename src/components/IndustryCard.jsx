import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

function IndustryCard({ name, imageUrl }) {
  return (
    // Added transition for smooth scaling effect from the slider
    <Card className="w-full"> 
      <CardHeader shadow={false} floated={false} className="h-48">
        <img
          src={imageUrl}
          alt={name}
          // The 'gap-2' class has no effect on an img tag, so it was removed
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium text-lg">
            {name}
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          Learn more about our solutions for {name}.
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          ripple={false}
          fullWidth={true}
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          Learn more
        </Button>
      </CardFooter>
    </Card>
  );
}

export default IndustryCard;
