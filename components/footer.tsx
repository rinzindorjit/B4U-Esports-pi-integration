export function Footer() {
  return (
    <footer className="border-t bg-muted/40 mt-auto py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#14b8a6] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">π</span>
            </div>
            <span className="text-lg font-semibold text-foreground">Pi Network Store</span>
          </div>
          
          {/* Description */}
          <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
            The easiest way to shop with Pi cryptocurrency. 
            Secure, fast, and decentralized payments for the modern digital economy.
          </p>
          
          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 pt-2">
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Contact Support
            </a>
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              FAQ
            </a>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-border/50 w-32 pt-4">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Pi Network Store. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
