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
          className={styles.heroLogo}
          style={{
            width: "180px",
            height: "180px",
            marginBottom: "24px",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
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
            to="/docs/intro"
          >
            Get started with EnclaveRunner
          </Link>
        </div>
      </div>
    </header>
  );
}

function FeatureSection() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className={clsx("col col--4", styles.feature)}>
            <div className={styles.featureIcon}>🔒</div>
            <h3>Secure</h3>
            <p>
              Jobs are executed in an isolated manner by leveraging WASM
              (Web-Assembly) technology, ensuring robust security, protection
              and granular control over resource access. Regular containers dont
              provide true secure isolation, WASM does.
            </p>
          </div>
          <div className={clsx("col col--4", styles.feature)}>
            <div className={styles.featureIcon}>✏️</div>
            <h3>Declarative</h3>
            <p>
              Everything is defined as declarative manifests using simple YAML
              configuration files. This makes it easy to version, share, and
              automate.
            </p>
          </div>
          <div className={clsx("col col--4", styles.feature)}>
            <div className={styles.featureIcon}>🪶</div>
            <h3>Lightweight WASM-Runners</h3>
            <p>
              In comparison to traditional VM- or Container-based solutions,
              EnclaveRunner is extremely lightweight thanks to its WASM-based
              architecture.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function GetStartedSection() {
  return (
    <section className={styles.getStarted}>
      <div className="container">
        <div className="row">
          <div className="col col--6">
            <h2>Quick Start</h2>
            <p>
              Get up and running with EnclaveRunner in minutes using docker
              compose or deploy it to your Kubernetes cluster (planned).
            </p>
            <div className={styles.quickStartLinks}>
              <Link
                className="button button--primary button--lg margin-right--md"
                to="/docs/intro"
              >
                📚 Read the Docs
              </Link>
              <Link
                className="button button--secondary button--lg"
                to="/docs/components/first-steps"
              >
                🚀 First Steps
              </Link>
            </div>
          </div>
          <div className="col col--6">
            <div className={styles.codeExample}>
              <h3>Example Usage</h3>
              <pre className={styles.codeBlock}>
                <code>{`<coming soon>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Secure, high-performance application deployment with hardware-level protection"
    >
      <HomepageHeader />
      <main>
        <FeatureSection />
        <GetStartedSection />
      </main>
    </Layout>
  );
}
