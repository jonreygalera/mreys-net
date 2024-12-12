import IProject from "../../interface/IProject";
import project from "../data/project";
import Model from "./model";
import ProjectTechStackModel from "./projectTechStackModel";
import TechStackModel from "./techStackModel";

class ProjectModel extends Model
{

  getWithTechStacks()
  {
    return this.pivotData(new TechStackModel, new ProjectTechStackModel, 'projectId', 'techStackId');
  }

  data()
  {
    return project as IProject[];
  }
}

export default ProjectModel;
