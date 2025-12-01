import React, { useState } from "react";
import Layout from "@theme-original/Layout";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

function MaterialIcon({ children }) {
  return <span className="material-symbols-outlined">{children}</span>;
}

function MethodBadge({ method }) {
  const methodColors = {
    GET: "#2F8132",
    POST: "#186FAF",
    PUT: "#95507c",
    DEL: "#cc3333",
    HEAD: "#A23DAD",
  };

  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        marginRight: "8px",
        borderRadius: "3px",
        fontSize: "8px",
        fontWeight: "bold",
        color: "#fff",
        backgroundColor: methodColors[method] || "#888",
        textTransform: "uppercase",
        width: "41px",
        textAlign: "center",
      }}
    >
      {method}
    </span>
  );
}

function CollapsibleCategory({
  label,
  children,
  defaultOpen = false,
  searchQuery = "",
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // Extract text from label (handles both string and JSX elements)
  const getLabelText = (labelElement) => {
    if (typeof labelElement === "string") return labelElement;
    if (React.isValidElement(labelElement)) {
      return React.Children.toArray(labelElement.props.children)
        .map((child) => (typeof child === "string" ? child : ""))
        .join("")
        .trim();
    }
    return "";
  };

  const labelText = getLabelText(label);
  const categoryMatchesSearch =
    searchQuery.trim() &&
    labelText.toLowerCase().includes(searchQuery.toLowerCase());

  // Filter out false/null/undefined children to check if category has visible items
  const visibleChildren = React.Children.toArray(children).filter(Boolean);

  // Hide the entire category if there are no visible children AND category name doesn't match search
  if (visibleChildren.length === 0 && !categoryMatchesSearch) {
    return null;
  }

  // If category name matches search OR manually opened, show children
  const shouldBeOpen = categoryMatchesSearch || isOpen;

  return (
    <li>
      <div className="menu__list-item-collapsible">
        <a
          className="menu__link menu__link--sublist"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
          }}
          style={{ cursor: "pointer" }}
        >
          {label}
        </a>
      </div>
      {shouldBeOpen && <ul className="menu__list">{children}</ul>}
    </li>
  );
}

