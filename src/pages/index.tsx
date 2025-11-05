import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import { FaApple, FaLinux, FaCopy, FaCheck } from "react-icons/fa";

import styles from "./index.module.css";

function DevelopmentWarningBanner() {
  return (
    <div className={styles.warningBanner}>
      <span className={styles.warningBadge}>⚠️ DEVELOPMENT PREVIEW</span>
      <span className={styles.warningMessage}>
        This project is under heavy development and subject to breaking changes.
        <strong> Not recommended for production use yet.</strong>
      </span>
    </div>
  );
}

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

function CliDownloadTabs() {
  // Function to detect the user's operating system
  const detectOS = (): "macos" | "linux" => {
    if (typeof window === "undefined") {
      // Server-side rendering fallback
      return "linux";
    }

    const userAgent = window.navigator.userAgent.toLowerCase();
    const platform = window.navigator.platform?.toLowerCase() || "";

    // Check for macOS/iOS
    if (
      userAgent.includes("mac") ||
      platform.includes("mac") ||
      userAgent.includes("iphone") ||
      userAgent.includes("ipad")
    ) {
      return "macos";
    }

    // Default to Linux for everything else (Linux, Windows users can still switch)
    return "linux";
  };

  const [activeTab, setActiveTab] = useState<"macos" | "linux">("linux");
  const [copied, setCopied] = useState(false);

  // Set the correct tab based on detected OS when component mounts
  useEffect(() => {
    setActiveTab(detectOS());
  }, []);

  const commands = {
    macos: `INSTALL_DIR="/usr/local/bin" sh <(curl -L https://raw.githubusercontent.com/EnclaveRunner/cli/main/install.sh)`,
    linux: `INSTALL_DIR="~/.local/bin" sh <(curl -L https://raw.githubusercontent.com/EnclaveRunner/cli/main/install.sh)`,
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(commands[activeTab]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = commands[activeTab];
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={styles.cliDownload}>
      <div className={styles.tabsContainer}>
        <button
          className={clsx(
            styles.tab,
            activeTab === "macos" && styles.tabActive
          )}
          onClick={() => setActiveTab("macos")}
        >
          <span className={styles.tabIcon}>
            <FaApple />
          </span>
          macOS
        </button>
        <button
          className={clsx(
            styles.tab,
            activeTab === "linux" && styles.tabActive
          )}
          onClick={() => setActiveTab("linux")}
        >
          <span className={styles.tabIcon}>
            <FaLinux />
          </span>
          Linux
        </button>
      </div>
      <div className={styles.codeContainer}>
        <pre className={styles.codeBlock}>
          <code>{commands[activeTab]}</code>
        </pre>
        <button
          className={clsx(styles.copyButton, copied && styles.copyButtonSuccess)}
          onClick={handleCopy}
          title={copied ? "Copied!" : "Copy to clipboard"}
        >
          {copied ? <FaCheck /> : <FaCopy />}
        </button>
      </div>
    </div>
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
              You already have a running instance of EnclaveRunner and want to
              get started? Get the encl CLI to deploy your first isolated job in
              minutes! If you haven't set up an EnclaveRunner instance yet,
              check out the First Steps section.
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
                to="/docs/first-steps"
              >
                🚀 First Steps
              </Link>
            </div>
          </div>
          <div className="col col--6">
            <div className={styles.codeExample}>
              <h3>Download and install the encl CLI</h3>
              <CliDownloadTabs />
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
      description="Secure, high-performance job deployment platform with security at it's core"
    >
      <DevelopmentWarningBanner />
      <HomepageHeader />
      <main>
        <FeatureSection />
        <GetStartedSection />
      </main>
    </Layout>
  );
}
