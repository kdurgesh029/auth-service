import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../api/axios"
import { useAuth } from "../hooks/useAuth"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const { login, isAuthenticated, role } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [tenantId, setTenantId] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) return
    if (role === "SYSTEM_ADMIN") navigate("/system-admin/dashboard", { replace: true })
    else if (role) navigate("/tenant-admin/dashboard", { replace: true })
  }, [isAuthenticated, role, navigate])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return
    setError("")
    setIsSubmitting(true)

    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
        tenantId: tenantId ? Number(tenantId) : null,
      })

      const { token } = res.data
      const derivedRole = login(token)

      if (derivedRole === "SYSTEM_ADMIN") {
        navigate("/system-admin/dashboard", { replace: true })
      } else {
        navigate("/tenant-admin/dashboard", { replace: true })
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Login to your IAM portal
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>

            {/* Tenant ID */}
            <div className="space-y-2">
              <Label htmlFor="tenantId">
                Tenant ID <span className="text-muted-foreground">(Only for tenant users)</span>
              </Label>
              <Input
                id="tenantId"
                inputMode="numeric"
                pattern="\d*"
                placeholder="e.g. 1001"
                value={tenantId}
                onChange={(e) => setTenantId(e.target.value.replace(/[^\d]/g, ""))}
                disabled={isSubmitting}
              />
            </div>

            {/* Error Message */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Button */}
            <Button type="submit" className="w-full h-11 text-base" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
