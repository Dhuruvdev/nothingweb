import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import LandingPage from "@/pages/LandingPage";
import StudioPage from "@/pages/StudioPage";
import AboutUs from "@/pages/AboutUs";
import Blog from "@/pages/Blog";
import Team from "@/pages/Team";
import PressKit from "@/pages/PressKit";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/studio" component={StudioPage} />
        <Route path="/about" component={AboutUs} />
        <Route path="/blog" component={Blog} />
        <Route path="/team" component={Team} />
        <Route path="/press" component={PressKit} />
      </Switch>
    </QueryClientProvider>
  );
}
