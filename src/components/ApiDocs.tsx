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
  swaggerURL: string;
}

const ApiDocs: React.FC = (props: ApiDocsProps) => {
  const [swagger, setSwagger] = useState<SwaggerDoc | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [openGroups, setOpenGroups] = useState<{ [tag: string]: boolean }>({});
  const [openEndpoints, setOpenEndpoints] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    fetch(props.swaggerURL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            `Failed to fetch API docs from ${props.swaggerURL} (status: ${res.status} ${res.statusText})`
          );
        }
        return res.json();
      })
      .then(setSwagger)
      .catch((e) => {
        setError(
          `Error fetching API docs from ${props.swaggerURL}: ${e.message}`
        );
      })
      .finally(() => setLoading(false));
  }, [props.swaggerURL]);

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

  return (
    <div
      className="theme-doc-markdown"
      style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}
    >
      <h1>{swagger.info.title}</h1>
      <p>{swagger.info.description}</p>
      <div style={{ marginBottom: 16 }}>
        <b>Version:</b> {swagger.info.version}
        {swagger.info.license && (
          <span style={{ marginLeft: 16 }}>
            <b>License:</b>{" "}
            <a
              href={swagger.info.license.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {swagger.info.license.name}
            </a>
          </span>
        )}
      </div>
      <hr />
      <h2>Endpoints</h2>
      {Object.entries(groups).map(([tag, endpoints]) => (
        <div key={tag} style={{ marginBottom: 40 }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: 20,
              marginBottom: 8,
              marginTop: 32,
            }}
          >
            {tag === "_untagged" ? "Other" : tag}
          </div>
          <hr style={{ margin: "8px 0 24px 0" }} />
          {endpoints.map(({ path, method, details }) => {
            const endpointKey = `${tag}|${path}|${method}`;
            return (
              <div
                key={endpointKey}
                className="card"
                style={{ marginBottom: 20 }}
              >
                <div
                  className="card__header"
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={() =>
                    setOpenEndpoints((prev) => ({
                      ...prev,
                      [endpointKey]: !prev[endpointKey],
                    }))
                  }
                >
                  <span
                    className={`badge badge--${
                      method === "get" ? "success" : "danger"
                    }`}
                    style={{
                      textTransform: "uppercase",
                      fontWeight: 700,
                      marginRight: 12,
                    }}
                  >
                    {method}
                  </span>
                  <span style={{ fontWeight: 600 }}>{path}</span>
                  {details.summary && (
                    <span style={{ marginLeft: 12 }}>{details.summary}</span>
                  )}
                  <span style={{ marginLeft: "auto", fontSize: 18 }}>
                    {openEndpoints[endpointKey] ? "▼" : "▶"}
                  </span>
                </div>
                {openEndpoints[endpointKey] && (
                  <div className="card__body">
                    <div style={{ marginBottom: 8 }}>{details.description}</div>
                    {details.parameters && details.parameters.length > 0 && (
                      <div style={{ marginBottom: 8 }}>
                        <b>Parameters:</b>
                        <ul style={{ margin: 0, paddingLeft: 20 }}>
                          {details.parameters.map((param) => (
                            <li key={param.name}>
                              <span style={{ fontWeight: 500 }}>
                                {param.name}
                              </span>
                              {param.required && (
                                <span
                                  className="badge badge--danger"
                                  style={{ marginLeft: 4 }}
                                >
                                  *
                                </span>
                              )}
                              <span style={{ marginLeft: 8, opacity: 0.7 }}>
                                ({param.in})
                              </span>
                              {param.type && (
                                <span style={{ marginLeft: 8 }}>
                                  Type: {param.type}
                                </span>
                              )}
                              {param.description && (
                                <span style={{ marginLeft: 8 }}>
                                  {param.description}
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div>
                      <b>Responses:</b>
                      <ul style={{ margin: 0, paddingLeft: 20 }}>
                        {Object.entries(details.responses).map(
                          ([code, resp]) => (
                            <li key={code}>
                              <span style={{ fontWeight: 500 }}>{code}</span>:{" "}
                              {resp.description}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ApiDocs;
