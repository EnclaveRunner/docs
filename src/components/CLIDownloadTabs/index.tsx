import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { FaApple, FaLinux, FaCopy, FaCheck } from "react-icons/fa";

import styles from "./styles.module.css";

export default function CliDownloadTabs() {
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
