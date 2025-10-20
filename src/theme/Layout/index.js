import React, { useState } from "react";
import Layout from "@theme-original/Layout";
import styles from "./styles.module.css";

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

function CollapsibleCategory({ label, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

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
      {isOpen && <ul className="menu__list">{children}</ul>}
    </li>
  );
}

export default function LayoutWrapper(props) {
  return (
    <Layout {...props}>
      <div className={styles.docPage}>
        <aside className={styles.docSidebarContainer}>
          <div className={styles.sidebarWrapper}>
            <nav className="menu thin-scrollbar">
              <ul className="menu__list">
                <CollapsibleCategory label="General" defaultOpen={true}>
                  <li className="menu__list-item">
                    <a className="menu__link" href="/docs/">
                      <MaterialIcon>home</MaterialIcon> Home
                    </a>
                  </li>
                  <li className="menu__list-item">
                    <a className="menu__link" href="/docs/pages/guide">
                      <MaterialIcon>menu_book</MaterialIcon> English Guide
                    </a>
                  </li>
                  <li className="menu__list-item">
                    <a className="menu__link" href="/docs/pages/guide-pt">
                      <MaterialIcon>menu_book</MaterialIcon> Guia em Português
                    </a>
                  </li>
                  <li className="menu__list-item">
                    <a className="menu__link" href="/docs/blog">
                      <MaterialIcon>auto_stories</MaterialIcon> What's New
                    </a>
                  </li>
                </CollapsibleCategory>
                <CollapsibleCategory label="Conference API" defaultOpen={true}>
                  <li className="menu__list-item">
                    <a
                      className="menu__link"
                      href="/docs/api/conference#section/Intro"
                    >
                      <MaterialIcon>book_4</MaterialIcon>Intro
                    </a>
                  </li>
                  <li className="menu__list-item">
                    <a
                      className="menu__link"
                      href="/docs/api/conference#section/Authentication"
                    >
                      <MaterialIcon>id_card</MaterialIcon>Authentication
                    </a>
                  </li>
                  <CollapsibleCategory
                    label={
                      <>
                        <MaterialIcon>frame_person</MaterialIcon> Meeting
                      </>
                    }
                    defaultOpen={true}
                  >
                    <li className="menu__list-item">
                      <a
                        className="menu__link"
                        href="/docs/api/conference#tag/meeting/operation/getMeetings"
                      >
                        <MethodBadge method="GET" />
                        getMeetings
                      </a>
                    </li>
                    <li className="menu__list-item">
                      <a
                        className="menu__link"
                        href="/docs/api/conference#tag/meeting/operation/getAllMeetings"
                      >
                        <MethodBadge method="GET" />
                        getAllMeetings
                      </a>
                    </li>
                    <li className="menu__list-item">
                      <a
                        className="menu__link"
                        href="/docs/api/conference#tag/meeting/operation/isMeetingRunning"
                      >
                        <MethodBadge method="GET" />
                        isMeetingRunning
                      </a>
                    </li>
                    <li className="menu__list-item">
                      <a
                        className="menu__link"
                        href="/docs/api/conference#tag/meeting/operation/getMeetingInfo"
                      >
                        <MethodBadge method="GET" />
                        getMeetingInfo
                      </a>
                    </li>
                    <li className="menu__list-item">
                      <a
                        className="menu__link"
                        href="/docs/api/conference#tag/meeting/operation/get-create"
                      >
                        <MethodBadge method="GET" />
                        create
                      </a>
                    </li>
                    <li className="menu__list-item">
                      <a
                        className="menu__link"
                        href="/docs/api/conference#tag/meeting/operation/post-create"
                      >
                        <MethodBadge method="POST" />
                        create
                      </a>
                    </li>
                    <li className="menu__list-item">
                      <a
                        className="menu__link"
                        href="/docs/api/conference#tag/meeting/operation/end-meeting"
                      >
                        <MethodBadge method="GET" />
                        end
                      </a>
                    </li>
                    <li className="menu__list-item">
                      <a
                        className="menu__link"
                        href="/docs/api/conference#tag/meeting/operation/join-meeting"
                      >
                        <MethodBadge method="GET" />
                        join
                      </a>
                    </li>
                  </CollapsibleCategory>

                  <CollapsibleCategory
                    label={
                      <>
                        <MaterialIcon>album</MaterialIcon> Recording
                      </>
                    }
                    defaultOpen={true}
                  >
                    <li className="menu__list-item">
                      <a
                        className="menu__link"
                        href="/docs/api/conference#tag/recording/operation/getRecordings"
                      >
                        <MethodBadge method="GET" />
                        getRecordings
                      </a>
                    </li>
                    <li className="menu__list-item">
                      <a
                        className="menu__link"
                        href="/docs/api/conference#tag/recording/operation/publishRecordings"
                      >
                        <MethodBadge method="GET" />
                        publishRecordings
                      </a>
                    </li>
                    <li className="menu__list-item">
                      <a
                        className="menu__link"
                        href="/docs/api/conference#tag/recording/operation/deleteRecordings"
                      >
                        <MethodBadge method="GET" />
                        deleteRecordings
                      </a>
                    </li>
                    <li className="menu__list-item">
                      <a
                        className="menu__link"
                        href="/docs/api/conference#tag/recording/operation/updateRecordings"
                      >
                        <MethodBadge method="GET" />
                        updateRecordings
                      </a>
                    </li>
                  </CollapsibleCategory>

                  <CollapsibleCategory
                    label={
                      <>
                        <MaterialIcon>webhook</MaterialIcon> Webhooks
                      </>
                    }
                    defaultOpen={true}
                  >
                    <li className="menu__list-item">
                      <a
                        className="menu__link"
                        href="/docs/api/conference#tag/hooks/operation/hooks-create"
                      >
                        <MethodBadge method="GET" />
                        create
                      </a>
                    </li>
                    <li className="menu__list-item">
                      <a
                        className="menu__link"
                        href="/docs/api/conference#tag/hooks/operation/hooks-list"
                      >
                        <MethodBadge method="GET" />
                        list
                      </a>
                    </li>
                    <li className="menu__list-item">
                      <a
                        className="menu__link"
                        href="/docs/api/conference#tag/hooks/operation/hooks-destroy"
                      >
                        <MethodBadge method="GET" />
                        destroy
                      </a>
                    </li>
                    <li className="menu__list-item">
                      <a
                        className="menu__link"
                        href="/docs/api/conference#tag/hooks/operation/hooks-enable"
                      >
                        <MethodBadge method="GET" />
                        enable
                      </a>
                    </li>
                  </CollapsibleCategory>
                  <CollapsibleCategory
                    label={
                      <>
                        <MaterialIcon>note_add</MaterialIcon> Extra
                      </>
                    }
                    defaultOpen={true}
                  >
                    <li className="menu__list-item">
                      <a
                        className="menu__link"
                        href="/docs/api/conference#tag/extra/operation/api-get-version"
                      >
                        <MethodBadge method="GET" />
                        API Version
                      </a>
                    </li>
                    <li className="menu__list-item">
                      <a
                        className="menu__link"
                        href="/docs/api/conference#tag/extra/operation/api-post-version"
                      >
                        <MethodBadge method="POST" />
                        API Version
                      </a>
                    </li>
                    <li className="menu__list-item">
                      <a
                        className="menu__link"
                        href="/docs/api/conference#tag/extra/operation/api-head-version"
                      >
                        <MethodBadge method="HEAD" />
                        API Version
                      </a>
                    </li>
                  </CollapsibleCategory>
                </CollapsibleCategory>

                <CollapsibleCategory label="Data API" defaultOpen={true}>
                  <CollapsibleCategory
                    label={
                      <>
                        <MaterialIcon>lab_profile</MaterialIcon> Summary
                      </>
                    }
                    defaultOpen={true}
                  >
                    <li className="menu__list-item">
                      <a
                        className="menu__link"
                        href="/docs/api/data#tag/summary"
                      >
                        <MethodBadge method="GET" />
                        summary
                      </a>
                    </li>
                  </CollapsibleCategory>

                  <CollapsibleCategory
                    label={
                      <>
                        <MaterialIcon>flowsheet</MaterialIcon> Artifacts
                      </>
                    }
                    defaultOpen={true}
                  >
                    <li className="menu__list-item">
                      <a
                        className="menu__link"
                        href="/docs/api/data#tag/artifacts/paths/~1institutions~1{institution_guid}~1artifacts~1report~1{ref_month}/get"
                      >
                        <MethodBadge method="GET" />
                        report
                      </a>
                    </li>
                    <li className="menu__list-item">
                      <a
                        className="menu__link"
                        href="/docs/api/data#tag/artifacts/paths/~1institutions~1{institution_guid}~1artifacts~1meetings~1{int_meeting_id}~1engagement_report/get"
                      >
                        <MethodBadge method="GET" />
                        engagement_report
                      </a>
                    </li>
                    <li className="menu__list-item">
                      <a
                        className="menu__link"
                        href="/docs/api/data#tag/artifacts/paths/~1institutions~1{institution_guid}~1artifacts~1meetings~1{int_meeting_id}~1participants_list/get"
                      >
                        <MethodBadge method="GET" />
                        participants_list
                      </a>
                    </li>
                    <li className="menu__list-item">
                      <a
                        className="menu__link"
                        href="/docs/api/data#tag/artifacts/paths/~1institutions~1{institution_guid}~1artifacts~1meetings~1{int_meeting_id}~1shared_notes/get"
                      >
                        <MethodBadge method="GET" />
                        shared_notes
                      </a>
                    </li>
                    <li className="menu__list-item">
                      <a
                        className="menu__link"
                        href="/docs/api/data#tag/artifacts/paths/~1institutions~1{institution_guid}~1artifacts~1meetings~1{int_meeting_id}~1file/get"
                      >
                        <MethodBadge method="GET" />
                        file
                      </a>
                    </li>
                    <li className="menu__list-item">
                      <a
                        className="menu__link"
                        href="/docs/api/data#tag/artifacts/paths/~1institutions~1{institution_guid}~1artifacts~1meetings~1{int_meeting_id}~1file/put"
                      >
                        <MethodBadge method="PUT" />
                        file
                      </a>
                    </li>
                    <li className="menu__list-item">
                      <a
                        className="menu__link"
                        href="/docs/api/data#tag/artifacts/paths/~1institutions~1{institution_guid}~1artifacts~1meetings~1{int_meeting_id}~1list_objects/get"
                      >
                        <MethodBadge method="GET" />
                        list_objects
                      </a>
                    </li>
                  </CollapsibleCategory>
                </CollapsibleCategory>

                <CollapsibleCategory
                  label="Administrative API"
                  defaultOpen={true}
                >
                  <li className="menu__list-item">
                    <a
                      className="menu__link"
                      href="/docs/api/administrative#/paths/~1institution~1{guid}/get"
                    >
                      <MethodBadge method="GET" />
                      institution
                    </a>
                  </li>
                  <li className="menu__list-item">
                    <a
                      className="menu__link"
                      href="/docs/api/administrative#/paths/~1institution~1{guid}/put"
                    >
                      <MethodBadge method="PUT" />
                      institution
                    </a>
                  </li>
                  <li className="menu__list-item">
                    <a
                      className="menu__link"
                      href="/docs/api/administrative#/paths/~1institution~1/post"
                    >
                      <MethodBadge method="POST" />
                      institution
                    </a>
                  </li>
                  <li className="menu__list-item">
                    <a
                      className="menu__link"
                      href="/docs/api/administrative#/paths/~1institution~1{guid}~1meeting_settings/get"
                    >
                      <MethodBadge method="GET" />
                      institution/meeting_settings
                    </a>
                  </li>
                  <li className="menu__list-item">
                    <a
                      className="menu__link"
                      href="/docs/api/administrative#/paths/~1institution~1{guid}~1unsubscription/post"
                    >
                      <MethodBadge method="POST" />
                      institution/unsubscription
                    </a>
                  </li>
                  <li className="menu__list-item">
                    <a
                      className="menu__link"
                      href="/docs/api/administrative#/paths/~1institution~1{guid}~1reactivation/post"
                    >
                      <MethodBadge method="POST" />
                      institution/reactivation
                    </a>
                  </li>
                  <li className="menu__list-item">
                    <a
                      className="menu__link"
                      href="/docs/api/administrative#/paths/~1user~1{external_user_id}/delete"
                    >
                      <MethodBadge method="DEL" />
                      user
                    </a>
                  </li>
                </CollapsibleCategory>

                <CollapsibleCategory label="Contact" defaultOpen={true}>
                  <li className="menu__list-item">
                    <a
                      className="menu__link"
                      href="https://ajuda.elos.vc/kb/article/150995/tudo-sobre-o-elos"
                      target="_blank"
                    >
                      <MaterialIcon>indeterminate_question_box</MaterialIcon>{" "}
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
              </ul>
            </nav>
          </div>
        </aside>
        <main className={styles.docMainContainer}>{props.children}</main>
      </div>
    </Layout>
  );
}
