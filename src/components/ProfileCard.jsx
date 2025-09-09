import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Button
} from "@material-tailwind/react";
 
export function ProfileCard({ name, title, imageUrl, socialLinks }) {
  return (
    <Card className="w-96">
      <CardHeader floated={false} className="h-80">
        <img src={imageUrl} alt={`${name}'s profile`} />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {name}
        </Typography>
        <Typography color="blue-gray" className="font-medium" textGradient>
          {title}
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-center gap-4 pt-2">
        {/* Map over the socialLinks and render each icon */}
        {socialLinks.map((link, index) => (
          <a 
            key={index} 
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="transform transition-transform hover:scale-110"
          >
            <img 
              src={link.imageUrl} // Use the imported image variable here
              alt={`${link.label} icon`}
              className="w-8 h-8"
            />
          </a>
        ))}
      </CardFooter>
    </Card>
  );
}
