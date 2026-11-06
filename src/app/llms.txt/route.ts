import { ALL_FAQS, AnswerText } from "@/Data/Faqs";
import { INDUSTRIES } from "@/Data/Industries";
import { PRODUCTS } from "@/Data/Products";
import { PROJECTS } from "@/Data/Projects";
import { SERVICES, TECH_EXPERTISE } from "@/Data/Services";
import { GetAllArticleMetas } from "@/Lib/Blog";
import { SITE_NAME, SITE_URL, SeoCopy } from "@/Lib/Seo";
import { CONTACT } from "@/Lib/Site";

export const dynamic = "force-static";

function Section(Title: string, Lines: string[]): string {
  return [`## ${Title}`, "", ...Lines, ""].join("\n");
}

export function GET() {
  const Body = [
    `# ${SITE_NAME}`,
    "",
    `> ${SeoCopy("en").SiteDescription}`,
    "",
    "Future Solutions Dev is a software agency founded in 2024 and based in Cairo, Egypt. It serves businesses across the Arab world (Egypt, Saudi Arabia, the Gulf) and worldwide, in Arabic and English. Clients own 100% of the code, receive a fixed quote before work starts and see a working link every week.",
    "",
    `Contact: ${CONTACT.Email} · +${CONTACT.Phone} · ${CONTACT.WhatsApp}`,
    "",
    Section(
      "Services",
      SERVICES.map((Service) => `- [${Service.Title.en}](${SITE_URL}/en/services#${Service.Id}): ${Service.Description.en}`),
    ),
    `Core technologies: ${TECH_EXPERTISE.join(", ")}.`,
    "",
    Section(
      "Industries",
      INDUSTRIES.map((Industry) => `- [${Industry.Title.en}](${SITE_URL}/en/blog/${Industry.Slug}): ${Industry.Content.en}`),
    ),
    Section(
      "Client projects",
      PROJECTS.map(
        (Project) =>
          `- [${Project.Title}](${SITE_URL}/en/portfolio/${Project.Slug}): ${Project.Category.en}. ${Project.Result?.en ?? Project.Summary.en}`,
      ),
    ),
    Section(
      "Products",
      PRODUCTS.map(
        (Product) =>
          `- [${Product.Name}](${SITE_URL}/en/products/${Product.Slug}) (${Product.Status.replace("-", " ")}): ${Product.Tagline.en}`,
      ),
    ),
    Section(
      "Frequently asked questions",
      ALL_FAQS.map((Faq) => `- **${Faq.Question.en}** ${AnswerText(Faq.Answer.en)}`),
    ),
    Section(
      "Articles",
      GetAllArticleMetas("en").map((Meta) => `- [${Meta.title}](${SITE_URL}/en/blog/${Meta.slug}): ${Meta.excerpt}`),
    ),
    Section("Arabic version", [
      `- [Home](${SITE_URL}/ar)`,
      `- [Services](${SITE_URL}/ar/services)`,
      `- [Our work](${SITE_URL}/ar/portfolio)`,
      `- [FAQ](${SITE_URL}/ar/faq)`,
      `- [Blog](${SITE_URL}/ar/blog)`,
    ]),
  ].join("\n");

  return new Response(Body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
