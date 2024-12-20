import IProject from "../../interface/IProject";
import projectExperimental from "../data/projectExpermental";
import Model from "./model";
import ProjectExperimentalTechStackModel from "./projectExperimentalTechStackModel";
import TechStackModel from "./techStackModel";

class ProjectExperimentalModel extends Model
{
  getWithTechStacks()
  {
    return this.pivotData(new TechStackModel, new ProjectExperimentalTechStackModel, 'projectId', 'techStackId');
  }

  data()
  {
    return projectExperimental as IProject[];
  }
}

export default ProjectExperimentalModel;
