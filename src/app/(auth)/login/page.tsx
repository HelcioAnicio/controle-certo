"use client";

import { useActionState, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn, signUp, type AuthActionState } from "../actions";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/cn";

const initialState: AuthActionState = {};

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loginState, loginAction, loginPending] = useActionState(
    signIn,
    initialState,
  );
  const [signupState, signupAction, signupPending] = useActionState(
    signUp,
    initialState,
  );
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
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(160deg,#EFF6FF_0%,#F8FAFC_55%)] p-6">
      <div className="w-full max-w-[380px] rounded-xl bg-surface px-7 py-9 shadow-modal">
        <div className="mx-auto mb-[18px] flex h-12 w-12 items-center justify-center rounded-[14px] bg-primary">
          <div className="h-5 w-5 rounded-[6px] bg-white" />
        </div>
        <div className="mb-1 text-center text-xl font-bold">Casa em Dia</div>
        <div className="mb-7 text-center text-[13px] text-text-secondary">
          Controle financeiro doméstico
        </div>

        {oauthError && (
          <div className="mb-3.5 rounded-md bg-danger-tint px-3 py-2.5 text-[13px] text-danger">
            Não foi possível entrar com o Google. Tente novamente.
          </div>
        )}

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googlePending}
          className={cn(
            "flex w-full items-center justify-center gap-2.5 rounded-md border border-border bg-surface p-[13px] text-sm font-semibold text-text",
            googlePending && "opacity-70",
          )}
        >
          <FcGoogle size={18} />
          {googlePending ? "Redirecionando…" : "Continuar com Google"}
        </button>

        <div className="my-[18px] flex items-center gap-2.5">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-text-disabled">ou</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <form
          key={mode}
          action={isLogin ? loginAction : signupAction}
          className="flex flex-col gap-3.5"
        >
          {!isLogin && (
            <Field label="Nome">
              <input
                name="name"
                type="text"
                placeholder="Seu nome"
                required
                className={inputStyle}
              />
            </Field>
          )}
          <Field label="E-mail">
            <input
              name="email"
              type="email"
              placeholder="voce@email.com"
              required
              className={inputStyle}
            />
          </Field>
          <Field label="Senha">
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              required
              minLength={6}
              className={inputStyle}
            />
          </Field>

          {state?.error && (
            <div className="text-[13px] text-danger">{state.error}</div>
          )}
          {state?.info && (
            <div className="text-[13px] text-success">{state.info}</div>
          )}

          <button
            type="submit"
            disabled={pending}
            className={cn(
              "mt-1.5 w-full rounded-md border-none bg-primary p-3.5 text-[15px] font-semibold text-white",
              pending && "opacity-70",
            )}
          >
            {pending ? "Aguarde…" : isLogin ? "Entrar" : "Criar conta"}
          </button>

          <div className="mt-1 flex justify-between text-[13px]">
            <button
              type="button"
              onClick={() => setMode(isLogin ? "signup" : "login")}
              className="border-none bg-transparent p-0 text-primary"
            >
              {isLogin ? "Criar conta" : "Já tenho conta"}
            </button>
            {isLogin && (
              <span className="text-text-disabled">Esqueci a senha</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 text-[13px] font-semibold text-text">{label}</div>
      {children}
    </div>
  );
}

const inputStyle =
  "w-full rounded-md border border-border bg-canvas px-3.5 py-3 text-[15px] outline-none";
