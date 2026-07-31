"use client";

import { useActionState, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn, signUp, type AuthActionState } from "../actions";
import { createClient } from "@/lib/supabase/client";

const initialState: AuthActionState = {};

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loginState, loginAction, loginPending] = useActionState(signIn, initialState);
  const [signupState, signupAction, signupPending] = useActionState(signUp, initialState);
  const [googlePending, setGooglePending] = useState(false);
  const [oauthError, setOauthError] = useState(false);

  useEffect(() => {
    // One-time read of a client-only value (the redirect query string) to
    // decide whether to show the OAuth error banner; SSR has no `window`,
    // so this can't be a lazy initializer without a hydration mismatch.
    const params = new URLSearchParams(window.location.search);
    if (params.get("error") === "oauth") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOauthError(true);
    }
  }, []);

  const isLogin = mode === "login";
  const state = isLogin ? loginState : signupState;
  const pending = isLogin ? loginPending : signupPending;

  async function handleGoogleSignIn() {
    setGooglePending(true);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error || !data.url) {
      setGooglePending(false);
      return;
    }
    window.location.href = data.url;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(160deg, #EFF6FF 0%, #F8FAFC 55%)",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 380,
          background: "var(--surface)",
          borderRadius: "var(--radius-xl)",
          padding: "36px 28px",
          boxShadow: "var(--shadow-modal)",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: "var(--color-primary)",
            margin: "0 auto 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: 20, height: 20, borderRadius: 6, background: "#fff" }} />
        </div>
        <div style={{ textAlign: "center", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>
          Casa em Dia
        </div>
        <div
          style={{
            textAlign: "center",
            fontSize: 13,
            color: "var(--text-secondary)",
            marginBottom: 28,
          }}
        >
          Controle financeiro doméstico
        </div>

        {oauthError && (
          <div
            style={{
              fontSize: 13,
              color: "var(--color-danger)",
              background: "var(--color-danger-tint)",
              borderRadius: "var(--radius-md)",
              padding: "10px 12px",
              marginBottom: 14,
            }}
          >
            Não foi possível entrar com o Google. Tente novamente.
          </div>
        )}

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googlePending}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            padding: 13,
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            background: "var(--surface)",
            color: "var(--text)",
            fontSize: 14,
            fontWeight: 600,
            opacity: googlePending ? 0.7 : 1,
          }}
        >
          <FcGoogle size={18} />
          {googlePending ? "Redirecionando…" : "Continuar com Google"}
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "18px 0" }}>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          <span style={{ fontSize: 12, color: "var(--text-disabled)" }}>ou</span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>

        <form
          key={mode}
          action={isLogin ? loginAction : signupAction}
          style={{ display: "flex", flexDirection: "column", gap: 14 }}
        >
          {!isLogin && (
            <Field label="Nome">
              <input name="name" type="text" placeholder="Seu nome" required style={inputStyle} />
            </Field>
          )}
          <Field label="E-mail">
            <input name="email" type="email" placeholder="voce@email.com" required style={inputStyle} />
          </Field>
          <Field label="Senha">
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              required
              minLength={6}
              style={inputStyle}
            />
          </Field>

          {state?.error && (
            <div style={{ fontSize: 13, color: "var(--color-danger)" }}>{state.error}</div>
          )}
          {state?.info && (
            <div style={{ fontSize: 13, color: "var(--color-success)" }}>{state.info}</div>
          )}

          <button
            type="submit"
            disabled={pending}
            style={{
              marginTop: 6,
              width: "100%",
              padding: 14,
              border: "none",
              borderRadius: "var(--radius-md)",
              background: "var(--color-primary)",
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
              opacity: pending ? 0.7 : 1,
            }}
          >
            {pending ? "Aguarde…" : isLogin ? "Entrar" : "Criar conta"}
          </button>

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginTop: 4 }}>
            <button
              type="button"
              onClick={() => setMode(isLogin ? "signup" : "login")}
              style={{ border: "none", background: "none", color: "var(--color-primary)", padding: 0 }}
            >
              {isLogin ? "Criar conta" : "Já tenho conta"}
            </button>
            {isLogin && (
              <span style={{ color: "var(--text-disabled)" }}>Esqueci a senha</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 6 }}>{label}</div>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "var(--radius-md)",
  border: "1px solid var(--border)",
  fontSize: 15,
  background: "var(--bg)",
  outline: "none",
};
