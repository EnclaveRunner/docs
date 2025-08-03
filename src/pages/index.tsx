import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className={clsx("container", styles.fadeIn)}>
        <img
          src="./img/enclave_color.svg"
          alt="EnclaveRunner Logo"
          className={clsx(
            styles.heroLogo,
            styles.logoSpin,
            styles.heroImageImpressive
          )}
          style={{ width: 190, height: 190, marginBottom: 24 }}
        />
        <Heading as="h1" className={clsx("hero__title", styles.slideDown)}>
          {siteConfig.title}
        </Heading>
        <p className={clsx("hero__subtitle", styles.fadeInDelay)}>
          {siteConfig.tagline}
        </p>
        <div className={clsx(styles.buttons, styles.fadeInLater)}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/docs/intro"
          >
            Get started with EnclaveRunner
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main></main>
    </Layout>
  );
}
