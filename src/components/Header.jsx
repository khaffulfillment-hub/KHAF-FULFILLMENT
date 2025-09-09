import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.png";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import { MenuIcon, XIcon } from "lucide-react";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";

// Define navigation items for easier mapping
const navItems = ["home", "about", "services", "industries", "contact", "pricing"];

function Header({ onOpenPopup }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 w-full z-50 py-4 px-8 flex justify-between items-center transition-all duration-300",
        isScrolled
          ? "bg-green-50 shadow-md backdrop-blur-md border-b border-green-200"
          : "bg-green-100"
      )}
    >
      <div className="flex items-center justify-between w-full">
        {/* Logo and Title */}
        <div className="flex items-center">
          <img src={Logo} alt="Edison 3PL Logo" className="h-15 w-auto mr-4 hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-lg" />
          <div className="p-0 text-lime-400 hover:scale-105 transition-transform duration-300 ease-in-out hover:text-lime-600">
            <span className="block text-3xl font-bold text-foreground">
              EDISON 3PL
            </span>
            <div className="mt-[0px] text-base text-muted-foreground">
              Fast. Flexible. Future-Ready.
            </div>
          </div>
        </div>

        {/* Desktop Navigation with Animation */}
        <nav 
          className="hidden md:flex items-center ml-[200px] gap-4"
          onMouseLeave={() => setHoveredItem(null)}
        >
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-4 relative">
              {navItems.map((item) => (
                <NavigationMenuItem 
                  key={item}
                  onMouseEnter={() => setHoveredItem(item)}
                  className="relative px-3 py-2 cursor-pointer"
                >
                  <NavigationMenuLink
                    href={`#${item}`}
                    className="text-foreground hover:text-white relative z-10"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </NavigationMenuLink>

                  {hoveredItem === item && (
                    <motion.div
                      layoutId="hoverBackground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-md z-0"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* --- Updated CTA Buttons (Desktop) --- */}
        <div className="hidden md:flex space-x-4 items-center">
          <Button
            variant="outline"
            className="
              px-6 py-3 bg-[hsl(var(--background))] text-[hsl(var(--primary))] rounded-lg text-base font-semibold border border-[hsl(var(--primary))] shadow transition-all hover:bg-[hsl(var(--muted))]
            "
          >
            Track Shipment
          </Button>
          <Button
            onClick={onOpenPopup}
            className="
              px-6 py-3 font-semibold rounded-lg
              bg-gradient-to-r from-green-300 to-green-500 text-green-800
              transition-all duration-300 ease-in-out
              hover:bg-gradient-to-r hover:from-green-300 hover:to-green-500 hover:text-white
              hover:scale-105 hover:shadow-lg
            "
          >
            Get a Quote
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-foreground focus:outline-none"
          >
            {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

        {/* Mobile Menu Content */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-green-50 shadow-md py-4 px-8">
            <nav className="flex flex-col space-y-4">
              <NavigationMenu> {/* Added NavigationMenu wrapper */}
                <NavigationMenuList className="flex flex-col items-start gap-4">
                  {navItems.map((item) => (
                      <NavigationMenuItem key={item}>
                        <NavigationMenuLink
                          href={`#${item}`}
                          className="text-foreground hover:text-primary"
                          onClick={toggleMobileMenu}
                        >
                          {item.charAt(0).toUpperCase() + item.slice(1)}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )
                  )}
                </NavigationMenuList>
              </NavigationMenu> {/* Closing NavigationMenu wrapper */}
            </nav>
            {/* --- Updated CTA Buttons (Mobile) --- */}
            <div className="flex flex-col space-y-4 mt-4">
              <Button
                variant="outline"
                className="
                  px-6 py-3 font-semibold rounded-lg
                  bg-green-200 text-green-800 border-green-200
                  transition-all duration-300 ease-in-out
                  hover:bg-gradient-to-r hover:from-green-300 hover:to-green-500 hover:text-white
                  hover:scale-105 hover:shadow-lg hover:border-transparent
                "
              >
                Track Shipment
              </Button>
              <Button
                onClick={() => {
                  onOpenPopup();
                  toggleMobileMenu();
                }}
                className="
                  px-6 py-3 font-semibold rounded-lg
                  bg-green-200 text-green-800
                  transition-all duration-300 ease-in-out
                  hover:bg-gradient-to-r hover:from-green-300 hover:to-green-500 hover:text-white
                  hover:scale-105 hover:shadow-lg
                "
              >
                Get a Quote
              </Button>
            </div>
          </div>
        )}
      </header>
    );
  }

  export default Header;
