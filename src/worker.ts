interface EmailAddress {
  email: string;
  name?: string;
}

interface EmailBinding {
  send(message: {
    to: string | EmailAddress;
    from: EmailAddress;
    replyTo?: EmailAddress;
    subject: string;
    text: string;
    html?: string;
  }): Promise<unknown>;
}

interface Env {
  ASSETS: Fetcher;
  EMAIL: EmailBinding;
}

const CONTACT_TO = "prescottprue@gmail.com";
const CONTACT_FROM: EmailAddress = { email: "contact@prue.io", name: "prue.io contact form" };

const MAX = { name: 200, email: 320, message: 5000 };
const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(form: FormData, key: string): string {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function respond(request: Request, ok: boolean, error?: string): Response {
  const wantsJson = request.headers.get("Accept")?.includes("application/json");
  if (wantsJson) {
    return Response.json(ok ? { ok: true } : { ok: false, error }, { status: ok ? 200 : 400 });
  }
  if (ok) {
    return new Response(null, { status: 303, headers: { Location: "/thanks.html" } });
  }
  return new Response(
    `<!doctype html><meta charset="utf-8"><title>Message not sent</title>
<p>${error} You can email <a href="mailto:${CONTACT_TO}">${CONTACT_TO}</a> instead.</p>
<p><a href="/">Back</a></p>`,
    { status: 400, headers: { "Content-Type": "text/html;charset=utf-8" } },
  );
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return respond(request, false, "That submission wasn't a valid form.");
  }

  // Honeypot filled in — a bot. Pretend it worked.
  if (field(form, "company") !== "") {
    return respond(request, true);
  }

  const name = field(form, "name");
  const email = field(form, "email");
  const message = field(form, "message");

  if (!name || !email || !message) {
    return respond(request, false, "Please fill in your name, email, and a message.");
  }
  if (
    name.length > MAX.name ||
    email.length > MAX.email ||
    message.length > MAX.message ||
    !EMAIL_SHAPE.test(email)
  ) {
    return respond(request, false, "Please double-check the form fields.");
  }

  try {
    await env.EMAIL.send({
      to: CONTACT_TO,
      from: CONTACT_FROM,
      replyTo: { email, name },
      subject: `prue.io contact from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
  } catch (err) {
    console.error("Email send failed:", err);
    return respond(request, false, "Sending failed on my end.");
  }

  return respond(request, true);
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/contact") {
      if (request.method !== "POST") {
        return new Response("Method not allowed", { status: 405, headers: { Allow: "POST" } });
      }
      return handleContact(request, env);
    }
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
