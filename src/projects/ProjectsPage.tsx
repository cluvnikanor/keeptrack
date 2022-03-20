import { useEffect, useState } from 'react';
import { MOCK_PROJECTS } from './MockProjects'
import { Project } from './Project';
import { projectAPI } from './projectAPI';
import ProjectList from './ProjectList';

function ProjectsPage() {

    // const getInitialProjects = () => {
    //     const temp = localStorage.getItem("projects") as string;
    //     const savedProjects = JSON.parse(temp);
    //     return savedProjects || MOCK_PROJECTS;
    // }

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showProjects, setShowProjects] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    // const [projects, setProjects] = useState<Project[]>(getInitialProjects);

    useEffect(() => {
        localStorage.setItem("projects", JSON.stringify(projects))
    }, [projects])

    useEffect(() => {
        async function loadProjects() {
            setLoading(true);
            try {
                const data = await projectAPI.get(currentPage);
                setError('');
                if (currentPage === 1) {
                    setProjects(data);
                } else {
                    setProjects((projects) => [...projects, ...data]);
                }
            }
            catch (e) {
                if (e instanceof Error) {
                    setError(e.message);
                }
            } finally {
                setLoading(false);
            }
        }
        loadProjects();
    }, [currentPage]);

    const handleClick = () => {
        setShowProjects(prev => !prev);
    }

    const handleMoreClick = () => {
        setCurrentPage(currentPage => currentPage + 1)
    }

    const saveProject = (project: Project) => {
        projectAPI
            .put(project)
            .then(updatedProject => {
                let updatedProjects = projects.map((p: Project) => {
                    return p.id === project.id ? new Project(updatedProject) : p;
                });
                setProjects(updatedProjects);
            })
            .catch(e => setError(e.message));
    }


    return (
        <>
            <button
                className="button default"
                onClick={handleClick}>
                {showProjects ? "hide" : "show projects"}
            </button>
            {error &&
                <div className="row">
                    <div className="card large error">
                        <section>
                            <p>
                                <span className="icon-alert inverse "></span>
                                {error}
                            </p>
                        </section>
                    </div>
                </div>
            }
            {showProjects &&
                <>
                    <h3>Projects:</h3>
                    <ProjectList
                        projects={projects}
                        onSave={saveProject}
                    />
                    {loading &&
                        <div className="center-page">
                            <span className="spinner primary"></span>
                            <p>Loading...</p>
                        </div>}
                    {!loading && !error &&
                        <button
                            className="button default"
                            onClick={handleMoreClick}>
                            More...
                        </button>
                    }
                </>}
        </>
    );
}

export default ProjectsPage;