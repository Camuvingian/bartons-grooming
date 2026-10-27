import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import { SettingsMenu } from "@/components/SettingsMenu";
import Home from "@/pages/Home";
import Book from "@/pages/Book";
import Styleguide from "@/pages/Styleguide";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function ThemedToaster() {
  const { resolvedMode } = useTheme();
  return (
    <Toaster
      theme={resolvedMode}
      position="top-center"
      richColors
      toastOptions={{ style: { fontFamily: "var(--font-sans)", borderRadius: 20 } }}
    />
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <SettingsMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<Book />} />
          <Route path="/styleguide" element={<Styleguide />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <ThemedToaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}
