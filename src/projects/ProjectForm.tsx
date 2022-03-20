import { SyntheticEvent, useState } from "react";
import { Project } from "./Project";

interface ProjectFormProps {
    onCancel: () => void;
    onSave: (project: Project) => void;
    project: Project;
}

interface Errors {
    name: string;
    description: string;
    budget: string;
}

function ProjectForm(
    { onCancel, onSave, project: initialProject }: ProjectFormProps) {

    const emptyErrors: Errors = { name: '', description: '', budget: '', };

    const [project, setProject] = useState(initialProject);
    const [errors, setErrors] = useState(emptyErrors);

    const projectErrors = (project: Project) => {
        let errors: Errors = emptyErrors;
        if (project.name.length < 3)
            errors.name = "name is to short";
        if (project.description.length === 0)
            errors.description = "description is to short";
        if (project.budget < 1)
            errors.budget = "budget is to low";
        return errors;
    }

    const isValid = (errors: Errors) => {
        return (
            errors.name === ''
            && errors.description === ''
            && errors.budget === ''
        );
    }

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        if (isValid(errors))
            onSave(project);

    };

    const handleChange = (event: any) => {
        const { type, name, value, checked } = event.target;
        let updatedValue = type === 'checkbox' ? checked : value;
        if (type === 'number') {
            updatedValue = Number(updatedValue);
        }
        const change = {
            [name]: updatedValue,
        };
        let updatedProject: Project;
        setProject(p => {
            updatedProject = new Project({ ...p, ...change });
            return updatedProject;
        });
        setErrors(() => projectErrors(updatedProject));
    };

    return (
        <>
            <form
                className="input-group vertical"
                onSubmit={handleSubmit}>
                <label htmlFor="name">Project Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="enter name"
                    value={project.name}
                    onChange={handleChange}
                />
                <label htmlFor="description">Project Description</label>
                <textarea
                    name="description"
                    placeholder="enter description"
                    value={project.description}
                    onChange={handleChange}
                />
                <label htmlFor="budget">Project Budget</label>
                <input
                    type="number"
                    name="budget"
                    placeholder="enter budget"
                    value={project.budget}
                    onChange={handleChange}
                />
                <label htmlFor="isActive">Active?</label>
                <input
                    type="checkbox"
                    name="isActive"
                    checked={project.isActive}
                    onChange={handleChange}
                />
                {!isValid(errors) &&
                    <div className="form-errors">
                        <p>{errors.name}</p>
                        <p>{errors.description}</p>
                        <p>{errors.budget}</p>
                    </div>}
                <div className="input-group">
                    <button
                        className="primary bordered medium"
                    >
                        Save
                    </button>
                    <span />
                    <button
                        type="button"
                        className="bordered medium"
                        onClick={onCancel}
                    >
                        cancel
                    </button>
                </div>
            </form>

        </>
    )
}

export default ProjectForm;