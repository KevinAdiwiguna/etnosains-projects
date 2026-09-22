// emails/verification-email.tsx
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface VerificationEmailProps {
  userName?: string;
  verificationUrl: string;
}

export const VerificationEmail = ({
  userName = "Pengguna",
  verificationUrl,
}: VerificationEmailProps) => (
  <Html lang="id">
    <Head />
    <Preview>Verifikasi Akun Etnosains LMS Anda</Preview>
    <Body style={{ backgroundColor: "#f5f1eb", fontFamily: "Arial, sans-serif" }}>
      <Container style={{ maxWidth: "620px", margin: "40px auto", backgroundColor: "#ffffff", border: "4px solid #292727" }}>
        <Section style={{ backgroundColor: "#f4c400", padding: "14px 20px", borderBottom: "4px solid #292727" }}>
          <Text style={{ margin: 0, fontWeight: 800, fontSize: "12px", textTransform: "uppercase" }}>
            ● LEMBAR KERJA INVESTIGASI
          </Text>
        </Section>
        <Section style={{ padding: "32px" }}>
          <Heading style={{ fontSize: "32px", fontWeight: 900, textTransform: "uppercase" }}>
            Verifikasi Akun Anda
          </Heading>
          <Text style={{ fontSize: "15px" }}>Halo <strong>{userName}</strong>,</Text>
          <Text style={{ fontSize: "15px" }}>
            Selamat datang di <strong>Etnosains LMS</strong>. Verifikasi email Anda untuk mulai mengakses modul fisika.
          </Text>
          <Link
            href={verificationUrl}
            style={{
              display: "block",
              backgroundColor: "#f4c400",
              border: "3px solid #292727",
              color: "#292727",
              padding: "16px",
              textAlign: "center",
              fontWeight: 900,
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            Verifikasi Email Saya →
          </Link>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default VerificationEmail;
