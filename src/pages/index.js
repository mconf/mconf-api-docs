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
        <img
          src="img/favicon.svg"
          alt="Elos API"
          className={styles.heroImage}
        />

        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">Documentation for Elos API integration</p>
        <div className={styles.heroButtons}>
          <Link
            className="button button--primary button--lg margin-right--md"
            to="/pages/guide"
          >
            English Guide
          </Link>
          <Link
            className="button button--primary button--lg"
            to="/pages/guide-pt"
          >
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
  return (
    <Layout description="Elos API Documentation">
      <HomepageHeader />
      <main>
        <FeaturedLinks />
      </main>
    </Layout>
  );
}
