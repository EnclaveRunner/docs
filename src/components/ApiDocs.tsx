import React, { useEffect, useState } from "react";

interface SwaggerInfo {
  title: string;
  description: string;
  version: string;
  termsOfService?: string;
  contact?: { name?: string };
  license?: { name?: string; url?: string };
}

interface SwaggerParameter {
  name: string;
  in: string;
  description?: string;
  required?: boolean;
  type?: string;
}

interface SwaggerResponse {
  description: string;
  schema?: unknown;
}

interface SwaggerMethod {
  description?: string;
  summary?: string;
  tags?: string[];
  parameters?: SwaggerParameter[];
  responses: { [code: string]: SwaggerResponse };
  consumes?: string[];
  produces?: string[];
}

interface SwaggerPath {
  [method: string]: SwaggerMethod;
}

interface SwaggerDoc {
  swagger: string;
  info: SwaggerInfo;
  host?: string;
  basePath?: string;
  paths: { [path: string]: SwaggerPath };
}

interface ApiDocsProps {
  swaggerURL?: string;
}

const ApiDocs: React.FC<ApiDocsProps> = ({
  swaggerURL = "https://raw.githubusercontent.com/EnclaveRunner/api-server/main/docs/swagger.json",
}) => {
  const [swagger, setSwagger] = useState<SwaggerDoc | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [openGroups, setOpenGroups] = useState<{ [tag: string]: boolean }>({});
  const [openEndpoints, setOpenEndpoints] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    fetch(swaggerURL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            `Failed to fetch API docs from ${swaggerURL} (status: ${res.status} ${res.statusText})`
          );
        }
        return res.json();
      })
      .then(setSwagger)
      .catch((e) => {
        setError(`Error fetching API docs from ${swaggerURL}: ${e.message}`);
      })
      .finally(() => setLoading(false));
  }, [swaggerURL]);

  // Group endpoints by tag
  const groupEndpoints = (swagger: SwaggerDoc) => {
    const groups: {
      [tag: string]: Array<{
        path: string;
        method: string;
        details: SwaggerMethod;
      }>;
    } = {};
    Object.entries(swagger.paths).forEach(([path, methods]) => {
      Object.entries(methods).forEach(([method, details]) => {
        const tags =
          details.tags && details.tags.length > 0
            ? details.tags
            : ["_untagged"];
        tags.forEach((tag) => {
          if (!groups[tag]) groups[tag] = [];
          groups[tag].push({ path, method, details });
        });
      });
    });
    return groups;
  };

  if (loading) return <div>Loading API documentation...</div>;
  if (error) return <div className="alert alert--danger">Error: {error}</div>;
  if (!swagger) return null;

  const groups = groupEndpoints(swagger);

  function isSafeUrl(url?: string) {
    if (!url) return false;
    try {
      const parsed = new URL(url, window.location.origin);
      // Only allow http(s) protocols
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  }
  return (
    <div className="api-docs">
      {/* Header Section */}
      <div className="api-header">
        <p className="api-description">{swagger.info.description}</p>
        <div className="api-meta">
          <span className="api-version">
            <strong>Version:</strong> {swagger.info.version}
          </span>
          {swagger.info.license && (
            <span className="api-license">
              <strong>License:</strong>{" "}
              {isSafeUrl(swagger.info.license.url) ? (
                <a
                  href={swagger.info.license.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="license-link"
                >
                  {swagger.info.license.name}
                </a>
              ) : (
                <span>{swagger.info.license.name}</span>
              )}
            </span>
          )}
        </div>
      </div>

      {/* API Endpoints */}
      <div className="api-content">
        {Object.entries(groups).map(([tag, endpoints]) => (
          <section key={tag} className="endpoint-group">
            <h3 className="group-title">
              {tag === "_untagged"
                ? "General"
                : tag.charAt(0).toUpperCase() + tag.slice(1)}
              <span className="endpoint-count">({endpoints.length})</span>
            </h3>

            <div className="endpoints-list">
              {endpoints.map(({ path, method, details }) => {
                const endpointKey = `${tag}|${path}|${method}`;
                const isOpen = openEndpoints[endpointKey];

                return (
                  <div key={endpointKey} className="endpoint-item">
                    <div
                      className="endpoint-summary"
                      onClick={() =>
                        setOpenEndpoints((prev) => ({
                          ...prev,
                          [endpointKey]: !prev[endpointKey],
                        }))
                      }
                    >
                      <div className="endpoint-method-path">
                        <span
                          className={`method-badge method-${method.toLowerCase()}`}
                        >
                          {method.toUpperCase()}
                        </span>
                        <code className="endpoint-path">{path}</code>
                      </div>

                      <div className="endpoint-info">
                        {details.summary && (
                          <span className="endpoint-summary-text">
                            {details.summary}
                          </span>
                        )}
                        <button
                          className="expand-button"
                          aria-label="Toggle details"
                        >
                          {isOpen ? "▼" : "▶"}
                        </button>
                      </div>
                    </div>

                    {isOpen && (
                      <div className="endpoint-details">
                        {details.description && (
                          <div className="endpoint-description">
                            <p>{details.description}</p>
                          </div>
                        )}

                        {details.parameters &&
                          details.parameters.length > 0 && (
                            <div className="parameters-section">
                              <h4 className="section-title">Parameters</h4>
                              <div className="parameters-table">
                                {details.parameters.map((param) => (
                                  <div
                                    key={param.name}
                                    className="parameter-row"
                                  >
                                    <div className="parameter-name">
                                      <code>{param.name}</code>
                                      {param.required && (
                                        <span className="required-badge">
                                          required
                                        </span>
                                      )}
                                    </div>
                                    <div className="parameter-details">
                                      <div className="parameter-meta">
                                        <span className="parameter-type">
                                          {param.type || "string"}
                                        </span>
                                        <span className="parameter-location">
                                          in {param.in}
                                        </span>
                                      </div>
                                      {param.description && (
                                        <p className="parameter-description">
                                          {param.description}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                        <div className="responses-section">
                          <h4 className="section-title">Responses</h4>
                          <div className="responses-list">
                            {Object.entries(details.responses).map(
                              ([code, resp]) => (
                                <div key={code} className="response-item">
                                  <div className="response-code">
                                    <span
                                      className={`status-badge status-${code.charAt(
                                        0
                                      )}xx`}
                                    >
                                      {code}
                                    </span>
                                  </div>
                                  <div className="response-description">
                                    {resp.description}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ApiDocs;
