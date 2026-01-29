import { AuthProvider } from "./auth/AuthContext";
import Router from "./router/router";

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
