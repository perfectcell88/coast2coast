import FloatingContact from "@/components/FloatingContact";
import { useLenis } from "./hooks/useLenis";
import { HelmetProvider } from "react-helmet-async";
import StructuredData from "./components/StructuredData";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/services"} component={Services} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useLenis();
  return (
    <HelmetProvider>
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Navigation />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
            <FloatingContact />
            <ScrollToTop />
          </div>
        </TooltipProvider>
      </ThemeProvider>
      <StructuredData />
    </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
