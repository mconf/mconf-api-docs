import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import Heading from "@theme/Heading";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">Documentation for Elos API integration</p>
        <div className={styles.heroButtons}>
          <Link
            className="button button--primary button--lg margin-right--md"
            to="/pages/guide"
          >
            Guia em Português
          </Link>
          <Link
            className="button button--primary button--lg"
            to="/pages/englishGuide"
          >
            English Guide
          </Link>
        </div>
        <img
          src="img/laptop.png"
          width="30%"
          alt="Elos API"
          className={styles.heroImage}
        />
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
        <div className={styles.sectionTitle}>
          <h2>API Documentation</h2>
          <p>Choose one of the APIs below to see its complete documentation</p>
        </div>

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

        <div className={styles.helpSection}>
          <h2>Need help?</h2>
          <div className={styles.helpCards}>
            <div className={styles.helpCard}>
              <h3>Help Center</h3>
              <p>Access articles and tutorials on how to use Elos.</p>
              <a
                href="https://ajuda.elos.vc/kb/article/150995/tudo-sobre-o-elos"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.helpLink}
              >
                Visit help center <span>→</span>
              </a>
            </div>
            <div className={styles.helpCard}>
              <h3>Technical Support</h3>
              <p>
                Contact our support team for specific questions about
                integration.
              </p>
              <a href="mailto:support@elos.vc" className={styles.helpLink}>
                Contact support <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout description="Elos API Documentation">
      <HomepageHeader />
      <main>
        <FeaturedLinks />
      </main>
    </Layout>
  );
}
