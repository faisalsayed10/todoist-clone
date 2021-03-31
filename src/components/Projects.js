import React, { useState } from "react";
import { useProjectsValue, useSelectedProjectValue } from "../context";

const Projects = ({ activeNull = null }) => {
  const [active, setActive] = useState(activeNull);
  const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();

  return projects ? (
    projects.map((project) => (
      <li
        key={project.projectId}
        data-doc-id={project.id}
        data-testid="project-action"
        className={
          active === project.projectId
            ? "active sidebar__project"
            : "sidebar__project"
        }
        onKeyDown={() => {
          setActive(project.projectId);
          // @ts-ignore
          setSelectedProject(project.projectId);
        }}
      >
        {project.name}
      </li>
    ))
  ) : (
    <p>"loading"</p>
  );
};

export default Projects;
