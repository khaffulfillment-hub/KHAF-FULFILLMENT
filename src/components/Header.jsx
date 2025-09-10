import React, { useState, useEffect } from "react";
import Logo from "../assets/new-logo.png";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import { MenuIcon, XIcon } from "lucide-react";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Define navigation items for easier mapping
const navItems = ["home", "about", "services", "industries", "contact", "pricing"];

function Header({ onOpenPopup }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Effect to handle scroll-based styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Effect to disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenuAndAction = (action) => {
    toggleMobileMenu();
    if (action) action();
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-green-50/80 shadow-md backdrop-blur-lg border-b border-green-200"
            : "bg-green-100/50"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Title */}
            <div className="flex-shrink-0 flex items-center">
              <img src={Logo} alt="KHAF FULFILLMENT Logo" className="h-14 w-auto mr-3 hover:scale-105 transition-transform" />
              <div className="hover:scale-105 transition-transform">
                <span className="block text-2xl font-bold text-lime-400">KHAF FULFILLMENT</span>
                <span className="block text-xs text-lime-300">Fast. Flexible. Future-Ready.</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav 
              className="hidden lg:flex items-center gap-2"
              onMouseLeave={() => setHoveredItem(null)}
            >
              <NavigationMenu>
                <NavigationMenuList className="flex items-center gap-1 relative">
                  {navItems.map((item) => (
                    <NavigationMenuItem 
                      key={item}
                      onMouseEnter={() => setHoveredItem(item)}
                      className="relative"
                    >
                      <NavigationMenuLink
                        href={`#${item}`}
                        className="px-4 py-2 text-foreground hover:text-white relative z-10 transition-colors duration-300"
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

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button variant="outline" className="px-6 py-3 bg-[hsl(var(--background))] text-[hsl(var(--primary))] rounded-lg text-base font-semibold border border-[hsl(var(--primary))] shadow transition-all hover:bg-[hsl(var(--muted))]">
                Track Shipment
              </Button>
              <Button
                onClick={onOpenPopup}
                className="
              px-6 py-3 font-semibold rounded-lg
              bg-gradient-to-r from-green-300 to-green-500 text-white
              transition-all duration-300 ease-in-out
              hover:bg-gradient-to-r hover:from-green-300 hover:to-green-500 hover:text-white
              hover:scale-105 hover:shadow-lg"
              >
                Get a Quote
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="text-foreground focus:outline-none"
                aria-label="Open mobile menu"
              >
                <MenuIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-green-50 shadow-lg p-8"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-bold text-foreground">Menu</span>
                <button
                  onClick={toggleMobileMenu}
                  className="text-foreground focus:outline-none"
                  aria-label="Close mobile menu"
                >
                  <XIcon className="h-6 w-6" />
                </button>
              </div>

              <motion.nav
                initial="closed"
                animate="open"
                variants={{
                  open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
                  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                }}
              >
                <ul className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <motion.li
                      key={item}
                      variants={{
                        open: { y: 0, opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 } } },
                        closed: { y: 50, opacity: 0, transition: { y: { stiffness: 1000 } } }
                      }}
                    >
                      <a
                        href={`#${item}`}
                        onClick={toggleMobileMenu}
                        className="block py-3 text-2xl font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.nav>

              <div className="mt-12 pt-8 border-t border-green-200 flex flex-col space-y-4">
                <Button variant="outline" className="px-6 py-3 bg-[hsl(var(--background))] text-[hsl(var(--primary))] rounded-lg text-base font-semibold border border-[hsl(var(--primary))] shadow transition-all hover:bg-[hsl(var(--muted))]">
                  Track Shipment
                </Button>
                <Button
                  onClick={() => closeMenuAndAction(onOpenPopup)}
                  className="
                  px-6 py-3 font-semibold rounded-lg
                  bg-gradient-to-r from-green-300 to-green-500 text-white
                  transition-all duration-300 ease-in-out
                  hover:bg-gradient-to-r hover:from-green-300 hover:to-green-500 hover:text-white
                  hover:scale-105 hover:shadow-lg"
                >
                  Get a Quote
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
