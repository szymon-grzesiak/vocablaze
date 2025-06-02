import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `https://www.hgfhkmfgklmdslkr665464fdsf.space/auth/new-password?token=${token}`;
  await resend.emails.send({
    from: "noreply@hgfhkmfgklmdslkr665464fdsf.space",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `https://www.hgfhkmfgklmdslkr665464fdsf.space/auth/new-verification?token=${token}`;
  await resend.emails.send({
    from: "noreply@hgfhkmfgklmdslkr665464fdsf.space",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email</p>`,
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "noreply@hgfhkmfgklmdslkr665464fdsf.space",
    to: email,
    subject: "[🔐Auth]: Please verify Login Attempt.",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};