export default function LayoutWrapper(props) {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  // Get the environment variable from customFields
  const showInternalAPIs = customFields.showInternalAPIs;
  const [searchQuery, setSearchQuery] = useState("");
  const [matchedCategories, setMatchedCategories] = useState(new Set());

  // Filter function to check if a method matches the search query
  const matchesSearch = (methodName, ...categoryNames) => {
    if (!searchQuery.trim()) return true;

    // Check if any of the category names match
    for (const categoryName of categoryNames) {
      if (
        categoryName &&
        categoryName.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return true;
      }
    }

    // Check if the method name matches
    return methodName.toLowerCase().includes(searchQuery.toLowerCase());
  };

  return (
    <Layout {...props}>
      <div className={styles.docPage}>
        <aside className={styles.docSidebarContainer}>
          <div className={styles.sidebarWrapper}>
            <div className={styles.searchContainer}>
              <div className={styles.searchInputWrapper}>
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="Search methods..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    className={styles.clearButton}
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
            <nav className="menu thin-scrollbar">
              <ul className="menu__list">
                <CollapsibleCategory
                  label="General"
                  defaultOpen={true}
                  searchQuery={searchQuery}
                >
                  <li className="menu__list-item">
                    <Link className="menu__link" to="/docs/">
                      <MaterialIcon>home</MaterialIcon> Home
                    </Link>
                  </li>
                  <li className="menu__list-item">
                    <Link className="menu__link" to="/docs/pages/guide">
                      <MaterialIcon>menu_book</MaterialIcon> English Guide
                    </Link>
                  </li>
                  <li className="menu__list-item">
                    <Link className="menu__link" to="/docs/pages/guide-pt">
                      <MaterialIcon>menu_book</MaterialIcon> Guia em Português
                    </Link>
                  </li>
                  {/* What's new /blog */}
                  {/* <li className="menu__list-item">
                    <Link className="menu__link" to="/docs/blog">
                      <MaterialIcon>auto_stories</MaterialIcon> What's New
                    </Link>
                  </li> */}
                </CollapsibleCategory>
                <CollapsibleCategory
                  label="Conference API"
                  defaultOpen={true}
                  searchQuery={searchQuery}
                >
                  <li className="menu__list-item">
                    <Link
                      className="menu__link"
                      to="/docs/api/conference#section/Intro"
                    >
                      <MaterialIcon>book_4</MaterialIcon>Intro
                    </Link>
                  </li>
                  <li className="menu__list-item">
                    <Link
                      className="menu__link"
                      to="/docs/api/conference#section/Authentication"
                    >
                      <MaterialIcon>id_card</MaterialIcon>Authentication
                    </Link>
                  </li>
                  <CollapsibleCategory
                    label={
                      <>
                        <MaterialIcon>frame_person</MaterialIcon> Meeting
                      </>
                    }
                    defaultOpen={true}
                    searchQuery={searchQuery}
                  >
                    {matchesSearch(
                      "getMeetings",
                      "Conference API",
                      "Meeting"
                    ) && (
                      <li className="menu__list-item">
                        <Link
                          className="menu__link"
                          to="/docs/api/conference#tag/meeting/operation/getMeetings"
                        >
                          <MethodBadge method="GET" />
                          getMeetings
                        </Link>
                      </li>
                    )}
                    {matchesSearch(
                      "getAllMeetings",
                      "Conference API",
                      "Meeting"
                    ) && (
                      <li className="menu__list-item">
                        <Link
                          className="menu__link"
                          to="/docs/api/conference#tag/meeting/operation/getAllMeetings"
                        >
                          <MethodBadge method="GET" />
                          getAllMeetings
                        </Link>
                      </li>
                    )}
                    {matchesSearch(
                      "isMeetingRunning",
                      "Conference API",
                      "Meeting"
                    ) && (
                      <li className="menu__list-item">
                        <Link
                          className="menu__link"
                          to="/docs/api/conference#tag/meeting/operation/isMeetingRunning"
                        >
                          <MethodBadge method="GET" />
                          isMeetingRunning
                        </Link>
                      </li>
                    )}
                    {matchesSearch(
                      "getMeetingInfo",
                      "Conference API",
                      "Meeting"
                    ) && (
                      <li className="menu__list-item">
                        <Link
                          className="menu__link"
                          to="/docs/api/conference#tag/meeting/operation/getMeetingInfo"
                        >
                          <MethodBadge method="GET" />
                          getMeetingInfo
                        </Link>
                      </li>
                    )}
                    {matchesSearch("create", "Conference API", "Meeting") && (
                      <li className="menu__list-item">
                        <Link
                          className="menu__link"
                          to="/docs/api/conference#tag/meeting/operation/get-create"
                        >
                          <MethodBadge method="GET" />
                          create
                        </Link>
                      </li>
                    )}
                    {matchesSearch("create", "Conference API", "Meeting") && (
                      <li className="menu__list-item">
                        <Link
                          className="menu__link"
                          to="/docs/api/conference#tag/meeting/operation/post-create"
                        >
                          <MethodBadge method="POST" />
                          create
                        </Link>
                      </li>
                    )}
                    {matchesSearch("end", "Conference API", "Meeting") && (
                      <li className="menu__list-item">
                        <Link
                          className="menu__link"
                          to="/docs/api/conference#tag/meeting/operation/end-meeting"
                        >
                          <MethodBadge method="GET" />
                          end
                        </Link>
                      </li>
                    )}
                    {matchesSearch("join", "Conference API", "Meeting") && (
                      <li className="menu__list-item">
                        <Link
                          className="menu__link"
                          to="/docs/api/conference#tag/meeting/operation/join-meeting"
                        >
                          <MethodBadge method="GET" />
                          join
                        </Link>
                      </li>
                    )}
                  </CollapsibleCategory>

                  <CollapsibleCategory
                    label={
                      <>
                        <MaterialIcon>album</MaterialIcon> Recording
                      </>
                    }
                    defaultOpen={true}
                    searchQuery={searchQuery}
                  >
                    {matchesSearch(
                      "getRecordings",
                      "Conference API",
                      "Recording"
                    ) && (
                      <li className="menu__list-item">
                        <Link
                          className="menu__link"
                          to="/docs/api/conference#tag/recording/operation/getRecordings"
                        >
                          <MethodBadge method="GET" />
                          getRecordings
                        </Link>
                      </li>
                    )}
                    {matchesSearch(
                      "publishRecordings",
                      "Conference API",
                      "Recording"
                    ) && (
                      <li className="menu__list-item">
                        <Link
                          className="menu__link"
                          to="/docs/api/conference#tag/recording/operation/publishRecordings"
                        >
                          <MethodBadge method="GET" />
                          publishRecordings
                        </Link>
                      </li>
                    )}
                    {matchesSearch(
                      "deleteRecordings",
                      "Conference API",
                      "Recording"
                    ) && (
                      <li className="menu__list-item">
                        <Link
                          className="menu__link"
                          to="/docs/api/conference#tag/recording/operation/deleteRecordings"
                        >
                          <MethodBadge method="GET" />
                          deleteRecordings
                        </Link>
                      </li>
                    )}
                    {matchesSearch(
                      "updateRecordings",
                      "Conference API",
                      "Recording"
                    ) && (
                      <li className="menu__list-item">
                        <Link
                          className="menu__link"
                          to="/docs/api/conference#tag/recording/operation/updateRecordings"
                        >
                          <MethodBadge method="GET" />
                          updateRecordings
                        </Link>
                      </li>
                    )}
                  </CollapsibleCategory>

                  <CollapsibleCategory
                    label={
                      <>
                        <MaterialIcon>webhook</MaterialIcon> Webhooks
                      </>
                    }
                    defaultOpen={true}
                    searchQuery={searchQuery}
                  >
                    {matchesSearch("create", "Conference API", "Webhooks") && (
                      <li className="menu__list-item">
                        <Link
                          className="menu__link"
                          to="/docs/api/conference#tag/hooks/operation/hooks-create"
                        >
                          <MethodBadge method="GET" />
                          create
                        </Link>
                      </li>
                    )}
                    {matchesSearch("list", "Conference API", "Webhooks") && (
                      <li className="menu__list-item">
                        <Link
                          className="menu__link"
                          to="/docs/api/conference#tag/hooks/operation/hooks-list"
                        >
                          <MethodBadge method="GET" />
                          list
                        </Link>
                      </li>
                    )}
                    {matchesSearch("destroy", "Conference API", "Webhooks") && (
                      <li className="menu__list-item">
                        <Link
                          className="menu__link"
                          to="/docs/api/conference#tag/hooks/operation/hooks-destroy"
                        >
                          <MethodBadge method="GET" />
                          destroy
                        </Link>
                      </li>
                    )}
                    {matchesSearch("enable", "Conference API", "Webhooks") && (
                      <li className="menu__list-item">
                        <Link
                          className="menu__link"
                          to="/docs/api/conference#tag/hooks/operation/hooks-enable"
                        >
                          <MethodBadge method="GET" />
                          enable
                        </Link>
                      </li>
                    )}
                  </CollapsibleCategory>
                  <CollapsibleCategory
                    label={
                      <>
                        <MaterialIcon>note_add</MaterialIcon> Extra
                      </>
                    }
                    defaultOpen={true}
                    searchQuery={searchQuery}
                  >
                    {matchesSearch(
                      "API Version",
                      "Conference API",
                      "Extra"
                    ) && (
                      <li className="menu__list-item">
                        <Link
                          className="menu__link"
                          to="/docs/api/conference#tag/extra/operation/api-get-version"
                        >
                          <MethodBadge method="GET" />
                          API Version
                        </Link>
                      </li>
                    )}
                    {matchesSearch(
                      "API Version",
                      "Conference API",
                      "Extra"
                    ) && (
                      <li className="menu__list-item">
                        <Link
                          className="menu__link"
                          to="/docs/api/conference#tag/extra/operation/api-post-version"
                        >
                          <MethodBadge method="POST" />
                          API Version
                        </Link>
                      </li>
                    )}
                    {matchesSearch(
                      "API Version",
                      "Conference API",
                      "Extra"
                    ) && (
                      <li className="menu__list-item">
                        <Link
                          className="menu__link"
                          to="/docs/api/conference#tag/extra/operation/api-head-version"
                        >
                          <MethodBadge method="HEAD" />
                          API Version
                        </Link>
                      </li>
                    )}
                  </CollapsibleCategory>
                </CollapsibleCategory>
                {showInternalAPIs && (
                  <>
                    <CollapsibleCategory
                      label="Data API"
                      defaultOpen={true}
                      searchQuery={searchQuery}
                    >
                      <CollapsibleCategory
                        label={
                          <>
                            <MaterialIcon>lab_profile</MaterialIcon> Summary
                          </>
                        }
                        defaultOpen={true}
                        searchQuery={searchQuery}
                      >
                        {matchesSearch("summary", "Data API", "Summary") && (
                          <li className="menu__list-item">
                            <Link
                              className="menu__link"
                              to="/docs/api/data#tag/summary"
                            >
                              <MethodBadge method="GET" />
                              summary
                            </Link>
                          </li>
                        )}
                      </CollapsibleCategory>

                      <CollapsibleCategory
                        label={
                          <>
                            <MaterialIcon>flowsheet</MaterialIcon> Artifacts
                          </>
                        }
                        defaultOpen={true}
                        searchQuery={searchQuery}
                      >
                        {matchesSearch("report", "Data API", "Artifacts") && (
                          <li className="menu__list-item">
                            <Link
                              className="menu__link"
                              to="/docs/api/data#tag/artifacts/paths/~1institutions~1{institution_guid}~1artifacts~1report~1{ref_month}/get"
                            >
                              <MethodBadge method="GET" />
                              report
                            </Link>
                          </li>
                        )}
                        {matchesSearch(
                          "engagement_report",
                          "Data API",
                          "Artifacts"
                        ) && (
                          <li className="menu__list-item">
                            <Link
                              className="menu__link"
                              to="/docs/api/data#tag/artifacts/paths/~1institutions~1{institution_guid}~1artifacts~1meetings~1{int_meeting_id}~1engagement_report/get"
                            >
                              <MethodBadge method="GET" />
                              engagement_report
                            </Link>
                          </li>
                        )}
                        {matchesSearch(
                          "participants_list",
                          "Data API",
                          "Artifacts"
                        ) && (
                          <li className="menu__list-item">
                            <Link
                              className="menu__link"
                              to="/docs/api/data#tag/artifacts/paths/~1institutions~1{institution_guid}~1artifacts~1meetings~1{int_meeting_id}~1participants_list/get"
                            >
                              <MethodBadge method="GET" />
                              participants_list
                            </Link>
                          </li>
                        )}
                        {matchesSearch(
                          "shared_notes",
                          "Data API",
                          "Artifacts"
                        ) && (
                          <li className="menu__list-item">
                            <Link
                              className="menu__link"
                              to="/docs/api/data#tag/artifacts/paths/~1institutions~1{institution_guid}~1artifacts~1meetings~1{int_meeting_id}~1shared_notes/get"
                            >
                              <MethodBadge method="GET" />
                              shared_notes
                            </Link>
                          </li>
                        )}
                        {matchesSearch("file", "Data API", "Artifacts") && (
                          <li className="menu__list-item">
                            <Link
                              className="menu__link"
                              to="/docs/api/data#tag/artifacts/paths/~1institutions~1{institution_guid}~1artifacts~1meetings~1{int_meeting_id}~1file/get"
                            >
                              <MethodBadge method="GET" />
                              file
                            </Link>
                          </li>
                        )}
                        {matchesSearch("file", "Data API", "Artifacts") && (
                          <li className="menu__list-item">
                            <Link
                              className="menu__link"
                              to="/docs/api/data#tag/artifacts/paths/~1institutions~1{institution_guid}~1artifacts~1meetings~1{int_meeting_id}~1file/put"
                            >
                              <MethodBadge method="PUT" />
                              file
                            </Link>
                          </li>
                        )}
                        {matchesSearch(
                          "list_objects",
                          "Data API",
                          "Artifacts"
                        ) && (
                          <li className="menu__list-item">
                            <Link
                              className="menu__link"
                              to="/docs/api/data#tag/artifacts/paths/~1institutions~1{institution_guid}~1artifacts~1meetings~1{int_meeting_id}~1list_objects/get"
                            >
                              <MethodBadge method="GET" />
                              list_objects
                            </Link>
                          </li>
                        )}
                      </CollapsibleCategory>
                    </CollapsibleCategory>

                    <CollapsibleCategory
                      label="Administrative API"
                      defaultOpen={true}
                      searchQuery={searchQuery}
                    >
                      {matchesSearch("institution", "Administrative API") && (
                        <li className="menu__list-item">
                          <Link
                            className="menu__link"
                            to="/docs/api/administrative#/paths/~1institution~1{guid}/get"
                          >
                            <MethodBadge method="GET" />
                            institution
                          </Link>
                        </li>
                      )}
                      {matchesSearch("institution", "Administrative API") && (
                        <li className="menu__list-item">
                          <Link
                            className="menu__link"
                            to="/docs/api/administrative#/paths/~1institution~1{guid}/put"
                          >
                            <MethodBadge method="PUT" />
                            institution
                          </Link>
                        </li>
                      )}
                      {matchesSearch("institution", "Administrative API") && (
                        <li className="menu__list-item">
                          <Link
                            className="menu__link"
                            to="/docs/api/administrative#/paths/~1institution~1/post"
                          >
                            <MethodBadge method="POST" />
                            institution
                          </Link>
                        </li>
                      )}
                      {matchesSearch(
                        "meeting_settings",
                        "Administrative API"
                      ) && (
                        <li className="menu__list-item">
                          <Link
                            className="menu__link"
                            to="/docs/api/administrative#/paths/~1institution~1{guid}~1meeting_settings/get"
                          >
                            <MethodBadge method="GET" />
                            institution/meeting_settings
                          </Link>
                        </li>
                      )}
                      {matchesSearch(
                        "unsubscription",
                        "Administrative API"
                      ) && (
                        <li className="menu__list-item">
                          <Link
                            className="menu__link"
                            to="/docs/api/administrative#/paths/~1institution~1{guid}~1unsubscription/post"
                          >
                            <MethodBadge method="POST" />
                            institution/unsubscription
                          </Link>
                        </li>
                      )}
                      {matchesSearch("reactivation", "Administrative API") && (
                        <li className="menu__list-item">
                          <Link
                            className="menu__link"
                            to="/docs/api/administrative#/paths/~1institution~1{guid}~1reactivation/post"
                          >
                            <MethodBadge method="POST" />
                            institution/reactivation
                          </Link>
                        </li>
                      )}
                      {matchesSearch("user", "Administrative API") && (
                        <li className="menu__list-item">
                          <Link
                            className="menu__link"
                            to="/docs/api/administrative#/paths/~1user~1{external_user_id}/delete"
                          >
                            <MethodBadge method="DEL" />
                            user
                          </Link>
                        </li>
                      )}
                    </CollapsibleCategory>
                  </>
                )}

                <CollapsibleCategory
                  label="Contact"
                  defaultOpen={true}
                  searchQuery={searchQuery}
                >
                  <li className="menu__list-item">
                    <a
                      className="menu__link"
                      href="https://ajuda.elos.vc/kb/article/150995/tudo-sobre-o-elos"
                      target="_blank"
                    >
                      <MaterialIcon>indeterminate_question_box</MaterialIcon>
                      Help Center
                    </a>
                  </li>
                  <li className="menu__list-item">
                    <a className="menu__link" href="mailto:support@elos.vc">
                      <MaterialIcon> contact_emergency </MaterialIcon> Technical
                      Support
                    </a>
                  </li>
                </CollapsibleCategory>

                <CollapsibleCategory
                  label="Links"
                  defaultOpen={true}
                  searchQuery={searchQuery}
                >
                  <li className="menu__list-item">
                    <a
                      className="menu__link"
                      href="https://elos.vc/site/"
                      target="_blank"
                    >
                      <MaterialIcon>link</MaterialIcon>
                      Elos
                    </a>
                  </li>
                  <li className="menu__list-item">
                    <a
                      className="menu__link"
                      href="https://elos.vc/site/sobre-a-mconf/"
                    >
                      <MaterialIcon> link </MaterialIcon> About Mconf
                    </a>
                  </li>
                </CollapsibleCategory>
              </ul>
            </nav>
          </div>
        </aside>
        <main className={styles.docMainContainer}>{props.children}</main>
      </div>
    </Layout>
  );
}
