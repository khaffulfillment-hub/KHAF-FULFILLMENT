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
    <Card className="w-96"> {/* Adjust width as needed */}
      <CardHeader shadow={false} floated={false} className="h-48"> {/* Adjust height as needed */}
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover gap-2"
        />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium text-lg"> {/* Adjust text size */}
            {name}
          </Typography>
          {/* Price is not applicable here, so it's removed */}
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
