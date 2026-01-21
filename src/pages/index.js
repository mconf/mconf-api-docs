import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { useColorMode } from "@docusaurus/theme-common";

import Heading from "@theme/Heading";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const { colorMode } = useColorMode();

  // Get custom fields for logo paths
  const heroLogoPath =
    siteConfig.customFields?.heroLogoPath || "img/favicon.svg";
  const heroDarkLogoPath =
    siteConfig.customFields?.heroDarkLogoPath || "img/favicon.svg";
  const designVariant = siteConfig.customFields?.designVariant || "default";

  const currentLogo = colorMode === "dark" ? heroDarkLogoPath : heroLogoPath;

  const logoAlt =
    designVariant === "confweb" ? "ConferênciaWeb API" : "Elos API";
  const subtitleText =
    designVariant === "confweb"
      ? "Documentation for ConferênciaWeb API integration"
      : "Documentation for Elos API integration";

  const guideLink =
    designVariant === "confweb" ? "/pages/guide-confweb" : "/pages/guide";
  const guidePtLink =
    designVariant === "confweb" ? "/pages/guide-pt-confweb" : "/pages/guide-pt";

  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <img src={currentLogo} alt={logoAlt} className={styles.heroImage} />

        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{subtitleText}</p>
        <div className={styles.heroButtons}>
          <Link
            className="button button--primary button--lg margin-right--md"
            to={guideLink}
          >
            English Guide
          </Link>
          <Link className="button button--primary button--lg" to={guidePtLink}>
            Guia em Português
          </Link>
        </div>
      </div>
    </header>
  );
}

function APICard({ title, description, icon, route }) {
  return (
    <div className={styles.apiCard}>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link className={styles.apiCardButton} to={route}>
        View documentation <span>→</span>
      </Link>
    </div>
  );
}

function FeaturedLinks() {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  // Get the environment variable from customFields
  const showInternalAPIs = customFields.showInternalAPIs;

  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.apiCardGrid}>
          <APICard
            title="Conference API"
            description="Manage meetings and recordings."
            route="/api/conference"
          />
          {showInternalAPIs && (
            <>
              <APICard
                title="Data API"
                description="Access to artifacts, statistics, and usage reports."
                route="/api/data"
              />
              <APICard
                title="Administrative API"
                description="Administrative interface for account and user configuration and management."
                route="/api/administrative"
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const designVariant = siteConfig.customFields?.designVariant || "default";
  const description =
    designVariant === "confweb"
      ? "ConferênciaWeb API Documentation"
      : "Elos API Documentation";

  return (
    <Layout description={description}>
      <HomepageHeader />
      <main>
        <FeaturedLinks />
      </main>
    </Layout>
  );
}
